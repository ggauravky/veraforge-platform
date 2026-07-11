'use server';

import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import UserTask from '@/models/UserTask';
import Certificate from '@/models/Certificate';
import { getOrCreateUser } from '@/lib/auth-sync';

export async function getStudentsForRecruiter() {
  try {
    const recruiterUser = await getOrCreateUser();
    if (!recruiterUser || recruiterUser.role !== 'recruiter') {
      return { success: false, error: 'Unauthorized: Recruiter authentication required.' };
    }

    await connectToDatabase();

    // Fetch all active or graduated students
    const students = await User.find({ 
      role: 'student',
      accountStatus: 'active'
    }).lean();

    const studentListWithDetails = [];

    for (const student of students) {
      // Fetch tasks count and completion metrics
      const userTasks = await UserTask.find({ userId: student._id })
        .populate('taskId')
        .lean();
        
      const certificate = await Certificate.findOne({ userId: student._id }).lean();

      studentListWithDetails.push({
        ...student,
        _id: student._id.toString(),
        tasks: JSON.parse(JSON.stringify(userTasks)),
        certificate: certificate ? JSON.parse(JSON.stringify(certificate)) : null
      });
    }

    return { success: true, students: studentListWithDetails };
  } catch (error: any) {
    console.error('Error fetching students for recruiter:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}

export async function contactStudentAction(data: {
  studentId: string;
  subject: string;
  message: string;
}) {
  try {
    const recruiterUser = await getOrCreateUser();
    if (!recruiterUser || recruiterUser.role !== 'recruiter') {
      return { success: false, error: 'Unauthorized: Recruiter authentication required.' };
    }

    const { studentId, subject, message } = data;

    await connectToDatabase();
    const student = await User.findById(studentId);
    if (!student) {
      return { success: false, error: 'Student candidate not found' };
    }

    // Simulate sending email/PGP dispatch logs on server console
    console.log('--------------------------------------------------');
    console.log(`[VERAFORGE DISPATCH] Recruiter Contact Form Triggered`);
    console.log(`From Recruiter: ${recruiterUser.fullName} (${recruiterUser.companyName})`);
    console.log(`To Student Candidate: ${student.fullName} (${student.email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message Body:`);
    console.log(message);
    console.log('--------------------------------------------------');

    return { success: true, msg: `Message routed successfully to candidate ${student.fullName}.` };
  } catch (error: any) {
    console.error('Error in contactStudentAction:', error);
    return { success: false, error: error.message || 'Failed to dispatch message.' };
  }
}
