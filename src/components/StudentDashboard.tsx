'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CheckCircle2, Lock, Unlock, ExternalLink, Globe, 
  Award, AlertTriangle, MessageSquare, Loader2, ArrowRight, X, BookOpen 
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';
import { Github } from '@/components/icons';
import { submitTaskAction } from '@/lib/actions/student';
import { UserButton } from '@clerk/nextjs';

const submissionSchema = z.object({
  submissionRepoLink: z.string().url('Invalid URL').regex(/github\.com/, 'Must be a GitHub repository URL'),
  submissionLiveLink: z.string().url('Invalid URL'),
});

type SubmissionValues = z.infer<typeof submissionSchema>;

interface StudentDashboardProps {
  user: any;
  userTasks: any[];
  certificate: any;
}

export default function StudentDashboard({ user, userTasks, certificate }: StudentDashboardProps) {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate Progress
  const totalTasks = userTasks.length;
  const approvedTasksCount = userTasks.filter((t) => t.status === 'approved').length;
  const progressPercent = totalTasks > 0 ? Math.round((approvedTasksCount / totalTasks) * 100) : 0;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      submissionRepoLink: '',
      submissionLiveLink: '',
    }
  });

  const handleOpenSubmission = (userTask: any) => {
    setSelectedTask(userTask);
    setError('');
    setSuccessMsg('');
    setValue('submissionRepoLink', userTask.submissionRepoLink || '');
    setValue('submissionLiveLink', userTask.submissionLiveLink || '');
  };

  const onSubmit = async (data: SubmissionValues) => {
    if (!selectedTask) return;
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const result = await submitTaskAction({
        userTaskId: selectedTask._id,
        submissionRepoLink: data.submissionRepoLink,
        submissionLiveLink: data.submissionLiveLink,
      });

      if (result.success) {
        setSuccessMsg('Work submitted successfully! Refreshing dashboard...');
        setTimeout(() => {
          setSelectedTask(null);
          reset();
          router.refresh();
        }, 1200);
      } else {
        setError(result.error || 'Failed to submit task.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative min-h-screen text-slate-100">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-cyber-navy-light/35 bg-cyber-navy-dark/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyber-navy-dark/80 border border-cyber-navy-light/40 rounded-xl shadow-lg">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[8px] text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-electric-cyan font-semibold bg-cyber-navy-dark border border-electric-cyan/20 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.05)] hidden sm:inline">
              Student Workspace
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Overview, Profile, Progress & Certifications */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* Welcome Card */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric-cyan/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs text-electric-cyan font-bold uppercase tracking-wider block mb-1 text-cyan-glow">Welcome back</span>
            <h2 className="text-2xl font-bold text-white mb-2">{user.fullName}</h2>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Virtual {user.enrolledTrack || 'Web Development'} Internship Track at VeraForge.
            </p>
            
            <div className="mt-6 pt-4 border-t border-cyber-navy-light/30 text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="text-slate-200 font-medium truncate max-w-[150px]">{user.universityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Graduation Year:</span>
                <span className="text-slate-200 font-medium">{user.graduationYear}</span>
              </div>
            </div>
          </div>
 
          {/* Progress Tracker Card */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-350">Track Progress</h3>
              <span className="text-2xl font-extrabold text-electric-cyan text-cyan-glow">{progressPercent}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-cyber-navy-dark h-3 rounded-full overflow-hidden border border-cyber-navy-light/40 p-[2px]">
              <div 
                className="bg-gradient-to-r from-electric-blue to-electric-cyan h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,255,255,0.35)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
 
            <div className="flex justify-between items-center mt-4 text-xs text-slate-450">
              <span>{approvedTasksCount} of {totalTasks} Tasks Approved</span>
              <span className="text-electric-cyan font-bold text-cyan-glow">{approvedTasksCount === totalTasks ? 'Ready' : 'In Progress'}</span>
            </div>
          </div>

          {/* Graduation & Certificate Card */}
          {progressPercent === 100 && (
            <div className="glass-panel border-electric-cyan/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-electric-cyan/25 rounded-xl border border-electric-cyan/20">
                  <Award className="w-6 h-6 text-electric-cyan text-cyan-glow animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Graduation Reached</h4>
                  <p className="text-[10px] text-electric-cyan font-bold tracking-wider uppercase text-cyan-glow">{user.enrolledTrack || 'Web Development'} Track</p>
                </div>
              </div>
              <p className="text-slate-450 text-xs font-light leading-relaxed mb-6">
                Congratulations! You have successfully completed all internship tasks. 
              </p>
 
              {certificate ? (
                <a
                  href={`/verify/${certificate.certificateId}`}
                  className="w-full py-3 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-lg shadow-electric-cyan/20 hover:scale-[1.01] transition-all shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                >
                  View Verified Certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="p-3.5 bg-cyber-navy-dark border border-cyber-navy-light/45 rounded-xl text-center text-xs text-electric-cyan font-semibold flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,255,255,0.05)]">
                  <Loader2 className="w-4 h-4 animate-spin text-electric-cyan" />
                  Awaiting Admin Issuance...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column: Sequential Tasks */}
        {user.accountStatus === 'pending_approval' ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />
              <div className="mx-auto w-16 h-16 bg-cyber-navy-dark border border-electric-cyan/20 rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(0,255,255,0.08)]">
                <AlertTriangle className="w-8 h-8 text-electric-cyan text-cyan-glow" />
              </div>
              
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="text-xl font-bold text-white">Application Under Review</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Your application is currently under review by an administrator.
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Once approved, your internship track tasks will automatically unlock here. Please check back later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-cyber-navy-light/35">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-electric-cyan text-cyan-glow" />
                Internship Course Assignments
              </h3>
              <span className="text-xs text-slate-400">{totalTasks} Sequential Steps</span>
            </div>

            <div className="space-y-4">
              {userTasks.map((userTask) => {
                const task = userTask.taskId;
                const isLocked = userTask.status === 'locked';
                const isApproved = userTask.status === 'approved';
                const isPending = userTask.status === 'submitted_pending_review';
                const isRejected = userTask.status === 'rejected';

                return (
                  <div 
                    key={userTask._id}
                    className={`bg-cyber-navy-light/10 border rounded-2xl p-6 transition-all duration-300 ${
                      isLocked ? 'border-cyber-navy-light/20 opacity-40' :
                      isApproved ? 'border-electric-cyan/25 bg-electric-cyan/5 shadow-[0_0_15px_rgba(0,255,255,0.02)]' :
                      isRejected ? 'border-red-950/30 bg-red-950/5' :
                      isPending ? 'border-electric-blue/25 bg-electric-blue/5' :
                      'border-cyber-navy-light/40 hover:border-electric-cyan/35 hover:bg-cyber-navy-light/15 hover:shadow-[0_0_15px_rgba(0,255,255,0.04)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        {/* Step Indicator & Status Badge */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-cyber-navy-dark border border-cyber-navy-light/50 rounded-full text-slate-300">
                            Step {task.sequenceOrder}
                          </span>
 
                          {isLocked && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-cyber-navy-dark border border-cyber-navy-light/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_8px_rgba(0,255,255,0.1)]">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          )}
                          {isPending && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-blue/90 bg-electric-blue/10 border border-electric-blue/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> Pending Review
                            </span>
                          )}
                          {isRejected && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Revision Required
                            </span>
                          )}
                          {userTask.status === 'unlocked' && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-cyan bg-electric-cyan/5 border border-electric-cyan/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Unlock className="w-3 h-3 animate-pulse" /> Active Task
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2">{task.title}</h4>
                        <p className="text-slate-400 text-sm font-light leading-relaxed mb-4 max-w-xl">
                          {task.description}
                        </p>

                        {/* Display Submitted Links if any */}
                        {(isApproved || isPending || isRejected) && (
                          <div className="flex flex-wrap gap-4 text-xs mt-3 pt-3 border-t border-cyber-navy-light/30 text-slate-400">
                            <a 
                              href={userTask.submissionRepoLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 hover:text-electric-cyan transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              GitHub Repository
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a 
                              href={userTask.submissionLiveLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 hover:text-electric-cyan transition-colors"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              Live Web Application
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
 
                        {/* Feedback Panel */}
                        {userTask.adminFeedback && (
                          <div className="mt-4 p-3.5 bg-cyber-navy-dark/60 border border-cyber-navy-light/40 rounded-xl flex gap-2.5 items-start text-xs max-w-xl">
                            <MessageSquare className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-300">Administrator Feedback:</div>
                              <p className="text-slate-400 font-light mt-0.5 leading-relaxed">{userTask.adminFeedback}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {isLocked && (
                          <button 
                            disabled 
                            className="px-4 py-2 bg-cyber-navy-dark/40 border border-cyber-navy-light/20 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-not-allowed"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            Task Locked
                          </button>
                        )}
 
                        {userTask.status === 'unlocked' && (
                          <button
                            onClick={() => handleOpenSubmission(userTask)}
                            className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 text-cyber-navy-dark text-xs font-bold rounded-lg transition-all shadow-md shadow-electric-cyan/15 hover:scale-[1.02] cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.05)]"
                          >
                            Submit Assignment
                          </button>
                        )}
 
                        {isPending && (
                          <button
                            disabled
                            className="px-4 py-2 bg-cyber-navy-dark border border-cyber-navy-light/40 text-slate-400 text-xs font-semibold rounded-lg"
                          >
                            Under Evaluation
                          </button>
                        )}
 
                        {isRejected && (
                          <button
                            onClick={() => handleOpenSubmission(userTask)}
                            className="px-4 py-2 bg-red-950/30 hover:bg-red-950/50 border border-red-900/40 text-red-300 hover:text-red-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Revise & Re-submit
                          </button>
                        )}
 
                        {isApproved && (
                          <button
                            disabled
                            className="px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-semibold rounded-lg flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-cyber-navy-dark/80 backdrop-blur-md"
            onClick={() => { if (!loading) setSelectedTask(null); }}
          />
 
          {/* Dialog Container */}
          <div className="relative glass-panel rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-cyber-navy-light/65 z-55">
            <button
              onClick={() => setSelectedTask(null)}
              disabled={loading}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 disabled:opacity-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
 
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/50 text-slate-350 rounded-full">
                Step {selectedTask.taskId.sequenceOrder} Submission
              </span>
              <h3 className="text-xl font-bold text-white mt-2.5">
                Submit {selectedTask.taskId.title}
              </h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-1">
                Provide the active Github codebase and the public live deployment URL.
              </p>
            </div>
 
            {error && (
              <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-red-300 text-xs font-semibold">
                {error}
              </div>
            )}
 
            {successMsg && (
              <div className="mb-4 p-3 bg-electric-cyan/10 border border-electric-cyan/20 rounded-xl text-electric-cyan text-xs font-semibold shadow-[0_0_10px_rgba(0,255,255,0.05)]">
                {successMsg}
              </div>
            )}
 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-500" />
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://github.com/username/calculator"
                  {...register('submissionRepoLink')}
                  className="w-full bg-cyber-navy-dark border border-cyber-navy-light/40 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 transition-all text-xs outline-none"
                />
                {errors.submissionRepoLink && (
                  <p className="text-[10px] text-red-400 font-semibold">{errors.submissionRepoLink.message}</p>
                )}
              </div>
 
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  Live Hosted URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://calculator-demo.vercel.app"
                  {...register('submissionLiveLink')}
                  className="w-full bg-cyber-navy-dark border border-cyber-navy-light/40 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 transition-all text-xs outline-none"
                />
                {errors.submissionLiveLink && (
                  <p className="text-[10px] text-red-400 font-semibold">{errors.submissionLiveLink.message}</p>
                )}
              </div>
 
              {selectedTask.adminFeedback && (
                <div className="p-3 bg-cyber-navy-dark border border-cyber-navy-light/40 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-electric-cyan text-cyan-glow" />
                    Previous Revision Request:
                  </div>
                  <p className="text-slate-450 leading-relaxed font-light">{selectedTask.adminFeedback}</p>
                </div>
              )}
 
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Codebase...
                  </>
                ) : (
                  <>
                    Submit Work for Review
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
