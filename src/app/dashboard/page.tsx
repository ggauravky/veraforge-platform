import { redirect } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth-sync';
import { connectToDatabase } from '@/lib/db';
import UserTask from '@/models/UserTask';
import Task from '@/models/Task'; // Keep here so the model is registered
import Certificate from '@/models/Certificate';
import StudentDashboard from '@/components/StudentDashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) {
    redirect('/sign-in');
  }

  // Admin redirect
  if (dbUser.role === 'admin') {
    redirect('/admin');
  }

  // Registration statuses redirects
  if (dbUser.accountStatus === 'pending_approval') {
    redirect('/pending-review');
  }

  if (dbUser.accountStatus === 'rejected') {
    redirect('/pending-review');
  }

  await connectToDatabase();

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
