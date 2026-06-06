import { redirect } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth-sync';
import { Shield, Clock, ArrowLeft, RefreshCw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default async function PendingReviewPage() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) {
    redirect('/sign-in');
  }

  // Handle redirects if user status changes
  if (dbUser.role === 'admin') {
    redirect('/admin');
  }

  if (dbUser.accountStatus === 'active') {
    redirect('/dashboard');
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase">Verification status</span>
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
          <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-red-950/30 rounded-3xl p-8 md:p-10 text-center shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-red-950/60 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Application Declined</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
              We regret to inform you that your application for the virtual internship has been declined. This may be due to incomplete professional profile details or invalid GitHub/LinkedIn references.
            </p>

            <div className="flex flex-col gap-3">
              <a 
                href="/onboarding" 
                className="w-full py-3 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 text-red-300 font-bold text-sm rounded-xl transition-all"
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
          <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 md:p-10 text-center shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-emerald-950/60 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
              <Clock className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Application Under Review</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
              Your profile (<span className="text-slate-300 font-medium">{dbUser.fullName}</span>) has been successfully recorded. An administrator is currently validating your credentials. 
            </p>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 text-xs text-left text-slate-400 space-y-2.5 mb-8">
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Submitted Metadata</div>
              <div className="flex justify-between">
                <span>University:</span>
                <span className="text-slate-200">{dbUser.universityName}</span>
              </div>
              <div className="flex justify-between">
                <span>Graduation:</span>
                <span className="text-slate-200">{dbUser.graduationYear}</span>
              </div>
              <div className="flex justify-between">
                <span>GitHub Profile:</span>
                <span className="text-slate-300 truncate max-w-[180px]">{dbUser.githubUrl}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href="/pending-review" 
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
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
