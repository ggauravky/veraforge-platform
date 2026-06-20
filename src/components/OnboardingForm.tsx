'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { GraduationCap, Globe, User, BookOpen, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { submitOnboarding } from '@/lib/actions/onboarding';

const onboardingSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  universityName: z.string().min(2, 'University Name must be at least 2 characters'),
  graduationYear: z.string().regex(/^\d{4}$/, 'Must be a 4-digit year'),
  githubUrl: z.string().url('Invalid URL').regex(/github\.com/, 'Must be a GitHub profile URL (e.g. github.com/username)'),
  linkedinUrl: z.string().url('Invalid URL').regex(/linkedin\.com/, 'Must be a LinkedIn profile URL'),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

interface OnboardingFormProps {
  initialName: string;
  initialEmail: string;
}

export default function OnboardingForm({ initialName, initialEmail }: OnboardingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: initialName,
      universityName: '',
      graduationYear: new Date().getFullYear().toString(),
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
    },
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    setLoading(true);
    setError('');
    try {
      const result = await submitOnboarding(data);
      if (result.success) {
        router.push('/pending-review');
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
    <div className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
      <div className="mb-8 border-b border-slate-900 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <BookOpen className="text-emerald-400 w-6 h-6" />
          Professional Profile Onboarding
        </h2>
        <p className="text-slate-400 text-sm font-light leading-relaxed">
          Please complete your professional background profile. Once submitted, our team will review your credentials to activate your virtual internship workspace.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-red-300 text-sm font-semibold animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. John Doe"
              {...register('fullName')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.fullName && (
              <p className="text-xs text-red-400 font-semibold">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={initialEmail}
              disabled
              className="w-full bg-slate-950/60 border border-slate-900/80 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed text-sm outline-none"
            />
          </div>
        </div>

        {/* Education Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="universityName" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              University / Institution
            </label>
            <input
              id="universityName"
              type="text"
              placeholder="e.g. Stanford University"
              {...register('universityName')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.universityName && (
              <p className="text-xs text-red-400 font-semibold">{errors.universityName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="graduationYear" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Graduation Year
            </label>
            <input
              id="graduationYear"
              type="text"
              placeholder="e.g. 2026"
              {...register('graduationYear')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.graduationYear && (
              <p className="text-xs text-red-400 font-semibold">{errors.graduationYear.message}</p>
            )}
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              GitHub Profile Link
            </label>
            <input
              id="githubUrl"
              type="url"
              placeholder="e.g. https://github.com/yourusername"
              {...register('githubUrl')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.githubUrl && (
              <p className="text-xs text-red-400 font-semibold">{errors.githubUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="linkedinUrl" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              LinkedIn Profile Link
            </label>
            <input
              id="linkedinUrl"
              type="url"
              placeholder="e.g. https://linkedin.com/in/yourprofile"
              {...register('linkedinUrl')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.linkedinUrl && (
              <p className="text-xs text-red-400 font-semibold">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="portfolioUrl" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              Personal Portfolio / Website (Optional)
            </label>
            <input
              id="portfolioUrl"
              type="url"
              placeholder="e.g. https://myportfolio.com"
              {...register('portfolioUrl')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 transition-all text-sm outline-none"
            />
            {errors.portfolioUrl && (
              <p className="text-xs text-red-400 font-semibold">{errors.portfolioUrl.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/50 text-slate-950 font-extrabold text-sm rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              Submit Professional Application
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
