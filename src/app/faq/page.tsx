'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, HelpCircle, ChevronDown, 
  Users, Building, MessageSquare, ArrowRight 
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

interface FAQItem {
  q: string;
  a: string;
}

interface CategoryInfo {
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQHelpCenter() {
  const [activeCategory, setActiveCategory] = useState('Students');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories: Record<string, CategoryInfo> = {
    'Students': {
      name: 'Students',
      icon: <Users className="w-4 h-4" />,
      items: [
        {
          q: 'Who is eligible to apply for VeraForge virtual internships?',
          a: 'Any university student, recent graduate, or self-taught developer looking to verify their real-world coding capability is eligible. We look for core knowledge in your selected track to pass the initial application vetting.'
        },
        {
          q: 'How does the assignment evaluation process work?',
          a: 'When you submit a task deliverable (GitHub repo and live URL), our CI/CD Telemetry Engine automatically compiles the code and runs verification tests. Following compilation success, our administrative team reviews the code structure, formatting, security practices, and logic. You will receive either approval to proceed to the next step, or a request for revision with detailed feedback.'
        },
        {
          q: 'What happens if my submission is rejected?',
          a: 'Do not worry! Rejections are simply requests for revision. The feedback panel will list the specific areas (such as layout responsiveness, database performance, or error handling) that require updates. Once resolved, you can push the fixes and click "Revise & Re-submit" to trigger a new review.'
        },
        {
          q: 'How long do administrators take to review task submissions?',
          a: 'Submissions are reviewed in chronological order. We aim to complete all manual evaluations within 24 to 48 business hours. You will receive real-time notifications in your dashboard when status updates occur.'
        },
        {
          q: 'Is the VeraForge virtual internship program free?',
          a: 'Yes. The entire workspace, automated grading engine, code assessments, and final credential registry hosting are fully subsidized by our network of recruiting partners and sponsoring academic institutions.'
        }
      ]
    },
    'Employers': {
      name: 'Employers',
      icon: <Building className="w-4 h-4" />,
      items: [
        {
          q: 'How do recruiters verify a candidate’s graduation certificate?',
          a: 'Recruiters can verify credentials through our public registry at /verify. Entering the certificate UUID returns the completion metadata, including the graduate’s name, track, completion date, and direct links to the GitHub code repositories of all completed tasks.'
        },
        {
          q: 'What makes a VeraForge virtual internship graduate stand out?',
          a: 'VeraForge is not a simple "watch videos and pass" course. Candidates must engineer functional code projects matching strict enterprise standards, resolve manual code reviews from senior developers, and pass technical quizzes. When you hire a graduate, you are hiring someone who has already proven they can build and deploy working software.'
        },
        {
          q: 'Can employers source developers directly from the registry?',
          a: 'Yes. Our Student Directory allows partner companies to search for active and graduated students who have opted into recruiter outreach, complete with links to their portfolios, universities, and verified project codebases.'
        },
        {
          q: 'How do you prevent plagiarism and code duplication?',
          a: 'Our Telemetry Scanner runs static analysis and code fingerprint checks. Submitting copied projects or template repos triggers a security violation flag. Suspended applications undergo administrative audit before they can be reinstated.'
        }
      ]
    }
  };

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-300 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md relative z-10">
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
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 relative z-10 w-full flex flex-col justify-center">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-slate-400 rounded-full text-xs font-semibold mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>Support & Help Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-xs font-light leading-relaxed">
            Find immediate answers regarding eligibility, evaluation timelines, security protocols, and recruiter verification tools.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 mb-8 justify-center gap-4">
          {Object.values(categories).map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setExpandedIndex(null);
                }}
                className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'border-blue-500 text-white bg-blue-950/10' 
                    : 'border-transparent text-slate-500 hover:text-slate-200'
                }`}
              >
                {cat.icon}
                {cat.name} Questions
              </button>
            );
          })}
        </div>

        {/* Accordions List */}
        <div className="space-y-4 max-w-2xl mx-auto w-full">
          {categories[activeCategory].items.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={index}
                className="glass-panel bg-zinc-900/30 border border-zinc-850 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-200 hover:text-white cursor-pointer select-none"
                >
                  <span className="font-sans leading-relaxed text-xs">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-blue-500' : ''
                  }`} />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 font-light leading-relaxed border-t border-zinc-850/40 animate-in fade-in slide-in-from-top-1 duration-150 font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support gateway notice */}
        <div className="max-w-xl mx-auto w-full mt-12 p-6 glass-panel bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center space-y-4">
          <MessageSquare className="w-5 h-5 text-blue-500 mx-auto" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">Still have questions?</h4>
            <p className="text-[11px] text-slate-450 font-light mt-1.5 leading-relaxed">
              Our support team is online to assist you with onboarding issues, track transfers, or credential inquiries.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-white uppercase tracking-wider transition-colors"
          >
            Contact Help Desk
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center relative z-10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Help Center</span>
          </div>
          <p className="text-[10px] text-slate-500 font-light">
            &copy; {new Date().getFullYear()} VeraForge Platform. SSL Secured cryptographic verifications.
          </p>
        </div>
      </footer>
    </div>
  );
}
