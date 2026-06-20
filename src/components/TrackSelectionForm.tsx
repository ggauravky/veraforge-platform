'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Globe, Server, Database, Cpu, ArrowRight, Loader2, Sparkles 
} from 'lucide-react';
import { enrollInTrackAction } from '@/lib/actions/student';
import VeraForgeLogo from '@/components/VeraForgeLogo';

interface TrackSelectionFormProps {
  user: any;
}

type FilterCategory = 'All' | 'Frontend' | 'Backend' | 'Data & AI';

interface TrackCard {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  subCategory: FilterCategory;
  difficulty: string;
  tasks: string[];
}

const trackCards: TrackCard[] = [
  {
    id: 'webdev',
    name: 'Web Development',
    icon: Globe,
    description: 'Construct responsive marketing pages and full-stack React dashboards. Master state management, routing conventions, and database synchronization in modern ecosystems.',
    subCategory: 'Frontend',
    difficulty: 'Intermediate',
    tasks: [
      'Task 1: Build a Responsive Landing Page (HTML/Tailwind)',
      'Task 2: Develop a Full-Stack Task Manager (Next.js/React)'
    ]
  },
  {
    id: 'backend',
    name: 'Backend Engineering',
    icon: Server,
    description: 'Design secure, modular RESTful APIs and model robust database schemas. Implement session handling, validation middleware, and advanced aggregation pipelines.',
    subCategory: 'Backend',
    difficulty: 'Advanced',
    tasks: [
      'Task 1: Create a REST API with Node.js & Express',
      'Task 2: Implement JWT Auth & MongoDB Aggregations'
    ]
  },
  {
    id: 'datasci',
    name: 'Data Science',
    icon: Database,
    description: 'Analyze complex data distributions, clean structured records, and construct predictive ML architectures to extract actionable business intelligence.',
    subCategory: 'Data & AI',
    difficulty: 'Intermediate',
    tasks: [
      'Task 1: Perform Data Cleaning on a CSV using Pandas',
      'Task 2: Build a Predictive Model using Scikit-Learn'
    ]
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: Cpu,
    description: 'Integrate deep learning AI models via REST APIs, configure system prompts, and construct Retrieval-Augmented Generation (RAG) vector stores.',
    subCategory: 'Data & AI',
    difficulty: 'Advanced',
    tasks: [
      'Task 1: Integrate an OpenAI/Gemini API via Python',
      'Task 2: Build a Custom RAG Document Q&A Application'
    ]
  }
];

export default function TrackSelectionForm({ user }: TrackSelectionFormProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');

  const filteredTracks = trackCards.filter(track => {
    if (activeFilter === 'All') return true;
    return track.subCategory === activeFilter;
  });

  const handleEnroll = async (trackId: string, trackName: string) => {
    setLoadingId(trackId);
    setActionError('');
    try {
      const result = await enrollInTrackAction(trackName);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setActionError(result.error || 'Failed to enroll in the track. Please try again.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An unexpected error occurred during enrollment.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative min-h-screen text-slate-100 pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-cyber-navy-light/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[8px] text-emerald-450 font-bold tracking-[0.2em] uppercase">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-indigo-400 font-medium bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              Application Approved
            </span>
          </div>
        </div>
      </header>

      {/* Main Selection Body */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 relative z-10 w-full">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select Your Specialization Track</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Choose Your Technology Specialization
          </h1>
          <p className="text-slate-450 text-sm mt-3 font-light leading-relaxed">
            Welcome, <span className="text-slate-200 font-medium">{user.fullName}</span>. Please choose your career specialization track. Once enrolled, you will unlock your sequential development tasks.
          </p>
        </div>

        {actionError && (
          <div className="mb-8 p-4 bg-red-950/20 border border-red-900/40 rounded-xl text-red-300 text-xs font-bold text-center">
            {actionError}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-900/80">
          {(['All', 'Frontend', 'Backend', 'Data & AI'] as FilterCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all border cursor-pointer ${
                activeFilter === category
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/50 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTracks.map((track) => {
            const IconComponent = track.icon;
            const isEnrolling = loadingId === track.id;

            return (
              <div 
                key={track.id} 
                className="bg-slate-900/15 border border-slate-900 rounded-3xl p-8 hover:border-slate-850 transition-all flex flex-col justify-between group relative overflow-hidden shadow-xl"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

                <div>
                  {/* Header info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 w-fit rounded-2xl">
                      <IconComponent className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest bg-slate-950/60 border border-slate-850 px-2.5 py-1 rounded-full">
                      {track.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <h3 className="text-xl font-bold text-white tracking-tight">{track.name}</h3>
                  <p className="text-slate-400 text-xs font-light mt-3 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Tasks List Summary */}
                  <div className="mt-6 pt-5 border-t border-slate-900/60 space-y-2.5">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Sequence Milestones</span>
                    <div className="space-y-2">
                      {track.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-350 font-medium">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enroll Trigger */}
                <div className="mt-8">
                  <button
                    onClick={() => handleEnroll(track.id, track.name)}
                    disabled={loadingId !== null}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 disabled:from-indigo-800 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    {isEnrolling ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enrolling in specialization...
                      </>
                    ) : (
                      <>
                        Enroll in Specialization
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
