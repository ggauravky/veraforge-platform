import Link from 'next/link';
import { ArrowLeft, Cpu, Compass, Layers, CheckSquare, GraduationCap } from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-300">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-blue-500 transition-colors font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-5 h-5" />
            <span className="font-extrabold text-lg tracking-wider text-white">VERAFORGE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 relative z-10 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-slate-400 rounded-full text-xs font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Our Vision & Philosophy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Redefining Practical <br />
            <span className="text-blue-500">Skill Validation.</span>
          </h1>
          <p className="text-slate-400 font-light text-sm leading-relaxed max-w-2xl mx-auto">
            Traditional resumes tell. VeraForge proves. We replace standard application forms and exaggerated credentials with a rigorous, execution-first engineering internship platform.
          </p>
        </div>

        {/* The Paradox Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-panel rounded-2xl p-8 hover:border-zinc-700 transition-all duration-350 flex flex-col justify-between bg-zinc-900/50">
            <div>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest block mb-2">The Challenge</span>
              <h2 className="text-xl font-bold text-white mb-4">The Resume Paradox</h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Modern software engineering hiring is broken. Candidates submit copy-pasted tutorial code or generate synthetic summaries. Organizations spend hundreds of engineering hours sorting through paper credentials without seeing a single line of validated, custom-written code.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-850 text-slate-500 text-xs font-light">
              Traditional Hiring is Static and Unverified.
            </div>
          </div>
 
          <div className="glass-panel rounded-2xl p-8 hover:border-zinc-700 transition-all duration-350 flex flex-col justify-between bg-zinc-900/50">
            <div>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest block mb-2">Our Answer</span>
              <h2 className="text-xl font-bold text-white mb-4">Cryptographic Execution</h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                VeraForge provides pre-vetted, sandboxed curriculum tracks designed to push candidates into real-world architectures. Candidates write clean code, push to active repositories, deploy live builds, and undergo detailed administrative review. We back their graduation with unique registry UUID credentials.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-850 text-blue-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              100% Verified Performance Portfolio.
            </div>
          </div>
        </div>

        {/* Vetting Comparison Diagram */}
        <div className="glass-panel rounded-2xl p-8 md:p-10 mb-16 relative overflow-hidden bg-zinc-900/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase block mb-2">VETTING METHODOLOGY COMPARISON</span>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Static Credentials vs. Active Vetting</h3>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Traditional */}
            <div className="md:col-span-5 bg-zinc-950 border border-zinc-850 rounded-2xl p-6 text-center space-y-4">
              <div className="text-red-400 font-bold uppercase tracking-wider text-xs">Traditional Vetting</div>
              <div className="h-28 flex items-center justify-center relative">
                <svg className="w-12 h-12 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <div className="absolute bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-red-400 font-bold text-[8px] tracking-wider">
                  UNVERIFIED DATA
                </div>
              </div>
              <p className="text-slate-500 text-xs font-light">Resumes with keywords, copy-pasted bootcamps, and unchecked portfolio links.</p>
            </div>
            
            {/* Center Flow */}
            <div className="md:col-span-2 flex flex-col items-center justify-center py-4">
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2">VS</span>
              <svg className="w-8 h-8 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            
            {/* Right: Cryptographic */}
            <div className="md:col-span-5 bg-zinc-950 border border-zinc-850 rounded-2xl p-6 text-center space-y-4">
              <div className="text-blue-500 font-bold uppercase tracking-wider text-xs">VeraForge Verification</div>
              <div className="h-28 flex items-center justify-center relative">
                <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" strokeWidth="1.5" />
                </svg>
                <div className="absolute bg-blue-950 border border-blue-900 rounded px-2 py-1 text-blue-450 font-mono text-[8px] tracking-wider">
                  CRYPTO SECURED
                </div>
              </div>
              <p className="text-slate-400 text-xs font-light">Sandboxed repo execution, automated code telemetry, and public registry certification.</p>
            </div>
          </div>
        </div>

        {/* System Lifecycle steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">The Intern Lifecycle</h2>
            <p className="text-slate-500 text-xs font-light mt-2">Our automated, verified four-stage journey.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Track Selection',
                description: 'Candidates choose a specialized path: Frontend, Backend, AI integration, or Data Science.',
                icon: Compass,
                color: 'text-blue-500 border-zinc-800'
              },
              {
                step: '02',
                title: 'Sandbox Challenges',
                description: 'Execute increasingly complex tasks, integrating real database drivers, JWT systems, or APIs.',
                icon: Cpu,
                color: 'text-blue-500 border-zinc-800'
              },
              {
                step: '03',
                title: 'Admin Review',
                description: 'Administrators audit repository structures and live outputs, providing direct review feedback.',
                icon: CheckSquare,
                color: 'text-blue-500 border-zinc-800'
              },
              {
                step: '04',
                title: 'UUID Registry',
                description: 'Graduate with an official, high-resolution A4 landscape certificate registered on our verification portal.',
                icon: GraduationCap,
                color: 'text-blue-500 border-zinc-800'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="glass-panel rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 flex flex-col relative bg-zinc-900/40"
              >
                <div className="absolute top-4 right-4 text-2xl font-black text-zinc-850 select-none">
                  {item.step}
                </div>
                <div className={`p-2.5 bg-zinc-950 w-fit rounded-xl border ${item.color} mb-6`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-sans">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Bento */}
        <div className="glass-panel rounded-2xl p-8 relative overflow-hidden bg-zinc-900/20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-blue-500 font-extrabold uppercase tracking-widest">Platform Architecture</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight mb-4">
              Built on Modern Infrastructure
            </h2>
            <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
              VeraForge is engineered with **Next.js 16 (App Router)** for rapid server rendering, **Clerk Authentication** for identity management, and **MongoDB** via **Mongoose** for high-integrity relational task mapping. Administrative routes are protected using secure HTTP-only session tokens, isolation layers, and cryptographic UUID certificate hashing.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['Next.js 16 (App Router)', 'Clerk Auth', 'MongoDB', 'Mongoose ODM', 'html2canvas + jsPDF', 'Lucide Vector System'].map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-slate-400 font-semibold transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center relative z-10 mt-auto">
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
