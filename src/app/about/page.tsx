import Link from 'next/link';
import { ArrowLeft, Cpu, Compass, Layers, CheckSquare, GraduationCap } from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen text-slate-350">
      {/* Moving background grid */}
      <div className="absolute inset-0 cyber-grid-moving opacity-[0.22] pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-cyber-navy-light/35 bg-cyber-navy-dark/80 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-electric-cyan transition-colors font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-5 h-5 animate-pulse" />
            <span className="font-extrabold text-lg tracking-wider text-white">VERAFORGE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 relative z-10 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyber-navy-light/30 border border-electric-cyan/20 text-electric-cyan rounded-full text-xs font-semibold mb-6 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
            <Compass className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
            <span>Our Vision & Philosophy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Redefining Practical <br />
            <span className="bg-gradient-to-r from-yellow-450 via-amber-500 to-orange-400 bg-clip-text text-transparent text-cyan-glow">
              Skill Validation.
            </span>
          </h1>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
            Traditional resumes tell. VeraForge proves. We replace standard application forms and exaggerated credentials with a rigorous, execution-first engineering internship platform.
          </p>
        </div>

        {/* The Paradox Section (Two Columns) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-panel rounded-3xl p-8 hover:border-electric-cyan/35 hover:shadow-[0_0_25px_rgba(245,158,11,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-cyber-navy-light/10">
            <div>
              <span className="text-[10px] text-electric-blue font-bold uppercase tracking-widest block mb-2">The Challenge</span>
              <h2 className="text-2xl font-bold text-white mb-4">The Resume Paradox</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Modern software engineering hiring is broken. Candidates submit copy-pasted tutorial code or generate synthetic summaries. Organizations spend hundreds of engineering hours sorting through paper credentials without seeing a single line of validated, custom-written code.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-cyber-navy-light/35 text-slate-500 text-xs">
              Traditional Hiring is Static and Unverified.
            </div>
          </div>
 
          <div className="glass-panel rounded-3xl p-8 hover:border-electric-cyan/35 hover:shadow-[0_0_25px_rgba(245,158,11,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-cyber-navy-light/10">
            <div>
              <span className="text-[10px] text-electric-cyan font-bold uppercase tracking-widest block mb-2 text-cyan-glow">Our Answer</span>
              <h2 className="text-2xl font-bold text-white mb-4">Cryptographic Execution</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                VeraForge provides pre-vetted, sandboxed curriculum tracks designed to push candidates into real-world architectures. Candidates write clean code, push to active repositories, deploy live builds, and undergo detailed administrative review. We back their graduation with unique registry UUID credentials.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-cyber-navy-light/35 text-electric-cyan/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-glow">
              <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_8px_#fbbf24]" />
              100% Verified Performance Portfolio.
            </div>
          </div>
        </div>

        {/* Dynamic Vetting Comparison Diagram */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 mb-16 border-cyber-navy-light/45 relative overflow-hidden bg-cyber-navy-light/5">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] text-electric-cyan font-bold tracking-widest uppercase block mb-2 text-cyan-glow">VETTING METHODOLOGY COMPARISON</span>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Static Credentials vs. Active Vetting</h3>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Traditional */}
            <div className="md:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-6 text-center space-y-4">
              <div className="text-red-400 font-bold uppercase tracking-wider text-xs">Traditional Vetting</div>
              <div className="h-28 flex items-center justify-center relative">
                <svg className="w-16 h-16 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                {/* Red warning cross */}
                <div className="absolute bg-red-955/80 border border-red-500/50 rounded-lg px-2 py-1 text-red-400 font-bold text-[8px] tracking-wider animate-pulse">
                  UNVERIFIED DATA
                </div>
              </div>
              <p className="text-slate-500 text-xs font-light">Resumes with keywords, copy-pasted bootcamps, and unchecked portfolio links.</p>
            </div>
            
            {/* Center Flow */}
            <div className="md:col-span-2 flex flex-col items-center justify-center py-4">
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2">VS</span>
              <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            
            {/* Right: Cryptographic */}
            <div className="md:col-span-5 bg-cyber-navy-dark/80 border border-electric-cyan/20 rounded-2xl p-6 text-center space-y-4 shadow-[0_0_20px_rgba(245,158,11,0.02)]">
              <div className="text-electric-cyan font-bold uppercase tracking-wider text-xs text-cyan-glow">VeraForge Verification</div>
              <div className="h-28 flex items-center justify-center relative">
                <svg className="w-16 h-16 text-electric-cyan animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" strokeWidth="1.5" />
                </svg>
                {/* Glowing check banner */}
                <div className="absolute bg-amber-950/90 border border-electric-cyan/45 rounded-lg px-2 py-1 text-electric-cyan font-mono text-[8px] tracking-wider text-cyan-glow">
                  CRYPTO SECURED
                </div>
              </div>
              <p className="text-slate-400 text-xs font-light">Sandboxed repo execution, automated code telemetry, and public registry certification.</p>
            </div>
          </div>
        </div>

        {/* System Methodology (Horizontal Steps) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">The Intern Lifecycle</h2>
            <p className="text-slate-500 text-sm font-light mt-2">Our automated, verified four-stage journey.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Track Selection',
                description: 'Candidates choose a specialized path: Frontend, Backend, AI integration, or Data Science.',
                icon: Compass,
                color: 'text-electric-blue border-electric-blue/20'
              },
              {
                step: '02',
                title: 'Sandbox Challenges',
                description: 'Execute increasingly complex tasks, integrating real database drivers, JWT systems, or APIs.',
                icon: Cpu,
                color: 'text-electric-cyan border-electric-cyan/20'
              },
              {
                step: '03',
                title: 'Admin Review',
                description: 'Administrators audit repository structures and live outputs, providing direct review feedback.',
                icon: CheckSquare,
                color: 'text-electric-cyan border-electric-cyan/20'
              },
              {
                step: '04',
                title: 'UUID Registry',
                description: 'Graduate with an official, high-resolution A4 landscape certificate registered on our verification portal.',
                icon: GraduationCap,
                color: 'text-electric-blue border-electric-blue/20'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="glass-panel rounded-2xl p-6 hover:border-electric-cyan/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative bg-cyber-navy-light/10"
              >
                <div className="absolute top-4 right-4 text-3xl font-black text-cyber-navy-light select-none">
                  {item.step}
                </div>
                <div className={`p-2.5 bg-cyber-navy-dark w-fit rounded-xl border ${item.color} mb-6`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Bento */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden group border-cyber-navy-light/45 bg-cyber-navy-light/5">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-electric-cyan text-cyan-glow" />
              <span className="text-xs text-electric-cyan font-extrabold uppercase tracking-[0.2em] text-cyan-glow">Platform Architecture</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
              Built on Modern Infrastructure
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
              VeraForge is engineered with **Next.js 16 (App Router)** for rapid server rendering, **Clerk Authentication** for identity management, and **MongoDB** via **Mongoose** for high-integrity relational task mapping. Administrative routes are protected using secure HTTP-only session tokens, isolation layers, and cryptographic UUID certificate hashing.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Next.js 16 (App Router)', 'Clerk Auth', 'MongoDB', 'Mongoose ODM', 'html2canvas + jsPDF', 'Lucide Vector System'].map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-cyber-navy-dark border border-cyber-navy-light/40 rounded-lg text-xs text-slate-450 font-semibold hover:border-electric-cyan/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-navy-light/35 bg-cyber-navy-dark py-10 text-center relative z-10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Credentialing</span>
          </div>
          <p className="text-[10px] text-slate-500">
            &copy; {new Date().getFullYear()} VeraForge Platform. Built for validated talent discovery.
          </p>
        </div>
      </footer>
    </div>
  );
}
