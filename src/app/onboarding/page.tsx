import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import OnboardingForm from '@/components/OnboardingForm';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default async function OnboardingPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  // Check if user profile already exists in MongoDB
  await connectToDatabase();
  const dbUser = await User.findOne({ clerkId: clerkUser.id });

  // If user already exists in MongoDB and has completed onboarding, redirect accordingly
  if (dbUser && (dbUser.universityName || dbUser.companyName)) {
    if (dbUser.role === 'admin') {
      redirect('/admin');
    }
    if (dbUser.role === 'recruiter') {
      redirect('/recruiter');
    }
    if (dbUser.accountStatus === 'pending_approval' || dbUser.accountStatus === 'rejected') {
      redirect('/pending-review');
    }
    redirect('/dashboard');
  }

  const initialName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'New User';
  const initialEmail = clerkUser.emailAddresses[0]?.emailAddress || '';

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden min-h-screen py-16 px-6 font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      
      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm">
            <VeraForgeLogo className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
            <span className="block text-[8px] text-slate-400 font-bold tracking-[0.2em] uppercase">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
          </div>
        </div>
      </div>

      <OnboardingForm initialName={initialName} initialEmail={initialEmail} />
    </div>
  );
}
