'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, Search, ArrowLeft, AlertCircle, 
  Award, Clock, CheckCircle2, Building 
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export default function VerifyRegistrySearch() {
  const router = useRouter();
  const [uuid, setUuid] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = uuid.trim();
    if (!trimmed) {
      setError('Please enter a certificate verification ID.');
      return;
    }

    // Basic UUID validation (8-4-4-4-12 hex format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(trimmed)) {
      setError('Invalid registry format. ID must be a 36-character UUID (e.g., fcdbd56f-739a-420c-b9e6-89a817aaa717).');
      return;
    }

    setIsValidating(true);
    // Simulate registry search latency
    setTimeout(() => {
      setIsValidating(false);
      router.push(`/verify/${trimmed}`);
    }, 1000);
  };

  const handlePasteDemo = (demoUuid: string) => {
    setUuid(demoUuid);
    setError('');
  };

  const recentCertificates = [
    {
      id: 'fcdbd56f-739a-420c-b9e6-89a817aaa717',
      name: 'A. Patel',
      track: 'Web Development',
      date: 'July 2026',
      status: 'VERIFIED'
    },
    {
      id: '864e432a-5b12-421c-8b89-a292b0c15914',
      name: 'M. Chen',
      track: 'Artificial Intelligence',
      date: 'June 2026',
      status: 'VERIFIED'
    },
    {
      id: 'd977061b-432d-456c-bc11-a20c95a29815',
      name: 'S. Rodriguez',
      track: 'Backend Engineering',
      date: 'May 2026',
      status: 'VERIFIED'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen text-slate-350">
      {/* Moving background grid */}
      <div className="absolute inset-0 cyber-grid-moving opacity-[0.22] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-550/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

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
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 relative z-10 w-full flex flex-col justify-center items-center">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-955/40 border border-electric-cyan/25 text-electric-cyan rounded-full text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
            <ShieldCheck className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
            <span>VeraForge Cryptographic Registry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Verify Intern Credentials
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-lg mx-auto font-sans">
            Validate graduation credentials registered on the VeraForge network. Input a certificate UUID identifier below to inspect completion metadata.
          </p>
        </div>

        {/* Search Panel */}
        <div className="w-full max-w-lg glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-cyber-navy-light/10 mb-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-550/5 rounded-full blur-2xl pointer-events-none" />

          {error && (
            <div className="mb-6 p-4 bg-red-955/20 border border-red-900/40 rounded-xl text-red-300 text-xs font-semibold flex items-center gap-2 font-sans">
              <AlertCircle className="w-4 h-4 text-red-505 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="uuid" className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-sans">
                Certificate Verification ID (UUID)
              </label>
              <div className="relative">
                <input
                  id="uuid"
                  type="text"
                  placeholder="e.g. fcdbd56f-739a-420c-b9e6-89a817aaa717"
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  className="w-full bg-cyber-navy-dark border border-cyber-navy-light/45 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl pl-4 pr-12 py-3 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                  required
                />
                <button
                  type="submit"
                  disabled={isValidating}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-cyber-navy-light text-cyber-navy-dark rounded-lg transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full py-3.5 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-cyber-navy-light disabled:border-cyber-navy-light/45 disabled:text-slate-500 border border-transparent text-cyber-navy-dark font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.1)] font-sans"
            >
              {isValidating ? 'Validating Registry Path...' : 'Query Registry Database'}
            </button>
          </form>
        </div>

        {/* Recently Verified Records Section */}
        <div className="w-full max-w-2xl border-t border-cyber-navy-light/35 pt-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Building className="w-4 h-4 text-electric-cyan animate-pulse" />
            Recently Verified Credentials
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {recentCertificates.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => handlePasteDemo(cert.id)}
                className="glass-panel hover:border-electric-cyan/35 hover:-translate-y-1 bg-cyber-navy-light/5 p-4 rounded-2xl cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-white tracking-tight">{cert.name}</span>
                    <span className="text-[8px] font-extrabold text-emerald-450 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.5 rounded">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 font-light font-sans">{cert.track} Track</p>
                </div>
                <div className="text-[8px] text-slate-600 font-mono mt-4 truncate">
                  ID: {cert.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-navy-light/35 bg-cyber-navy-dark py-10 text-center relative z-10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Registry Verifier</span>
          </div>
          <p className="text-[10px] text-slate-500">
            &copy; {new Date().getFullYear()} VeraForge Platform. SSL Secured cryptographic verifications.
          </p>
        </div>
      </footer>
    </div>
  );
}
