import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import TrackSelectionForm from '@/components/TrackSelectionForm';

export const dynamic = 'force-dynamic';

export default async function SelectTrackPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  await connectToDatabase();
  const dbUser = await User.findOne({ clerkId: clerkUser.id });

  // Recruiter redirect
  if (dbUser && dbUser.role === 'recruiter') {
    redirect('/recruiter');
  }

  if (!dbUser || !dbUser.universityName) {
    redirect('/onboarding');
  }

  if (dbUser.accountStatus === 'pending_approval' || dbUser.accountStatus === 'rejected') {
    redirect('/pending-review');
  }

  // If already enrolled in a track, redirect to main dashboard
  if (dbUser.enrolledTrack) {
    redirect('/dashboard');
  }

  return (
    <TrackSelectionForm user={JSON.parse(JSON.stringify(dbUser))} />
  );
}
