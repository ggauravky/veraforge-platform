'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import UserTask from '@/models/UserTask';
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
