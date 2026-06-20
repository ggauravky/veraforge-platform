import Link from 'next/link';
import { ArrowLeft, Cpu, Compass, Layers, CheckSquare, GraduationCap } from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen text-slate-300">
      {/* Background grid mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-cyber-navy-light/80 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-100 transition-colors font-bold uppercase tracking-wider group"
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Our Vision & Philosophy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Redefining Practical <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Skill Validation.
            </span>
          </h1>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
            Traditional resumes tell. VeraForge proves. We replace standard application forms and exaggerated credentials with a rigorous, execution-first engineering internship platform.
          </p>
        </div>

        {/* The Paradox Section (Two Columns) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 backdrop-blur-sm hover:border-slate-850/80 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block mb-2">The Challenge</span>
              <h2 className="text-2xl font-bold text-white mb-4">The Resume Paradox</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Modern software engineering hiring is broken. Candidates submit copy-pasted tutorial code or generate synthetic summaries. Organizations spend hundreds of engineering hours sorting through paper credentials without seeing a single line of validated, custom-written code.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900/60 text-slate-500 text-xs">
              Traditional Hiring is Static and Unverified.
            </div>
          </div>

          <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 backdrop-blur-sm hover:border-slate-850/80 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">Our Answer</span>
              <h2 className="text-2xl font-bold text-white mb-4">Cryptographic Execution</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                VeraForge provides pre-vetted, sandboxed curriculum tracks designed to push candidates into real-world architectures. Candidates write clean code, push to active repositories, deploy live builds, and undergo detailed administrative review. We back their graduation with unique registry UUID credentials.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900/60 text-emerald-500/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              100% Verified Performance Portfolio.
            </div>
          </div>
        </div>

        {/* System Methodology (Horizontal Timeline/Steps) */}
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
                color: 'text-indigo-400 border-indigo-900/30'
              },
              {
                step: '02',
                title: 'Sandbox Challenges',
                description: 'Execute increasingly complex tasks, integrating real database drivers, JWT systems, or APIs.',
                icon: Cpu,
                color: 'text-purple-400 border-purple-900/30'
              },
              {
                step: '03',
                title: 'Admin Review',
                description: 'Administrators audit repository structures and live outputs, providing direct review feedback.',
                icon: CheckSquare,
                color: 'text-emerald-400 border-emerald-900/30'
              },
              {
                step: '04',
                title: 'UUID Registry',
                description: 'Graduate with an official, high-resolution A4 landscape certificate registered on our verification portal.',
                icon: GraduationCap,
                color: 'text-amber-400 border-amber-900/30'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/10 border border-slate-900 rounded-2xl p-6 hover:border-slate-850 transition-all flex flex-col relative"
              >
                <div className="absolute top-4 right-4 text-3xl font-black text-slate-850 select-none">
                  {item.step}
                </div>
                <div className={`p-2.5 bg-slate-950 w-fit rounded-xl border ${item.color} mb-6`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Bento */}
        <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Platform Architecture</span>
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
                  className="px-3 py-1 bg-slate-950 border border-slate-900 rounded-lg text-xs text-slate-500 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-cyber-navy-dark py-10 text-center relative z-10 mt-auto">
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
