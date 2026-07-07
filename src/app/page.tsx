import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { 
  ArrowRight, CheckCircle2, Award, Lock, Sparkles, 
  Layers, CheckSquare, Zap, Eye, CheckCircle, ShieldAlert, Activity
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg className="absolute w-full h-full opacity-[0.08] animate-pulse-slow" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 50 L 2000 50 M 0 180 L 2000 180 M 0 310 L 2000 310 M 0 440 L 2000 440 M 0 570 L 2000 570 M 0 700 L 2000 700" stroke="#fbbf24" strokeWidth="0.5" />
        <path d="M 120 0 L 120 2000 M 340 0 L 340 2000 M 560 0 L 560 2000 M 780 0 L 780 2000 M 1000 0 L 1000 2000 M 1220 0 L 1220 2000" stroke="#f59e0b" strokeWidth="0.5" />
        
        <line x1="120" y1="180" x2="340" y2="310" stroke="#fbbf24" strokeWidth="1" className="animate-dash" />
        <line x1="340" y1="310" x2="560" y2="180" stroke="#fbbf24" strokeWidth="1.5" className="animate-dash" />
        <line x1="560" y1="180" x2="780" y2="440" stroke="#f59e0b" strokeWidth="1" className="animate-dash" />
        <line x1="340" y1="310" x2="340" y2="570" stroke="#fbbf24" strokeWidth="0.75" />
        <line x1="780" y1="440" x2="1000" y2="310" stroke="#fbbf24" strokeWidth="1.5" className="animate-dash" />
        <line x1="1000" y1="310" x2="1220" y2="440" stroke="#f59e0b" strokeWidth="1" className="animate-dash" />
        
        <circle cx="120" cy="180" r="3.5" fill="#fbbf24" />
        <circle cx="340" cy="310" r="5" fill="#f59e0b" />
        <circle cx="560" cy="180" r="3.5" fill="#fbbf24" />
        <circle cx="780" cy="440" r="6" fill="#fbbf24" />
        <circle cx="340" cy="570" r="4.5" fill="#f59e0b" />
        <circle cx="1000" cy="310" r="4" fill="#fbbf24" />
        <circle cx="1220" cy="440" r="5.5" fill="#f59e0b" />
      </svg>
    </div>
  );
}

function ConvergingHeroGraphic() {
  return (
    <div className="relative w-full max-w-[480px] h-[340px] mx-auto flex items-center justify-center mt-12 lg:mt-0">
      <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Connection flow streams converging to center */}
        <path d="M 40 40 C 140 40, 140 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="3" strokeLinecap="round" className="animate-dash" />
        <path d="M 40 100 C 140 100, 140 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 40 260 C 140 260, 140 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="3" strokeLinecap="round" className="animate-dash" />
        <path d="M 40 200 C 140 200, 140 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="2" className="animate-dash" />
        
        <path d="M 360 40 C 260 40, 260 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="2.5" strokeLinecap="round" className="animate-dash" />
        <path d="M 360 260 C 260 260, 260 150, 200 150" stroke="url(#cyanBlueGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Main Career Convergence Node */}
        <circle cx="200" cy="150" r="16" fill="#050508" stroke="#fbbf24" strokeWidth="3.5" className="drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        <circle cx="200" cy="150" r="7" fill="#fbbf24" />
        
        {/* Concentric neural shells */}
        <circle cx="200" cy="150" r="32" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="5 3" className="animate-spin-slow" style={{ transformOrigin: '200px 150px' }} />
        <circle cx="200" cy="150" r="52" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.15" />
        <circle cx="200" cy="150" r="75" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.08" />
      </svg>
      
      {/* Floating Glass Console Preview Overlay */}
      <div className="absolute bottom-[-16px] right-[-10px] w-64 bg-slate-950/80 border border-amber-500/25 rounded-2xl p-4 backdrop-blur-md shadow-[0_0_35px_rgba(245,158,11,0.12)] z-20 font-mono text-[9px] text-slate-350 select-none hidden sm:block animate-pulse-slow">
        <div className="flex items-center justify-between border-b border-cyber-navy-light/45 pb-2 mb-2 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00ffff]" />
            <span className="font-semibold text-slate-300">SECURE MONITOR v2.5</span>
          </div>
          <span className="text-[8px] bg-cyber-navy-light px-1.5 py-0.5 rounded text-slate-400 font-bold">NODE: ONLINE</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">&gt; DB STATE:</span>
            <span className="text-emerald-450 font-bold text-cyan-glow">CONNECTED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">&gt; INTEGRITY LOCK:</span>
            <span className="text-electric-cyan font-bold">ACTIVE (SSL)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">&gt; VERIFICATION CORE:</span>
            <span className="text-electric-blue font-bold">READY</span>
          </div>
          <div className="flex justify-between border-t border-cyber-navy-light/35 pt-1.5 mt-1.5 text-[8px] text-slate-500">
            <span>SECURE AUDIT PIPELINE</span>
            <span>OK</span>
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
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen">
      {/* Moving background grid */}
      <div className="absolute inset-0 cyber-grid-moving opacity-[0.22] pointer-events-none z-0" />
      <NeuralNetworkBackground />

      {/* Header Navigation */}
      <header className="border-b border-slate-900/60 bg-cyber-navy-light/40 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyber-navy-dark border border-amber-950/80 rounded-xl shadow-lg shadow-amber-500/5">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[8px] text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </div>

          <nav className="flex items-center gap-6 md:gap-8">
            <Link 
              href="/about"
              className="text-xs text-slate-400 hover:text-electric-cyan font-bold tracking-wider uppercase transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-xs text-slate-400 hover:text-electric-cyan font-bold tracking-wider uppercase transition-colors"
            >
              Contact
            </Link>
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02]"
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
                  className="px-5 py-2.5 bg-cyber-navy-light/60 hover:bg-cyber-navy-light text-electric-cyan border border-electric-cyan/20 hover:border-electric-cyan/50 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.02)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-950/40 border border-electric-cyan/25 text-electric-cyan rounded-full text-xs font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.05)]">
            <Sparkles className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
            <span>AI-Driven Cryptographic Internship Validation</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-black tracking-tight text-white mb-6 leading-[1.06] uppercase">
            Launch Your Tech <br />
            Career with <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 bg-clip-text text-transparent text-cyan-glow">
              Verified Experience.
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light font-sans">
            Skip paper credentials. Prove your skills by executing strict, sandboxed curriculum tracks reviewed by experts, securing a verified neural network portfolio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            {isUserSignedIn ? (
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/35 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                Internship Dashboard
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </Link>
            ) : (
              <>
                <Link 
                  href="/sign-up"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/35 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply as Student
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </Link>
                <Link 
                  href="/sign-in"
                  className="w-full sm:w-auto px-8 py-4 bg-cyber-navy-light/30 hover:bg-cyber-navy-light/60 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-800 hover:border-slate-700 transition-all hover:scale-[1.01] text-xs uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <ConvergingHeroGraphic />
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="relative z-10 border-y border-slate-900/60 bg-cyber-navy-light/10 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
            Interns Placed At Leading Companies
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
            {/* Logo 1 */}
            <svg className="h-6 w-20 text-amber-500 hover:text-electric-cyan transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <rect x="0" y="5" width="20" height="20" rx="3" />
              <text x="28" y="20" fontSize="13" fontWeight="bold">TECHNE</text>
            </svg>
            {/* Logo 2 */}
            <svg className="h-6 w-20 text-amber-500 hover:text-electric-cyan transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <circle cx="15" cy="15" r="10" />
              <text x="32" y="20" fontSize="13" fontWeight="bold">CORE</text>
            </svg>
            {/* Logo 3 */}
            <svg className="h-6 w-20 text-amber-500 hover:text-electric-cyan transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <polygon points="15,5 25,25 5,25" />
              <text x="35" y="20" fontSize="13" fontWeight="bold">APEX</text>
            </svg>
            {/* Logo 4 */}
            <svg className="h-6 w-20 text-amber-500 hover:text-electric-cyan transition-colors" viewBox="0 0 100 30" fill="currentColor">
              <path d="M5,15 L15,5 L25,15 L15,25 Z" />
              <text x="35" y="20" fontSize="13" fontWeight="bold">NODE</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Selection Process Glowing Vertical Timeline */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">
            Admission Pipeline
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 uppercase tracking-tight">
            Our Automated Verification Flow
          </h2>
          <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
            A secure vetting roadmap verifying educational background parameters, repository builds, and graduations.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline center line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-yellow-400 via-amber-600 to-orange-950 pointer-events-none" />

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
                <div className="absolute left-6 md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full bg-cyber-navy-dark border-[3px] border-electric-cyan shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center justify-center z-10" />

                {/* Card Container */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-panel rounded-3xl p-8 hover:border-electric-cyan/35 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 bg-cyber-navy-light/15">
                    <span className="text-[9px] text-electric-cyan font-bold tracking-widest uppercase block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-450 text-xs font-light leading-relaxed">
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
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">
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
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-electric-cyan/35 hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:-translate-y-1.5 transition-all duration-350 relative group bg-cyber-navy-light/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 pointer-events-none transition-colors" />
              <div>
                <div className="p-3 bg-cyber-navy-dark/60 border border-slate-800/80 w-fit rounded-2xl mb-6">
                  <item.icon className="w-6 h-6 text-electric-cyan text-cyan-glow" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 text-[9px] text-slate-500 font-bold uppercase tracking-wider flex justify-between items-center">
                <span>{item.badge}</span>
                <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full shadow-[0_0_6px_#fbbf24]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-cyber-navy-dark py-12 relative z-10">
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

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-xs text-slate-500">
            <Link href="/about" className="hover:text-electric-cyan transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-electric-cyan transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-electric-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-electric-cyan transition-colors">
              Terms of Service
            </Link>
            <Link 
              href="/admin-login" 
              className="text-[9px] text-slate-700 hover:text-electric-cyan transition-colors tracking-wide self-center md:self-end mt-2 md:mt-0 font-medium"
            >
              Admin Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
