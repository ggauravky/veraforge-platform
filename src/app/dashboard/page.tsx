import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import UserTask from '@/models/UserTask';
import Task from '@/models/Task'; // Keep here so the model is registered
import Certificate from '@/models/Certificate';
import StudentDashboard from '@/components/StudentDashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  await connectToDatabase();
  
  // Post-Login check: immediately find student in MongoDB
  const dbUser = await User.findOne({ clerkId: clerkUser.id });

  // Redirection Logic: If user is authenticated in Clerk but does NOT exist in MongoDB or hasn't filled onboarding, redirect to onboarding
  if (!dbUser || !dbUser.universityName) {
    redirect('/onboarding');
  }

  // Admin redirect
  if (dbUser.role === 'admin') {
    redirect('/admin');
  }

  // If student is pending review or rejected, send to pending-review
  if (dbUser.accountStatus === 'pending_approval' || dbUser.accountStatus === 'rejected') {
    redirect('/pending-review');
  }

  // If active student has not selected a track, redirect to track selection page
  if (dbUser.accountStatus === 'active' && !dbUser.enrolledTrack) {
    redirect('/dashboard/select-track');
  }

  // Fetch student's specific task list
  const rawUserTasks = await UserTask.find({ userId: dbUser._id })
    .populate('taskId')
    .lean();

  // Sort tasks by sequenceOrder in memory to guarantee correct flow order
  const userTasks = JSON.parse(JSON.stringify(rawUserTasks));
  userTasks.sort((a: any, b: any) => {
    return (a.taskId?.sequenceOrder || 0) - (b.taskId?.sequenceOrder || 0);
  });

  // Fetch certificate if it exists
  const rawCert = await Certificate.findOne({ userId: dbUser._id }).lean();
  const certificate = rawCert ? JSON.parse(JSON.stringify(rawCert)) : null;

  return (
    <StudentDashboard 
      user={JSON.parse(JSON.stringify(dbUser))} 
      userTasks={userTasks} 
      certificate={certificate} 
    />
  );
}
