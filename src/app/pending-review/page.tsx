import { redirect } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth-sync';
import { Clock, ArrowLeft, RefreshCw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export default async function PendingReviewPage() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) {
    redirect('/sign-in');
  }

  // Handle redirects if user status changes or onboarding is not complete
  if (dbUser.role === 'admin') {
    redirect('/admin');
  }

  if (dbUser.role === 'recruiter') {
    redirect('/recruiter');
  }

  if (!dbUser.universityName) {
    redirect('/onboarding');
  }

  if (dbUser.accountStatus === 'active') {
    redirect('/dashboard');
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-300 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[8px] text-slate-400 font-bold tracking-[0.2em] uppercase">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>
      </header>

      {/* Status Card Panel */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        {dbUser.accountStatus === 'rejected' ? (
          <div className="w-full max-w-lg glass-panel rounded-2xl p-8 md:p-10 text-center bg-zinc-900/50">
            <div className="mx-auto w-16 h-16 bg-red-950/40 border border-red-900/30 rounded-2xl flex items-center justify-center mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-3">Application Declined</h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-8 font-light">
              We regret to inform you that your application for the virtual internship has been declined. This may be due to incomplete professional profile details or invalid GitHub/LinkedIn references.
            </p>

            <div className="flex flex-col gap-3">
              <a 
                href="/onboarding" 
                className="w-full py-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-300 font-bold text-xs rounded-xl transition-all"
              >
                Re-submit Onboarding Profile
              </a>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg glass-panel rounded-2xl p-8 md:p-10 text-center bg-zinc-900/50">
            <div className="mx-auto w-16 h-16 bg-zinc-950 border border-zinc-850 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-3">Application Under Review</h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
              Your profile (<span className="text-slate-350 font-medium">{dbUser.fullName}</span>) has been successfully recorded. An administrator is currently validating your credentials. 
            </p>
            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-xs text-left text-slate-400 space-y-2.5 mb-8 font-sans">
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">Submitted Metadata</div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>University:</span>
                <span className="text-slate-205">{dbUser.universityName}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Graduation:</span>
                <span className="text-slate-205">{dbUser.graduationYear}</span>
              </div>
              <div className="flex justify-between">
                <span>GitHub Profile:</span>
                <span className="text-slate-205 truncate max-w-[180px]">{dbUser.githubUrl}</span>
              </div>
            </div>
 
            <div className="flex flex-col gap-3">
              <a 
                href="/pending-review" 
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Review Status
              </a>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
