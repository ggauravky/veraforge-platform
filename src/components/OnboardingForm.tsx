'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Globe, User, BookOpen, Calendar, ArrowRight, Loader2, Building } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { submitOnboarding } from '@/lib/actions/onboarding';

interface OnboardingFormProps {
  initialName: string;
  initialEmail: string;
}

export default function OnboardingForm({ initialName, initialEmail }: OnboardingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState<'student' | 'recruiter'>('student');

  // Input states
  const [fullName, setFullName] = useState(initialName);
  const [universityName, setUniversityName] = useState('');
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear().toString());
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field Validations
    if (!fullName || fullName.length < 2) {
      setError('Full Name must be at least 2 characters.');
      return;
    }

    if (!linkedinUrl || !/linkedin\.com/.test(linkedinUrl)) {
      setError('Must be a valid LinkedIn profile URL (e.g. linkedin.com/in/username).');
      return;
    }

    if (activeRole === 'student') {
      if (!universityName || universityName.length < 2) {
        setError('University Name must be at least 2 characters.');
        return;
      }
      if (!graduationYear || !/^\d{4}$/.test(graduationYear)) {
        setError('Graduation Year must be a 4-digit number.');
        return;
      }
      if (!githubUrl || !/github\.com/.test(githubUrl)) {
        setError('Must be a valid GitHub profile URL (e.g. github.com/username).');
        return;
      }
    } else {
      if (!companyName || companyName.length < 2) {
        setError('Company Name must be at least 2 characters.');
        return;
      }
    }

    setLoading(true);
    try {
      const result = await submitOnboarding({
        role: activeRole,
        fullName,
        universityName: activeRole === 'student' ? universityName : undefined,
        graduationYear: activeRole === 'student' ? graduationYear : undefined,
        githubUrl: activeRole === 'student' ? githubUrl : undefined,
        linkedinUrl,
        portfolioUrl: activeRole === 'student' ? portfolioUrl : undefined,
        companyName: activeRole === 'recruiter' ? companyName : undefined,
      });

      if (result.success) {
        router.push(activeRole === 'recruiter' ? '/recruiter' : '/pending-review');
        router.refresh();
      } else {
        setError(result.error || 'Failed to submit onboarding form. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl glass-panel rounded-2xl p-8 md:p-10 relative z-10 bg-zinc-900/50">
      
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-sans">
          <BookOpen className="text-blue-500 w-5 h-5" />
          Virtual Internship Onboarding
        </h2>
        <p className="text-slate-400 text-xs font-light leading-relaxed">
          Select your registration profile pathway to begin. Students unlock internship sandboxes, while recruiters gain candidate verification directories.
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-3 mb-6 p-1 bg-zinc-950 rounded-xl border border-zinc-850">
        <button
          type="button"
          onClick={() => { setActiveRole('student'); setError(''); }}
          className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeRole === 'student' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Register as Student
        </button>
        <button
          type="button"
          onClick={() => { setActiveRole('recruiter'); setError(''); }}
          className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeRole === 'recruiter' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          Register as Recruiter / Employer
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-955/30 border border-red-900/40 rounded-xl text-red-300 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Field: Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-slate-355 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={initialEmail}
              disabled
              className="w-full bg-zinc-900/40 border border-zinc-850 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed text-xs outline-none"
            />
          </div>
        </div>

        {/* STUDENT PATHWAY FIELDS */}
        {activeRole === 'student' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Education Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="universityName" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  University / Institution
                </label>
                <input
                  id="universityName"
                  type="text"
                  placeholder="e.g. Stanford University"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="graduationYear" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Graduation Year
                </label>
                <input
                  id="graduationYear"
                  type="text"
                  placeholder="e.g. 2026"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                />
              </div>
            </div>

            {/* Social / Portfolio */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="githubUrl" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Github className="w-3.5 h-3.5 text-slate-500" />
                  GitHub Profile Link
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  placeholder="e.g. https://github.com/yourusername"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="studentLinkedin" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Linkedin className="w-3.5 h-3.5 text-slate-500" />
                  LinkedIn Profile Link
                </label>
                <input
                  id="studentLinkedin"
                  type="url"
                  placeholder="e.g. https://linkedin.com/in/yourprofile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="portfolioUrl" className="text-xs font-bold text-slate-355 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  Personal Portfolio / Website (Optional)
                </label>
                <input
                  id="portfolioUrl"
                  type="url"
                  placeholder="e.g. https://myportfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                />
              </div>
            </div>
          </div>
        )}

        {/* RECRUITER PATHWAY FIELDS */}
        {activeRole === 'recruiter' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                Company / Organization Name
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="e.g. Acme Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="recruiterLinkedin" className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Linkedin className="w-3.5 h-3.5 text-slate-500" />
                LinkedIn Profile Link
              </label>
              <input
                id="recruiterLinkedin"
                type="url"
                placeholder="e.g. https://linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-105 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-extrabold text-xs rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Registration...
            </>
          ) : (
            <>
              Submit Onboarding Application
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
