'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Brain, ChevronRight, 
  RotateCcw, Globe, Database, Code, ShieldCheck, ArrowRight 
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

interface Question {
  question: string;
  options: {
    text: string;
    track: string;
  }[];
}

export default function TrackMatcherQuiz() {
  const [step, setStep] = useState(0); // 0 = Intro, 1-5 = Questions, 6 = Results
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: Question[] = [
    {
      question: "What excites you most when starting a software project?",
      options: [
        { text: "Designing pixel-perfect, interactive layouts that users love.", track: "Web Development" },
        { text: "Architecting secure routers, database indexing structures, and APIs.", track: "Backend Engineering" },
        { text: "Parsing large tables of raw data to identify hidden trends and patterns.", track: "Data Science" },
        { text: "Building context-aware neural agents and prompting complex LLMs.", track: "Artificial Intelligence" }
      ]
    },
    {
      question: "Which coding environment makes you feel most at home?",
      options: [
        { text: "CSS variables, Next.js page nodes, and client-side transitions.", track: "Web Development" },
        { text: "JWT authorization scripts, Express middleware, and backend routes.", track: "Backend Engineering" },
        { text: "Jupyter notebooks, Pandas dataframes, and Numpy arrays.", track: "Data Science" },
        { text: "System instruction prompt templates and vector index files.", track: "Artificial Intelligence" }
      ]
    },
    {
      question: "How do you prefer to approach database management?",
      options: [
        { text: "Querying dynamic collections to render page items in real time.", track: "Web Development" },
        { text: "Structuring aggregate pipelines ($group, $lookup) and indexes.", track: "Backend Engineering" },
        { text: "Cleaning null cells and parsing raw CSV tables into models.", track: "Data Science" },
        { text: "Mapping dimensional coordinates inside vector database clusters.", track: "Artificial Intelligence" }
      ]
    },
    {
      question: "What is your primary goal when deploying code applications?",
      options: [
        { text: "Ensuring visual responsiveness across narrow screen widths.", track: "Web Development" },
        { text: "Hardening routes with rate-limit boundaries and request security.", track: "Backend Engineering" },
        { text: "Generating Mean Squared Error performance metrics and charts.", track: "Data Science" },
        { text: "Preventing AI model hallucinations and establishing safety walls.", track: "Artificial Intelligence" }
      ]
    },
    {
      question: "What validation tasks do you find most interesting?",
      options: [
        { text: "Testing user clicks and state priority boundaries using Vitest.", track: "Web Development" },
        { text: "Ensuring secure credential token headers and status codes.", track: "Backend Engineering" },
        { text: "Optimizing statistical training variables and test splits.", track: "Data Science" },
        { text: "Constructing deterministic safety boundaries on inputs.", track: "Artificial Intelligence" }
      ]
    }
  ];

  const handleNext = () => {
    if (selectedOption === null) return;

    const chosenTrack = questions[step - 1].options[selectedOption].track;
    const nextAnswers = [...answers, chosenTrack];
    setAnswers(nextAnswers);
    setSelectedOption(null);

    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const getResults = () => {
    const counts: Record<string, number> = {
      'Web Development': 0,
      'Backend Engineering': 0,
      'Data Science': 0,
      'Artificial Intelligence': 0
    };

    answers.forEach(track => {
      counts[track] = (counts[track] || 0) + 1;
    });

    // Find the track with max score
    let matchedTrack = 'Web Development';
    let maxCount = -1;

    Object.entries(counts).forEach(([track, count]) => {
      if (count > maxCount) {
        maxCount = count;
        matchedTrack = track;
      }
    });

    const percentiles = Object.entries(counts).reduce((acc, [track, count]) => {
      acc[track] = Math.round((count / 5) * 100);
      return acc;
    }, {} as Record<string, number>);

    return { matchedTrack, percentiles };
  };

  const { matchedTrack, percentiles } = step === 6 ? getResults() : { matchedTrack: '', percentiles: {} };

  const trackIcons: Record<string, React.ReactNode> = {
    'Web Development': <Globe className="w-8 h-8 text-blue-500" />,
    'Backend Engineering': <Database className="w-8 h-8 text-blue-500" />,
    'Data Science': <Code className="w-8 h-8 text-blue-500" />,
    'Artificial Intelligence': <Brain className="w-8 h-8 text-blue-500" />
  };

  const trackDescriptions: Record<string, string> = {
    'Web Development': 'Architect high-fidelity frontends, dynamic layout nodes, and client-side state engines using Next.js, Tailwind v4, and Mongoose database bindings.',
    'Backend Engineering': 'Design bulletproof authentication gates, aggregate database pipelines, load controllers, and security-hardened Express endpoints.',
    'Data Science': 'Wrangle high-dimensional tabular datasets, design Python clean paths, train regression engines, and analyze target metric charts.',
    'Artificial Intelligence': 'Integrate semantic prompts templates, configure Vector storage indexers, design custom RAG queries, and enforce strict safety guardrails.'
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-350 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
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
      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 relative z-10 w-full flex flex-col justify-center items-center">
        
        {step === 0 && (
          /* Step 0: Intro Page */
          <div className="text-center space-y-8 animate-in fade-in duration-300">
            <div className="mx-auto w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-500" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 block">
                SPECIALIZATION ALIGNMENT SYSTEM
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                Find Your Internship Track
              </h1>
              <p className="text-slate-400 text-xs font-light leading-relaxed max-w-md mx-auto">
                Unsure which specialization to pursue? Take our 5-question technical preference quiz to evaluate your skills and match with the ideal VeraForge academy path.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              Start Specialization Quiz
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step > 0 && step <= 5 && (
          /* Steps 1-5: Questions */
          <div className="w-full glass-panel rounded-2xl p-8 bg-zinc-900/50 relative overflow-hidden animate-in fade-in duration-200">
            {/* Question Step Indicator */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                Question {step} of 5
              </span>
              <div className="w-32 bg-zinc-950 border border-zinc-850 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-sm font-bold text-white mb-6 leading-snug font-sans">
              {questions[step - 1].question}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {questions[step - 1].options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedOption(optIdx)}
                    className={`w-full text-left p-4 text-xs rounded-xl border transition-all cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-blue-950/20 border-blue-600 text-white'
                        : 'bg-zinc-950 border-zinc-850 text-slate-400 hover:border-zinc-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-blue-500' : 'border-zinc-700'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                      </div>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-950 disabled:border-zinc-850 disabled:text-slate-500 border border-transparent disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          /* Step 6: Results */
          <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="glass-panel rounded-2xl p-8 bg-zinc-900/50 relative overflow-hidden text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-zinc-950 border border-zinc-850 rounded-2xl flex items-center justify-center">
                {trackIcons[matchedTrack]}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 block">
                  RECOMMENDED TRACK MATCH
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  {matchedTrack}
                </h2>
                <p className="text-slate-405 text-xs font-light leading-relaxed max-w-md mx-auto">
                  {trackDescriptions[matchedTrack]}
                </p>
              </div>

              {/* Match Percentiles Stats */}
              <div className="border-t border-zinc-800/60 pt-6 space-y-4 max-w-sm mx-auto text-left">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Match breakdown:</span>
                
                {Object.entries(percentiles).map(([track, score]) => (
                  <div key={track} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className={track === matchedTrack ? 'text-white' : 'text-slate-450'}>{track}</span>
                      <span className="text-blue-500">{score}%</span>
                    </div>
                    <div className="w-full bg-zinc-950 border border-zinc-850 rounded-full h-1.5 p-[1px] relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          track === matchedTrack ? 'bg-blue-600' : 'bg-blue-600/40'
                        }`} 
                        style={{ width: `${score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-zinc-800/60">
                <button
                  onClick={handleReset}
                  className="px-5 py-3 border border-zinc-805 bg-zinc-950 hover:bg-zinc-900 text-slate-300 hover:text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restart Quiz
                </button>

                <Link
                  href="/sign-up"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Enroll in Track
                </Link>
              </div>

            </div>

            <div className="text-center">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors"
              >
                Learn more about our methodology
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center relative z-10 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Track Matcher</span>
          </div>
          <p className="text-[10px] text-slate-550">
            &copy; {new Date().getFullYear()} VeraForge Platform. SSL Secured cryptographic verifications.
          </p>
        </div>
      </footer>
    </div>
  );
}
