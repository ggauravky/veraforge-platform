import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { Shield, ArrowRight, CheckCircle2, GraduationCap, Award, FileSpreadsheet, Lock } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  const isUserSignedIn = !!userId;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase">Virtual Internships</span>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm rounded-xl border border-slate-800 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/sign-in"
                  className="px-5 py-2.5 text-slate-400 hover:text-slate-200 font-semibold text-sm transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all flex items-center gap-1.5"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold mb-8 backdrop-blur-sm shadow-inner shadow-emerald-500/5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>VeraForge Automated Internship Hub</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
          Forge Real Skills with <br className="hidden md:inline"/>
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Automated Virtual Internships
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
          A high-performance internship management ecosystem. Complete structured software tracks, receive direct administrator reviews, and earn cryptographically verified credentials.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isUserSignedIn ? (
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-base"
            >
              Access Internship Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link 
                href="/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-base"
              >
                Begin Your Application
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/sign-in"
                className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-xl border border-slate-800 transition-all text-base"
              >
                Sign In to Your Account
              </Link>
            </>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 pt-12 border-t border-slate-900">
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 text-left hover:border-slate-800/80 transition-all">
            <div className="p-3 bg-emerald-950/60 w-fit rounded-xl border border-emerald-500/10 mb-5">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Sequential Skill-Tracks</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Complete task challenges designed to build real-world capabilities, unlocked sequentially upon submission approval.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 text-left hover:border-slate-800/80 transition-all">
            <div className="p-3 bg-indigo-950/60 w-fit rounded-xl border border-indigo-500/10 mb-5">
              <FileSpreadsheet className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Automated Evaluation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Submit your GitHub repository and live application links directly. Administrators review submissions and provide constructive feedback.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 text-left hover:border-slate-800/80 transition-all">
            <div className="p-3 bg-purple-950/60 w-fit rounded-xl border border-purple-500/10 mb-5">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Verified PDF Credentials</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Earn cryptographically verified completion certificates with unique UUIDs. Share verification URLs on LinkedIn or download high-fidelity PDFs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-8 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} VeraForge. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure Enterprise Credentials Secured via Clerk & MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
