import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { 
  Shield, ArrowRight, CheckCircle2, Award, Lock, Sparkles, 
  Layers, CheckSquare, Zap, Eye, CheckCircle 
} from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  const isUserSignedIn = !!userId;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden min-h-screen">
      {/* Premium background mesh & grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase">Engineering Platform</span>
            </div>
          </div>

          <nav className="flex items-center gap-6 md:gap-8">
            <Link 
              href="/about"
              className="text-xs text-slate-450 hover:text-slate-100 font-bold tracking-wider uppercase transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-xs text-slate-455 hover:text-slate-100 font-bold tracking-wider uppercase transition-colors"
            >
              Contact
            </Link>
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/sign-in"
                  className="text-xs text-slate-400 hover:text-slate-100 font-bold tracking-wider uppercase transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/40 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                >
                  Apply as Student
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-8 backdrop-blur-sm shadow-inner shadow-indigo-500/5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next-Generation Virtual Internship Track</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 max-w-5xl leading-[1.05] uppercase">
          Launch Your Tech Career With <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
            Verified Experience.
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          Skip the boilerplate. Join VeraForge to execute rigorous, sequential system architecture tasks reviewed by experts, and secure a cryptographically verifiable internship certificate.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isUserSignedIn ? (
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Enter Internship Dashboard
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          ) : (
            <>
              <Link 
                href="/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Apply as Student
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <Link 
                href="/sign-in"
                className="px-8 py-4 bg-slate-900/60 hover:bg-slate-850/80 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-850 transition-all text-sm uppercase tracking-wider"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="relative z-10 border-y border-slate-900/60 bg-slate-950/40 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-8">
            Trusted by developers from leading industry teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 hover:opacity-60 transition-opacity">
            {/* Logo 1 - Acme */}
            <svg className="h-6 w-auto text-slate-300 fill-current" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5 L5 25 H25 Z M42 22 L38 12 L34 22 H42 M38 8 L46 25 H38 H30 Z M58 8 C62 8 66 10 66 14 C66 18 62 20 58 20 H54 V25 H50 V8 H58 M58 12 H54 V16 H58 C60 16 62 15 62 14 C62 13 60 12 58 12 Z M76 8 C80 8 83 10 85 13 L81 16 C80 14 78 12 76 12 C72 12 70 15 70 18 C70 21 72 24 76 24 C78 24 80 22 81 20 L85 23 C83 26 80 28 76 28 C69 28 65 23 65 18 C65 13 69 8 76 8 Z M95 8 H105 V12 H99 V15 H103 V18 H99 V21 H105 V25 H95 V8 Z" />
            </svg>
            {/* Logo 2 - Globex */}
            <svg className="h-6 w-auto text-slate-300 fill-current" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15 C15 22 20 27 27 27 C34 27 39 22 39 15 C39 8 34 3 27 3 C20 3 15 8 15 15 Z M27 6 C32 6 36 10 36 15 C36 20 32 24 27 24 C22 24 18 20 18 15 C18 10 22 6 27 6 Z M48 8 H52 V22 H60 V25 H48 V8 Z M70 8 C75 8 79 10 79 14 C79 18 75 20 70 20 H66 V25 H62 V8 H70 M70 12 H66 V16 H70 C72 16 74 15 74 14 C74 13 72 12 70 12 Z M86 8 H98 V12 H90 V15 H96 V18 H90 V21 H98 V25 H86 V8 Z M106 8 L101 16 L106 25 H101 L97.5 19.5 L94 25 H89 L94 16 L89 8 H94 L97.5 13.5 L101 8 H106 Z" />
            </svg>
            {/* Logo 3 - Initech */}
            <svg className="h-6 w-auto text-slate-300 fill-current" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8 H14 V25 H10 V8 Z M22 8 L32 20 V8 H36 V25 H32 L22 13 V25 H18 V8 H22 Z M44 8 H48 V25 H44 V8 Z M58 8 H70 V12 H64 V25 H60 V12 H58 V8 Z M76 8 H88 V12 H80 V15 H86 V18 H80 V21 H88 V25 H76 V8 Z M98 8 C103 8 107 10 109 13 L105 16 C104 14 102 12 98 12 C94 12 92 15 92 18 C92 21 94 24 98 24 C102 24 104 22 105 20 L109 23 C107 26 103 28 98 28 C91 28 87 23 87 18 C87 13 91 8 98 8 Z" />
            </svg>
            {/* Logo 4 - Stark */}
            <svg className="h-6 w-auto text-slate-300 fill-current" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8 H28 V12 H20 V25 H16 V12 H12 V8 Z M34 8 H46 V12 H38 V15 H44 V18 H38 V21 H46 V25 H34 V8 Z M58 8 L54 18 L50 8 H45 L52 25 H56 L63 8 H58 Z M72 8 C76 8 80 10 80 14 C80 18 76 20 72 20 H68 V25 H64 V8 H72 M72 12 H68 V16 H72 C74 16 76 15 76 14 C76 13 74 12 72 12 Z M84 8 H88 V25 H84 V8 Z M96 8 L104 16 V8 H108 V25 H104 L96 17 V25 H92 V8 H96 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* The Selection Process Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            The Selection Process
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light max-w-lg mx-auto">
            A linear progression designed to benchmark, test, and authenticate software engineers.
          </p>
        </div>

        <div className="relative border-l border-slate-900 max-w-4xl mx-auto pl-8 md:pl-12 space-y-16">
          {/* Step 1 */}
          <div className="relative">
            {/* Glowing timeline dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 bg-slate-950 border border-slate-900 flex items-center justify-center rounded-full">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
            </div>
            <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 md:p-8 hover:border-slate-850 transition-colors">
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Step 01</span>
              <h3 className="text-xl font-bold text-white mt-1">Application & Review</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Submit your credentials, educational details, and professional portfolio link. Our administration reviews every applicant profile against academic and project benchmarks to grant platform access.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            {/* Glowing timeline dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 bg-slate-950 border border-slate-900 flex items-center justify-center rounded-full">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
            </div>
            <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 md:p-8 hover:border-slate-850 transition-colors">
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Step 02</span>
              <h3 className="text-xl font-bold text-white mt-1">Sequential Execution</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Unlock real-world architectural assignments one-by-one. Build responsive calculators, construct full-stack databases, or optimize APIs, deploying them to public servers for testing.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            {/* Glowing timeline dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 bg-slate-950 border border-slate-900 flex items-center justify-center rounded-full">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
            </div>
            <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 md:p-8 hover:border-slate-850 transition-colors">
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Step 03</span>
              <h3 className="text-xl font-bold text-white mt-1">Verified Credentialing</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                After completing your track, our team reviews each submission. Approved students receive a cryptographically signed digital certificate verifying their skills to prospective employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            High-Performance Internship Infrastructure
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light max-w-lg mx-auto">
            Everything you need to test code, check deployment integrity, and authenticate records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Automated Review */}
          <div className="md:col-span-2 bg-slate-900/10 border border-slate-900 rounded-3xl p-8 hover:border-slate-850/80 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
            <div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 w-fit rounded-2xl mb-6">
                <CheckSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Structured Admin Evaluation</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed max-w-md">
                No automatic machine approvals. Every Github repository link and codebase submission goes through an active administrator evaluation queue. Receive actionable code reviews.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>Human-in-the-loop validation</span>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Live URL Tracking */}
          <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 hover:border-slate-850/80 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 w-fit rounded-2xl mb-6">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Live URL Tracking</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Submit repository code and live URL links together. Our reviewers check actual, operating production apps running live on modern platforms.
              </p>
            </div>
            <div className="mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Vercel / Netlify / Render supported</span>
            </div>
          </div>

          {/* Card 3: Public Verification */}
          <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 hover:border-slate-850/80 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 w-fit rounded-2xl mb-6">
                <Award className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Public Verification</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Generate high-fidelity completion certificates with a unique ID searchable on the platform registry for instant background checks.
              </p>
            </div>
            <div className="mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Verifiable Cryptographic UUIDs</span>
            </div>
          </div>

          {/* Card 4: Enterprise Access Controls */}
          <div className="md:col-span-2 bg-slate-900/10 border border-slate-900 rounded-3xl p-8 hover:border-slate-850/80 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
            <div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 w-fit rounded-2xl mb-6">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Administrative Control Gateway</h3>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed max-w-md">
                Admin controls are shielded by secure server-side session controls and secure cookies. Separate credentials lock access to student registries, assignment evaluations, and credential issuance.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>HTTP-Only Security Shield</span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Legitimate Footer */}
      <footer className="mt-auto border-t border-slate-900/80 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span className="font-extrabold text-sm tracking-wider text-white">VERAFORGE</span>
            </div>
            <p className="text-[10px] text-slate-500 font-light mt-1">
              &copy; {new Date().getFullYear()} VeraForge Platform. All rights reserved.
            </p>
          </div>

          {/* Links and hidden Admin Gateway */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-xs text-slate-500">
            <Link href="/about" className="hover:text-slate-350 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-slate-350 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-350 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-350 transition-colors">
              Terms of Service
            </Link>
            <Link 
              href="/admin-login" 
              className="text-[9px] text-slate-800 hover:text-slate-500 transition-colors tracking-wide self-center md:self-end mt-2 md:mt-0 font-medium"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
