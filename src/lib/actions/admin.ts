'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Task from '@/models/Task';
import UserTask from '@/models/UserTask';
import Certificate from '@/models/Certificate';
import { getOrCreateUser } from '@/lib/auth-sync';
import crypto from 'crypto';

// Helper to verify admin access
async function checkAdmin() {
  const activeUser = await getOrCreateUser();
  if (!activeUser || activeUser.role !== 'admin') {
    throw new Error('Unauthorized. Admin access required.');
  }
  return activeUser;
}

export async function approveStudentAction(studentId: string) {
  try {
    await checkAdmin();
    await connectToDatabase();

    // 1. Set student's accountStatus to 'active'
    const student = await User.findById(studentId);
    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    student.accountStatus = 'active';
    await student.save();

    // 2. Fetch all tasks to assign
    const tasks = await Task.find({}).sort({ sequenceOrder: 1 });
    if (tasks.length === 0) {
      return { success: false, error: 'No default tasks found in the database. Please seed tasks first.' };
    }

    // 3. Delete any existing tasks for this student to avoid duplicates
    await UserTask.deleteMany({ userId: student._id });

    // 4. Assign default tasks to UserTask collection
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      // Task 1 (Calculator App, order 1) is unlocked, others are locked
      const initialStatus = task.sequenceOrder === 1 ? 'unlocked' : 'locked';

      await UserTask.create({
        userId: student._id,
        taskId: task._id,
        status: initialStatus,
      });
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Approve student error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}

export async function rejectStudentAction(studentId: string) {
  try {
    await checkAdmin();
    await connectToDatabase();

    const student = await User.findById(studentId);
    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    student.accountStatus = 'rejected';
    await student.save();

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Reject student error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}

export async function reviewTaskAction(data: {
  userTaskId: string;
  status: 'approved' | 'rejected';
  adminFeedback?: string;
}) {
  try {
    await checkAdmin();
    await connectToDatabase();

    const { userTaskId, status, adminFeedback } = data;

    // Find the UserTask and populate the Task details
    const userTask = await UserTask.findById(userTaskId).populate('taskId');
    if (!userTask) {
      return { success: false, error: 'UserTask not found' };
    }

    // Update status and feedback
    userTask.status = status;
    userTask.adminFeedback = adminFeedback || undefined;
    await userTask.save();

    const studentId = userTask.userId;

    // If approved, automatically unlock the next task (if any)
    if (status === 'approved') {
      const currentTask = userTask.taskId as any;
      const currentOrder = currentTask.sequenceOrder;

      // Find the next task in sequence
      const nextTask = await Task.findOne({ sequenceOrder: currentOrder + 1 });
      if (nextTask) {
        // Find corresponding UserTask and unlock it
        const nextUserTask = await UserTask.findOne({
          userId: studentId,
          taskId: nextTask._id,
        });

        if (nextUserTask && nextUserTask.status === 'locked') {
          nextUserTask.status = 'unlocked';
          await nextUserTask.save();
        }
      }
    }

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Review task error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}

export async function issueCertificateAction(studentId: string) {
  try {
    await checkAdmin();
    await connectToDatabase();

    // Verify student exists and has completed all tasks
    const student = await User.findById(studentId);
    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    // Check if certificate already exists
    const existingCert = await Certificate.findOne({ userId: studentId });
    if (existingCert) {
      return { success: true, certificateId: existingCert.certificateId };
    }

    // Check that all tasks are approved
    const totalTasks = await Task.countDocuments();
    const approvedTasks = await UserTask.countDocuments({
      userId: studentId,
      status: 'approved',
    });

    if (totalTasks === 0 || approvedTasks < totalTasks) {
      return {
        success: false,
        error: `Student has not completed all assignments (${approvedTasks}/${totalTasks} tasks approved).`,
      };
    }

    // Generate certificate record
    const certificateId = crypto.randomUUID();
    const certificate = await Certificate.create({
      certificateId,
      userId: studentId,
      issueDate: new Date(),
    });

    revalidatePath('/admin');
    revalidatePath('/dashboard');
    return { success: true, certificateId: certificate.certificateId };
  } catch (error: any) {
    console.error('Issue certificate error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}
