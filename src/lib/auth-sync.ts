import { currentUser } from '@clerk/nextjs/server';
import { connectToDatabase } from './db';
import User, { IUser } from '@/models/User';
import { seedDatabase } from './seed';

export async function getOrCreateUser(): Promise<IUser | null> {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }

  await connectToDatabase();
  
  // Seed default tasks automatically if they are missing
  await seedDatabase();

  let user = await User.findOne({ clerkId: clerkUser.id });

  if (!user) {
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'New Student';
    
    if (!email) {
      return null;
    }

    const isDefaultAdmin = email.toLowerCase().startsWith('admin@') || email.toLowerCase() === 'gkuma@gmail.com';

    user = await User.create({
      clerkId: clerkUser.id,
      fullName,
      email,
      accountStatus: isDefaultAdmin ? 'active' : 'pending_approval',
      role: isDefaultAdmin ? 'admin' : 'student',
    });
    console.log(`Synced user ${email} on-demand.`);
  }

  return user;
}

// Dev action to toggle roles for debugging convenience
export async function devToggleRole(clerkId: string) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId });
  if (!user) return null;

  user.role = user.role === 'admin' ? 'student' : 'admin';
  // Also active status
  if (user.role === 'admin') {
    user.accountStatus = 'active';
  }
  await user.save();
  return user;
}

// Dev action to reset student status and tasks
export async function devResetStudent(clerkId: string) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId });
  if (!user) return null;

  user.accountStatus = 'pending_approval';
  user.universityName = undefined;
  user.graduationYear = undefined;
  user.githubUrl = undefined;
  user.linkedinUrl = undefined;
  user.portfolioUrl = undefined;
  await user.save();

  // Delete user tasks & certificates
  const UserTask = (await import('@/models/UserTask')).default;
  const Certificate = (await import('@/models/Certificate')).default;
  await UserTask.deleteMany({ userId: user._id });
  await Certificate.deleteMany({ userId: user._id });

  return user;
}
