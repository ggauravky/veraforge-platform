import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { 
  ArrowRight, CheckCircle2, Award, Lock, Sparkles, 
  Layers, CheckSquare, Zap, Eye, CheckCircle, ShieldAlert, Activity, Globe, Database, Brain
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

function MinimalHeroGraphic() {
  return (
    <div className="relative w-full max-w-[440px] h-[300px] mx-auto flex items-center justify-center mt-12 lg:mt-0">
      {/* Subtle flat ambient background highlights */}
      <div className="absolute w-56 h-56 bg-blue-550/5 rounded-full blur-3xl pointer-events-none" />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simple geometric lines showing flow connection */}
        <path d="M 40 50 C 140 50, 140 150, 200 150" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        <path d="M 40 100 C 140 100, 140 150, 200 150" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 40 250 C 140 250, 140 150, 200 150" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        <path d="M 40 200 C 140 200, 140 150, 200 150" stroke="#1f2937" strokeWidth="1.5" />
        
        <path d="M 360 50 C 260 50, 260 150, 200 150" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 360 250 C 260 250, 260 150, 200 150" stroke="#1f2937" strokeWidth="1.5" />
        
        {/* Flat blue center node */}
        <circle cx="200" cy="150" r="14" fill="#09090b" stroke="#3b82f6" strokeWidth="3" />
        <circle cx="200" cy="150" r="5" fill="#3b82f6" />
        
        <circle cx="200" cy="150" r="30" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="200" cy="150" r="60" stroke="#1f2937" strokeWidth="1" />
      </svg>
      
      {/* Flat status preview console */}
      <div className="absolute bottom-0 right-4 w-60 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl z-20 font-mono text-[9px] text-slate-400 select-none hidden sm:block">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="font-semibold text-slate-350">VERIFICATION ENGINE v2.5</span>
          </div>
          <span className="text-[7px] bg-zinc-850 px-1.5 py-0.5 rounded text-slate-500 font-bold">ONLINE</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600">&gt; DB STATE:</span>
            <span className="text-emerald-450 font-bold">CONNECTED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">&gt; INTEGRITY LOCK:</span>
            <span className="text-blue-500 font-bold">ACTIVE (SSL)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">&gt; VERIFICATION CORE:</span>
            <span className="text-slate-400 font-bold">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const { userId } = await auth();
  const isUserSignedIn = !!userId;

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-300">
      {/* Flat grid background */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />

      {/* Header Navigation */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-20">
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

          <nav className="flex items-center gap-6 md:gap-8">
            <Link 
              href="/about"
              className="text-xs text-slate-400 hover:text-blue-500 font-bold tracking-wider uppercase transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-xs text-slate-400 hover:text-blue-500 font-bold tracking-wider uppercase transition-colors"
            >
              Contact
            </Link>
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
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
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-805 text-white border border-zinc-800 hover:border-zinc-700 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
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
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-850 text-slate-400 rounded-full text-xs font-semibold mb-8">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>AI-Driven Cryptographic Internship Validation</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight uppercase">
            Launch Your Tech Career with <br />
            <span className="text-blue-500">
              Verified Experience.
            </span>
          </h1>

          <p className="text-slate-400 text-sm max-w-xl mb-10 leading-relaxed font-light">
            Skip paper credentials. Prove your skills by executing strict, sandboxed curriculum tracks reviewed by experts, securing a verified neural network portfolio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                Internship Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link 
                  href="/sign-up"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply as Student
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/sign-in"
                  className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-slate-300 hover:text-white font-bold rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all text-xs uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <MinimalHeroGraphic />
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="relative z-10 border-y border-zinc-900 bg-zinc-900/20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            Interns Placed At Leading Companies
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-30">
            {/* Logo 1 */}
            <svg className="h-6 w-20 text-slate-400 hover:text-blue-500 transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <rect x="0" y="5" width="20" height="20" rx="3" />
              <text x="28" y="20" fontSize="13" fontWeight="bold">TECHNE</text>
            </svg>
            {/* Logo 2 */}
            <svg className="h-6 w-20 text-slate-400 hover:text-blue-500 transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <circle cx="15" cy="15" r="10" />
              <text x="32" y="20" fontSize="13" fontWeight="bold">CORE</text>
            </svg>
            {/* Logo 3 */}
            <svg className="h-6 w-20 text-slate-400 hover:text-blue-500 transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <polygon points="15,5 25,25 5,25" />
              <text x="35" y="20" fontSize="13" fontWeight="bold">APEX</text>
            </svg>
            {/* Logo 4 */}
            <svg className="h-6 w-20 text-slate-400 hover:text-blue-500 transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <path d="M5,15 L15,5 L25,15 L15,25 Z" />
              <text x="35" y="20" fontSize="13" fontWeight="bold">NODE</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Selection Process Timeline */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-blue-500 font-bold tracking-[0.2em] uppercase">
            Admission Pipeline
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3 uppercase tracking-tight">
            Our Automated Verification Flow
          </h2>
          <p className="text-slate-400 text-xs font-light mt-3 leading-relaxed">
            A secure vetting roadmap verifying educational background parameters, repository builds, and graduations.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline center line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-zinc-800 pointer-events-none" />

          {/* Steps */}
          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Onboarding & Validation',
                description: 'Sync your account via Clerk and submit your academic coordinates, GitHub handle, and portfolio metrics for administrator verification.',
                tag: 'Step 1: Security Audit',
                align: 'left'
              },
              {
                step: '02',
                title: 'Track Specialization & Sandbox',
                description: 'Select your internship category (AI, Data Science, Web Dev, Backend). Instantly unlock sequential sandbox challenges requiring active repositories and live links.',
                tag: 'Step 2: Practical Lab',
                align: 'right'
              },
              {
                step: '03',
                title: 'Verification & Graduation',
                description: 'Upon successful task completion, receive a unique cryptographic UUID and download your verified A4 landscape certificate registered on the platform registry.',
                tag: 'Step 3: Verification',
                align: 'left'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-start ${
                  item.align === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-[7px] w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center z-10" />

                {/* Card Container */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-panel rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300">
                    <span className="text-[9px] text-blue-500 font-bold tracking-widest uppercase block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-blue-500 font-bold tracking-[0.2em] uppercase">
            Core Mechanics
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3 uppercase tracking-tight">
            Security Shielded Features
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Rigorous Sandbox Tracks',
              description: 'Four specialized tracks loaded with progressive easy/hard challenges mapping capabilities directly to repository commits.',
              icon: Layers,
              badge: '4 Tracks Available'
            },
            {
              title: 'Automated Admin Review',
              description: 'Clean administrative reviews interface. Review task repositories, provide constructive feedback, and unlock next-stage tasks instantly.',
              icon: CheckSquare,
              badge: 'Live Evaluation'
            },
            {
              title: 'Cryptographic Validation',
              description: 'Graduation candidate directories generate landscape completion certificates with verification ID lookups.',
              icon: Award,
              badge: 'A4 Landscape PDF'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 relative bg-zinc-900/50"
            >
              <div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 w-fit rounded-xl mb-6">
                  <item.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 text-[9px] text-slate-500 font-bold uppercase tracking-wider flex justify-between items-center border-t border-zinc-800/60 pt-4">
                <span>{item.badge}</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <VeraForgeLogo className="w-4 h-4" />
              <span className="font-extrabold text-sm tracking-wider text-white">VERAFORGE</span>
            </div>
            <p className="text-[9px] text-slate-500 font-light mt-1">
              &copy; {new Date().getFullYear()} VeraForge Platform. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs text-slate-500">
            <Link href="/about" className="hover:text-blue-500 transition-colors">
              About Us
            </Link>
            <Link href="/curriculum" className="hover:text-blue-500 transition-colors">
              Curriculum
            </Link>
            <Link href="/quiz-match" className="hover:text-blue-500 transition-colors">
              Track Quiz
            </Link>
            <Link href="/faq" className="hover:text-blue-500 transition-colors">
              FAQs
            </Link>
            <Link href="/verify" className="hover:text-blue-500 transition-colors">
              Verify Credential
            </Link>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>
            <Link 
              href="/admin-login" 
              className="text-[9px] text-slate-650 hover:text-blue-500 transition-colors tracking-wide font-medium"
            >
              Admin Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
