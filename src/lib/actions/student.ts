'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import UserTask from '@/models/UserTask';
import User from '@/models/User';
import Task from '@/models/Task';
import { getOrCreateUser } from '@/lib/auth-sync';

const taskSubmissionSchema = z.object({
  userTaskId: z.string().min(1, 'Task ID is required'),
  submissionRepoLink: z.string().url('Invalid URL').regex(/github\.com/, 'Must be a GitHub repository URL'),
  submissionLiveLink: z.string().url('Invalid URL'),
});

export async function submitTaskAction(data: {
  userTaskId: string;
  submissionRepoLink: string;
  submissionLiveLink: string;
}) {
  try {
    const activeUser = await getOrCreateUser();
    if (!activeUser) {
      return { success: false, error: 'Unauthorized' };
    }

    const { userTaskId, submissionRepoLink, submissionLiveLink } = taskSubmissionSchema.parse(data);

    await connectToDatabase();

    // Verify task belongs to this user
    const userTask = await UserTask.findOne({ _id: userTaskId, userId: activeUser._id });
    if (!userTask) {
      return { success: false, error: 'Task not found or unauthorized' };
    }

    if (userTask.status === 'locked') {
      return { success: false, error: 'This task is locked' };
    }

    // Update user task status and submissions
    userTask.status = 'submitted_pending_review';
    userTask.submissionRepoLink = submissionRepoLink;
    userTask.submissionLiveLink = submissionLiveLink;
    userTask.adminFeedback = undefined; // clear previous feedback if any
    
    await userTask.save();

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Submit task error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: error.message || 'Something went wrong' };
  }
}

export async function enrollInTrackAction(trackName: string) {
  try {
    const activeUser = await getOrCreateUser();
    if (!activeUser) {
      return { success: false, error: 'Unauthorized' };
    }

    const validTracks = ['Web Development', 'Data Science', 'Artificial Intelligence', 'Backend Engineering'];
    if (!validTracks.includes(trackName)) {
      return { success: false, error: 'Invalid track selection' };
    }

    await connectToDatabase();

    const student = await User.findById(activeUser._id);
    if (!student) {
      return { success: false, error: 'Student profile not found' };
    }

    if (student.enrolledTrack) {
      return { success: false, error: 'You are already enrolled in a track' };
    }

    // 1. Save track selection
    student.enrolledTrack = trackName;
    await student.save();

    // 2. Fetch the tasks for this track
    const tasks = await Task.find({ trackCategory: trackName }).sort({ sequenceOrder: 1 });
    if (tasks.length === 0) {
      return { success: false, error: 'Track tasks have not been initialized by administrator.' };
    }

    // 3. Delete any stale progress
    await UserTask.deleteMany({ userId: student._id });

    // 4. Assign the track's tasks
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const initialStatus = task.sequenceOrder === 1 ? 'unlocked' : 'locked';
      await UserTask.create({
        userId: student._id,
        taskId: task._id,
        status: initialStatus,
      });
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Enroll in track error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}
