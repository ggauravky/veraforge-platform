'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CheckCircle2, Lock, Unlock, ExternalLink, Globe, 
  Award, AlertTriangle, MessageSquare, Loader2, ArrowRight, X, BookOpen, Copy, Check
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';
import { Github } from '@/components/icons';
import { submitTaskAction, submitQuizAction } from '@/lib/actions/student';
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

  // Quiz States
  const [activeQuizTask, setActiveQuizTask] = useState<any | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([-1, -1, -1]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(5);

  // Resume Booster States
  const [copiedBullets, setCopiedBullets] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  const [resumeTab, setResumeTab] = useState<'bullets' | 'linkedin'>('bullets');

  // Scanner States
  const [isScanning, setIsScanning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

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

  const handleOpenQuiz = (userTask: any) => {
    setActiveQuizTask(userTask);
    setQuizAnswers([-1, -1, -1]);
    setQuizError('');
    setCooldownActive(false);
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuizTask) return;

    if (quizAnswers.some(ans => ans === -1)) {
      setQuizError('Please answer all 3 prerequisite questions.');
      return;
    }

    setQuizLoading(true);
    setQuizError('');

    try {
      const result = await submitQuizAction(activeQuizTask._id, quizAnswers);
      if (result.success) {
        setSuccessMsg('Verification passed! Task unlocked.');
        setTimeout(() => {
          setActiveQuizTask(null);
          setSuccessMsg('');
          router.refresh();
        }, 1200);
      } else {
        setCooldownActive(true);
        setCooldownTime(5);
        
        const interval = setInterval(() => {
          setCooldownTime((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setCooldownActive(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err: any) {
      setQuizError(err.message || 'An error occurred during quiz verification.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleCopyBullets = () => {
    const bullets = getResumeBullets(user.enrolledTrack).join('\n');
    navigator.clipboard.writeText(bullets);
    setCopiedBullets(true);
    setTimeout(() => setCopiedBullets(false), 2000);
  };

  const handleCopyLinkedIn = () => {
    const template = getLinkedInTemplate(user.enrolledTrack);
    navigator.clipboard.writeText(template);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2000);
  };

  const onSubmit = async (data: SubmissionValues) => {
    if (!selectedTask) return;
    setLoading(true);
    setIsScanning(true);
    setError('');
    setSuccessMsg('');
    setTerminalLogs([]);

    const repoLink = data.submissionRepoLink;
    const liveLink = data.submissionLiveLink;

    const logs = [
      `> Connecting to Remote repository: ${repoLink}... SUCCESS`,
      `> Querying static dependency vulnerabilities... 0 critical bugs found`,
      `> Performing DOM accessibility and responsive paint analysis... OK`,
      `> Package compiled successfully. Submitting architecture artifacts to review queue.`
    ];

    try {
      for (let i = 0; i < logs.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, i === 0 ? 0 : 1200));
        setTerminalLogs((prev) => [...prev, logs[i]]);
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      const result = await submitTaskAction({
        userTaskId: selectedTask._id,
        submissionRepoLink: repoLink,
        submissionLiveLink: liveLink,
      });

      if (result.success) {
        setSuccessMsg('Work submitted successfully! Refreshing dashboard...');
        setTimeout(() => {
          setSelectedTask(null);
          reset();
          setIsScanning(false);
          setTerminalLogs([]);
          router.refresh();
        }, 1200);
      } else {
        setError(result.error || 'Failed to submit task.');
        setIsScanning(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setIsScanning(false);
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
              
              <div className="max-w-md mx-auto space-y-3 font-sans">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Security Audit Notice</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Your credentials are undergoing administrative verification. The audit engine will release your dashboard upon confirmation.
                </p>
              </div>
            </div>
          </div>
        )
 : (
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-cyber-navy-light/35">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-electric-cyan text-cyan-glow" />
                Internship Course Assignments
              </h3>
              <span className="text-xs text-slate-400">{totalTasks} Sequential Steps</span>
            </div>

            <div className="space-y-4 font-sans">
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
                          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-cyber-navy-dark border border-cyber-navy-light/50 rounded-full text-slate-300 font-sans">
                            Step {task.sequenceOrder}
                          </span>
 
                          {isLocked && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-cyber-navy-dark border border-cyber-navy-light/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_8px_rgba(0,255,255,0.1)] font-sans">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          )}
                          {isPending && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-blue/90 bg-electric-blue/10 border border-electric-blue/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                              <Loader2 className="w-3 h-3 animate-spin" /> Pending Review
                            </span>
                          )}
                          {isRejected && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                              <AlertTriangle className="w-3 h-3" /> Revision Required
                            </span>
                          )}
                          {userTask.status === 'unlocked' && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-cyan bg-electric-cyan/5 border border-electric-cyan/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                              <Unlock className="w-3 h-3 animate-pulse" /> Active Task
                            </span>
                          )}
                          {userTask.status === 'quiz_pending' && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_8px_rgba(245,158,11,0.1)] font-sans">
                              <BookOpen className="w-3 h-3 animate-pulse" /> Quiz Pending
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2 font-sans">{task.title}</h4>
                        <p className="text-slate-400 text-sm font-light leading-relaxed mb-4 max-w-xl font-sans">
                          {task.description}
                        </p>

                        {/* Display Submitted Links if any */}
                        {(isApproved || isPending || isRejected) && (
                          <div className="flex flex-wrap gap-4 text-xs mt-3 pt-3 border-t border-cyber-navy-light/30 text-slate-400 font-sans">
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
                          <div className="mt-4 p-3.5 bg-cyber-navy-dark/60 border border-cyber-navy-light/40 rounded-xl flex gap-2.5 items-start text-xs max-w-xl font-sans">
                            <MessageSquare className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-300">Administrator Feedback:</div>
                              <p className="text-slate-400 font-light mt-0.5 leading-relaxed">{userTask.adminFeedback}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 font-sans">
                        {isLocked && (
                          <button 
                            disabled 
                            className="px-4 py-2 bg-cyber-navy-dark/40 border border-cyber-navy-light/20 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-not-allowed"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            Task Locked
                          </button>
                        )}

                        {userTask.status === 'quiz_pending' && (
                          <button
                            onClick={() => handleOpenQuiz(userTask)}
                            className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 text-cyber-navy-dark text-xs font-bold rounded-lg transition-all shadow-md shadow-electric-cyan/15 hover:scale-[1.02] cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.05)] flex items-center gap-1"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Take Quiz
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
          <div 
            className="absolute inset-0 bg-cyber-navy-dark/80 backdrop-blur-md"
            onClick={() => { if (!loading) setSelectedTask(null); }}
          />
 
          <div className="relative glass-panel rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-cyber-navy-light/65 z-55 font-sans">
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
              <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-red-300 text-xs font-semibold font-sans">
                {error}
              </div>
            )}
 
            {successMsg && (
              <div className="mb-4 p-3 bg-electric-cyan/10 border border-electric-cyan/20 rounded-xl text-electric-cyan text-xs font-semibold shadow-[0_0_10px_rgba(0,255,255,0.05)] font-sans">
                {successMsg}
              </div>
            )}

            {isScanning ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-cyber-navy-light font-mono text-[11px] leading-relaxed text-slate-300 min-h-[180px] shadow-[0_0_20px_rgba(0,255,255,0.02)] relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 border-b border-cyber-navy-light pb-2 mb-2 text-xs text-electric-cyan">
                      <div className="w-2.5 h-2.5 rounded-full bg-electric-cyan animate-pulse" />
                      <span>VERAFORGE CI/CD SECURITY ANALYZER v2.5</span>
                    </div>
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
                        {log}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 animate-pulse mt-4">
                    <span>STATUS: SECURITY INTRUSION CHECK IN PROGRESS...</span>
                  </div>
                </div>
              </div>
            ) : (
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
                  className="w-full py-3.5 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6 shadow-[0_0_15px_rgba(0,255,255,0.15)] font-sans"
                >
                  Submit Work for Review
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuizTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-cyber-navy-dark/80 backdrop-blur-md"
            onClick={() => { if (!quizLoading && !cooldownActive) setActiveQuizTask(null); }}
          />

          <div className="relative glass-panel rounded-3xl p-6 md:p-8 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-cyber-navy-light/65 z-55 overflow-hidden font-sans">
            
            {cooldownActive ? (
              /* Cooldown Screen Overlay */
              <div className="absolute inset-0 bg-red-950/95 z-60 flex flex-col items-center justify-center p-6 text-center border-4 border-red-500/50 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.25)] animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-500/35 flex items-center justify-center mb-4 animate-bounce">
                  <AlertTriangle className="w-8 h-8 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <h3 className="text-xl font-extrabold text-red-400 tracking-wider uppercase mb-2">SECURITY VERIFICATION FAILURE</h3>
                <p className="text-xs text-red-300 max-w-md font-mono leading-relaxed mb-6">
                  Intrusive access prevention protocol activated. Locking validation interface for {cooldownTime} seconds.
                </p>
                <div className="w-20 h-20 rounded-full border-4 border-red-500/20 border-t-red-500 flex items-center justify-center animate-spin-slow">
                  <span className="text-2xl font-black text-red-400 font-mono">{cooldownTime}</span>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => setActiveQuizTask(null)}
              disabled={quizLoading}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 disabled:opacity-50 transition-colors animate-in fade-in"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/50 text-slate-350 rounded-full font-sans">
                Prerequisite Verification Quiz
              </span>
              <h3 className="text-xl font-bold text-white mt-2.5 font-sans">
                Verify Track Knowledge
              </h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-1 font-sans">
                Answer all 3 technical questions correctly to unlock the submission terminal for **{activeQuizTask.taskId.title}**.
              </p>
            </div>

            {quizError && (
              <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-red-350 text-xs font-semibold font-sans">
                {quizError}
              </div>
            )}

            <form onSubmit={handleQuizSubmit} className="space-y-6">
              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1">
                {activeQuizTask.taskId.quizQuestions.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="space-y-2 border-b border-cyber-navy-light/30 pb-4 last:border-0 last:pb-0">
                    <div className="text-xs font-bold text-slate-200 flex gap-2">
                      <span className="text-electric-cyan font-sans">Q{qIdx + 1}.</span>
                      <p className="font-sans">{q.question}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => {
                              setQuizAnswers((prev) => {
                                const next = [...prev];
                                next[qIdx] = optIdx;
                                return next;
                              });
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs rounded-xl border transition-all cursor-pointer font-sans ${
                              isSelected
                                ? 'bg-electric-cyan/15 border-electric-cyan text-white shadow-[0_0_10px_rgba(0,255,255,0.08)]'
                                : 'bg-cyber-navy-dark/60 border-cyber-navy-light/40 text-slate-400 hover:border-cyber-navy-light/80 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-electric-cyan' : 'border-slate-600'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full" />}
                              </div>
                              <span>{opt}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={quizLoading || quizAnswers.some(a => a === -1)}
                className="w-full py-3.5 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-cyber-navy-light disabled:border-cyber-navy-light/45 disabled:text-slate-500 border border-transparent disabled:cursor-not-allowed text-cyber-navy-dark font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.1)] font-sans"
              >
                {quizLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin font-sans" />
                    Validating Credentials...
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

function getResumeBullets(track: string): string[] {
  if (track === 'Data Science') {
    return [
      "Processed and analyzed high-dimensional CSV datasets using Python, Pandas, and NumPy, optimizing data cleaning pipelines and normalization schemas.",
      "Architected and trained predictive regression models using Scikit-Learn, executing feature engineering and hyperparameter tuning to achieve high accuracy.",
      "Evaluated analytical models with Mean Squared Error (MSE) and constructed validation scripts to guarantee data integrity."
    ];
  } else if (track === 'Artificial Intelligence') {
    return [
      "Integrated large language models using Gemini API, implementing robust rate-limit management and exponential backoff error recovery.",
      "Architected custom Retrieval-Augmented Generation (RAG) pipelines to parse structured documents and query vector storage databases.",
      "Designed deterministic context-aware prompt templates to minimize hallucination rates and standardize AI-generated outputs."
    ];
  } else if (track === 'Backend Engineering') {
    return [
      "Designed and secured RESTful API architectures using Node.js, Express, and JSON Web Token (JWT) credentials verification.",
      "Implemented real-time MongoDB database event streams, optimizing query indices and compound data aggregation pipelines.",
      "Enforced security isolation protocols and rate limits on production-grade microservices to protect sensitive platform resources."
    ];
  } else { // Web Development
    return [
      "Engineered and deployed a production-ready Web App using Next.js, implementing custom state machines and serverless middleware.",
      "Developed responsive, accessible interface schemas with Tailwind CSS and semantic HTML5, ensuring high-fidelity cross-device performance.",
      "Integrated MongoDB schemas and serverless backend API endpoints to synchronize user progress data with real-time UI state."
    ];
  }
}

function getLinkedInTemplate(track: string): string {
  if (track === 'Data Science') {
    return `I am excited to share that I have graduated from the Data Science Virtual Internship track at VeraForge! I built and deployed explanatory predictive regression models using Pandas, NumPy, and Scikit-Learn. Ready to turn raw data into high-value business intelligence! #DataScience #MachineLearning #Pandas #VeraForge`;
  } else if (track === 'Artificial Intelligence') {
    return `Proud to have completed the Artificial Intelligence Virtual Internship at VeraForge! I designed custom Retrieval-Augmented Generation (RAG) architectures and integrated Gemini LLM endpoints with robust rate-limit protocols. Excited for the future of AI engineering! #AI #GenerativeAI #RAG #VeraForge`;
  } else if (track === 'Backend Engineering') {
    return `I have successfully completed the Backend Engineering Virtual Internship at VeraForge! I built secure REST APIs with Node.js/Express, implemented JWT token authentication, and optimized MongoDB aggregation pipelines. Ready for enterprise-grade backend challenges! #Backend #API #NodeJS #VeraForge`;
  } else { // Web Development
    return `I am thrilled to announce that I have successfully completed the Web Development Virtual Internship at VeraForge! I engineered a full-stack serverless task workspace using Next.js, Tailwind CSS, and MongoDB, and passed the rigorous code reviews. Ready to apply these skills to production-grade applications! #WebDev #NextJS #FullStack #VeraForge`;
  }
}
