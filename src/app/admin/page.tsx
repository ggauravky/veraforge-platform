import { redirect } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth-sync';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Task from '@/models/Task';
import UserTask from '@/models/UserTask';
import Certificate from '@/models/Certificate';
import AdminDashboard from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) {
    redirect('/sign-in');
  }

  // Double check authorization
  if (dbUser.role !== 'admin') {
    redirect('/dashboard');
  }

  await connectToDatabase();

  // 1. Fetch pending registrations
  const rawPendingStudents = await User.find({ 
    accountStatus: 'pending_approval', 
    role: 'student' 
  }).lean();
  const pendingStudents = JSON.parse(JSON.stringify(rawPendingStudents));

  // 2. Fetch pending task submissions
  const rawPendingSubmissions = await UserTask.find({ 
    status: 'submitted_pending_review' 
  })
    .populate('userId')
    .populate('taskId')
    .lean();
  const pendingSubmissions = JSON.parse(JSON.stringify(rawPendingSubmissions));

  // 3. Compile graduation candidates (active students who completed all tasks)
  const activeStudents = await User.find({ 
    role: 'student', 
    accountStatus: 'active' 
  }).lean();
  
  const totalTasks = await Task.countDocuments();
  const graduationCandidates = [];

  for (const student of activeStudents) {
    const approvedTasksCount = await UserTask.countDocuments({
      userId: student._id,
      status: 'approved',
    });

    // Student has completed all tasks
    if (totalTasks > 0 && approvedTasksCount === totalTasks) {
      const cert = await Certificate.findOne({ userId: student._id }).lean();
      
      graduationCandidates.push({
        _id: student._id.toString(),
        fullName: student.fullName,
        email: student.email,
        universityName: student.universityName,
        graduationYear: student.graduationYear,
        certificateId: cert ? cert.certificateId : null,
      });
    }
  }

  return (
    <AdminDashboard
      pendingStudents={pendingStudents}
      pendingSubmissions={pendingSubmissions}
      graduationCandidates={graduationCandidates}
    />
  );
}
