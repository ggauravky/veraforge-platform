'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Clock, Code, Award, CheckCircle2, 
  Terminal, ShieldAlert, Sparkles, Database, Brain, Globe 
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

interface TaskDetail {
  step: number;
  title: string;
  desc: string;
  deliverables: string[];
  techs: string[];
}

interface TrackInfo {
  name: string;
  icon: React.ReactNode;
  duration: string;
  level: string;
  badgeColor: string;
  summary: string;
  skills: string[];
  tasks: TaskDetail[];
}

export default function CurriculumExplorer() {
  const [activeTrack, setActiveTrack] = useState('Web Development');

  const tracks: Record<string, TrackInfo> = {
    'Web Development': {
      name: 'Web Development',
      icon: <Globe className="w-5 h-5" />,
      duration: '4 Weeks',
      level: 'Intermediate',
      badgeColor: 'border-amber-500/20 text-electric-cyan bg-amber-955/20',
      summary: 'Architect production-grade frontends and responsive full-stack websites using modern Next.js schemas, Tailwind styling design tokens, and MongoDB database integrations.',
      skills: ['Next.js App Router', 'Tailwind CSS v4', 'React Hooks', 'MongoDB / Mongoose', 'REST API Routes'],
      tasks: [
        {
          step: 1,
          title: 'Professional Developer Portfolio',
          desc: 'Build and deploy a developer hub showcasing your projects. Integrate a contact channel and dynamic experience timeline.',
          deliverables: ['Responsive design', 'Dark-mode toggles', 'GitHub Action deploy scripts'],
          techs: ['HTML5', 'Tailwind CSS', 'Vite / React']
        },
        {
          step: 2,
          title: 'Interactive Math Engine & Calculator',
          desc: 'Engineer a client-side calculator matching modern mathematical priority rules (PEMDAS) and clean keyboard entry parsing.',
          deliverables: ['Custom parsing state machine', 'Keypress event listeners', 'Layout bounds validation'],
          techs: ['TypeScript', 'CSS Flexbox', 'Vitest Testing']
        },
        {
          step: 3,
          title: 'Full-Stack Task Workspace',
          desc: 'Develop a secure project board. Connect database collections to client interfaces using API routing schemas.',
          deliverables: ['MongoDB connection models', 'Task drag-and-drop actions', 'Middleware session state checks'],
          techs: ['Next.js (App Router)', 'Mongoose', 'MongoDB']
        }
      ]
    },
    'Backend Engineering': {
      name: 'Backend Engineering',
      icon: <Database className="w-5 h-5" />,
      duration: '4 Weeks',
      level: 'Advanced',
      badgeColor: 'border-amber-500/20 text-electric-cyan bg-amber-955/20',
      summary: 'Design high-performance database architectures, secure API authentication boundaries, rate-limit controllers, and transactional logic pipelines.',
      skills: ['Node.js & Express', 'JWT Auth Schemes', 'MongoDB Aggregate Pipelines', 'Security Hardening', 'API Rate Limiting'],
      tasks: [
        {
          step: 1,
          title: 'Secure RESTful User API Gateway',
          desc: 'Create an Express application with JSON Web Token (JWT) credentials authentication, password hashing, and user role validation.',
          deliverables: ['bcrypt password hashing', 'Session token expires headers', 'Rate-limiting middleware'],
          techs: ['Node.js', 'Express', 'JWT']
        },
        {
          step: 2,
          title: 'MongoDB Dynamic Event Aggregator',
          desc: 'Architect a database model managing log entries. Implement index constraints and aggregate calculations for reports.',
          deliverables: ['Index validation scripts', 'Dynamic pipeline stages ($lookup, $group)', 'CSV report output streams'],
          techs: ['MongoDB', 'Mongoose', 'JavaScript']
        },
        {
          step: 3,
          title: 'Microservice Request Isolator',
          desc: 'Design an API load boundary protecting sensitive core platform engines against high request counts and DDoS vectors.',
          deliverables: ['IP rate limits', 'Redis cluster memory states (Mock)', 'Custom CORS filtering'],
          techs: ['Express.js', 'Node.js', 'DDoS protection specs']
        }
      ]
    },
    'Data Science': {
      name: 'Data Science',
      icon: <Code className="w-5 h-5" />,
      duration: '4 Weeks',
      level: 'Intermediate to Advanced',
      badgeColor: 'border-amber-500/20 text-electric-cyan bg-amber-955/20',
      summary: 'Import, parse, clean, and process complex high-dimensional CSV data schemas using Python Pandas, followed by training predictive regression models.',
      skills: ['Python / NumPy', 'Pandas Clean Pipelines', 'Scikit-Learn Models', 'Data Validation Schemes', 'MSE Model Evaluation'],
      tasks: [
        {
          step: 1,
          title: 'Automated CSV Parser & Validator',
          desc: 'Write scripts importing raw data. Filter out invalid rows, format date keys, and calculate missing parameters.',
          deliverables: ['Null values cleaning', 'Dtype conversions checks', 'Exporting clean datasets'],
          techs: ['Python', 'Pandas', 'Jupyter']
        },
        {
          step: 2,
          title: 'Syllabus Core Regression Model',
          desc: 'Train a linear predictive regression model estimating output tags based on multi-variable criteria values.',
          deliverables: ['Feature normalization splits', 'Model training parameters', 'Matplotlib plot outputs'],
          techs: ['Python', 'Scikit-Learn', 'NumPy']
        },
        {
          step: 3,
          title: 'Model Evaluation & Metric Reports',
          desc: 'Analyze target model performance against training splits using Mean Squared Error (MSE) and R-Squared values.',
          deliverables: ['MSE calculations scripts', 'Cross-validation splits tests', 'Model parameter exports'],
          techs: ['Scikit-Learn', 'Pandas', 'Python']
        }
      ]
    },
    'Artificial Intelligence': {
      name: 'Artificial Intelligence',
      icon: <Brain className="w-5 h-5" />,
      duration: '4 Weeks',
      level: 'Advanced',
      badgeColor: 'border-amber-500/20 text-electric-cyan bg-amber-955/20',
      summary: 'Integrate advanced large language models, construct Retrieval-Augmented Generation (RAG) pipelines, and enforce output guardrail policies.',
      skills: ['Gemini API Pipelines', 'Retrieval-Augmented Generation', 'Prompt Engineering', 'Vector Database Storage', 'LLM Guardrail Architectures'],
      tasks: [
        {
          step: 1,
          title: 'API Client & Backoff Rate Controller',
          desc: 'Integrate Gemini API endpoints with automated retry scripts, exponential backoff, and input length filters.',
          deliverables: ['Axios retry schemas', 'API response validation', 'Request limits management'],
          techs: ['TypeScript', 'Gemini API SDK', 'Node.js']
        },
        {
          step: 2,
          title: 'Retrieval-Augmented Document Search',
          desc: 'Develop a RAG engine extracting matching nodes from source manuals to inject relevant context variables into user prompts.',
          deliverables: ['Cosine similarity algorithms (Mock)', 'Document text chunk splitting', 'Context inject functions'],
          techs: ['TypeScript', 'Next.js', 'Vector DB indices']
        },
        {
          step: 3,
          title: 'Deterministic Guardrail Prompt Engine',
          desc: 'Construct system instructions templates ensuring AI models return structured, validated outputs while avoiding hallucinations.',
          deliverables: ['JSON-only output rules', 'Safety keyword lists checks', 'Response error triggers'],
          techs: ['Prompt Engineering', 'LLM Guardrails', 'JSON Schema']
        }
      ]
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen text-slate-350 font-sans">
      {/* Moving background grid */}
      <div className="absolute inset-0 cyber-grid-moving opacity-[0.22] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-550/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-cyber-navy-light/35 bg-cyber-navy-dark/80 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-electric-cyan transition-colors font-bold uppercase tracking-wider group"
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
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 relative z-10 w-full">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-955/40 border border-electric-cyan/25 text-electric-cyan rounded-full text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Virtual Academy Syllabus</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Curriculum & Specialization Tracks
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            Explore our sequential developer curriculums. Complete all tasks within your chosen specialization to earn verified credentials.
          </p>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
          {Object.values(tracks).map((track) => {
            const isActive = activeTrack === track.name;
            return (
              <button
                key={track.name}
                onClick={() => setActiveTrack(track.name)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-electric-cyan text-cyber-navy-dark border-electric-cyan shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-cyber-navy-light/10 border-cyber-navy-light/45 text-slate-450 hover:text-slate-200'
                }`}
              >
                {track.icon}
                {track.name}
              </button>
            );
          })}
        </div>

        {/* Track Detail Grid */}
        {(() => {
          const track = tracks[activeTrack];
          return (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column: Track Summary Metadata */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-panel bg-cyber-navy-light/10 border-cyber-navy-light/65 p-6 rounded-3xl space-y-6">
                  <div>
                    <span className={`inline-block px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${track.badgeColor}`}>
                      {track.level}
                    </span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">{track.name}</h2>
                    <p className="text-slate-400 text-xs font-light leading-relaxed mt-2">{track.summary}</p>
                  </div>

                  <div className="border-t border-cyber-navy-light/35 pt-4 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-light flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Completion Time:
                      </span>
                      <span className="font-semibold text-slate-200">{track.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-light flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-slate-400" />
                        Credentials Level:
                      </span>
                      <span className="font-semibold text-slate-200">Verified Graduate</span>
                    </div>
                  </div>

                  {/* Core skills learned list */}
                  <div className="border-t border-cyber-navy-light/35 pt-4">
                    <span className="text-[10px] font-bold text-slate-350 uppercase tracking-wider block mb-3">Core Competencies:</span>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 bg-cyber-navy-dark border border-cyber-navy-light/50 text-[10px] font-semibold text-slate-300 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secure certification seal info */}
                <div className="glass-panel bg-amber-955/5 border-amber-500/10 p-6 rounded-3xl flex gap-3.5 items-start">
                  <ShieldAlert className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Verification Audit Note</h4>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-1">
                      Our system verifies project authenticity by running dynamic code compilers. Direct code duplicates or plagiarism results in verification failures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Step-by-Step Task Roadmap */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-cyber-navy-light/35 pb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                    <Terminal className="w-4 h-4 text-electric-cyan" />
                    Syllabus Milestones
                  </h3>
                  <span className="text-xs text-slate-500">{track.tasks.length} Sequential Steps</span>
                </div>

                <div className="space-y-6">
                  {track.tasks.map((task) => (
                    <div 
                      key={task.step}
                      className="glass-panel hover:border-cyber-navy-light/90 bg-cyber-navy-light/5 p-6 rounded-3xl relative overflow-hidden group transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-electric-cyan/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3">
                          {/* Step number badge */}
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/50 text-[9px] font-bold text-slate-350 rounded-full uppercase tracking-wider">
                              Step {task.step}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-tighter">TASK ID: 0x0{task.step}</span>
                          </div>

                          <h4 className="text-base font-bold text-white">{task.title}</h4>
                          <p className="text-slate-400 text-xs font-light leading-relaxed max-w-2xl">{task.desc}</p>
                          
                          {/* Key Deliverables list */}
                          <div className="pt-2">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1.5">Deliverable Specifications:</span>
                            <div className="grid sm:grid-cols-2 gap-1.5">
                              {task.deliverables.map((del, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                                  <span className="font-light">{del}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tech tags stack */}
                        <div className="shrink-0 flex flex-wrap md:flex-col gap-1.5 mt-2 md:mt-0 md:items-end justify-start">
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block md:mb-1">Tech Stack:</span>
                          {task.techs.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/35 text-[9px] font-semibold text-slate-300 rounded font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom call to action */}
                <div className="flex justify-center pt-4">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-electric-cyan hover:bg-electric-cyan/85 text-cyber-navy-dark font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Register Now & Start Track
                  </Link>
                </div>

              </div>

            </div>
          );
        })()}

      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-navy-light/35 bg-cyber-navy-dark py-10 text-center relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Virtual Academy</span>
          </div>
          <p className="text-[10px] text-slate-500 font-light">
            &copy; {new Date().getFullYear()} VeraForge Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
