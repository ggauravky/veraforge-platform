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

  // If user already exists in MongoDB and has completed onboarding, redirect to dashboard/admin/review
  if (dbUser && dbUser.universityName) {
    if (dbUser.role === 'admin') {
      redirect('/admin');
    }
    if (dbUser.accountStatus === 'pending_approval' || dbUser.accountStatus === 'rejected') {
      redirect('/pending-review');
    }
    redirect('/dashboard');
  }

  const initialName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'New Student';
  const initialEmail = clerkUser.emailAddresses[0]?.emailAddress || '';

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-cyber-navy-dark relative overflow-hidden min-h-screen py-16 px-6">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyber-navy-dark/80 border border-cyber-navy-light/40 rounded-xl shadow-lg shadow-electric-cyan/5">
            <VeraForgeLogo className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
            <span className="block text-[8px] text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
          </div>
        </div>
      </div>

      <OnboardingForm initialName={initialName} initialEmail={initialEmail} />
    </div>
  );
}
