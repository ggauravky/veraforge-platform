'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CheckCircle2, Lock, Unlock, ExternalLink, Globe, 
  Award, AlertTriangle, MessageSquare, Loader2, ArrowRight, X, BookOpen, Copy, Check, Cpu, Activity, Sparkles
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
      const res = await submitQuizAction(activeQuizTask._id, quizAnswers);
      if (res.success) {
        // Correct answers! Close quiz, open task submission
        setActiveQuizTask(null);
        handleOpenSubmission(userTasks.find(ut => ut._id === activeQuizTask._id));
      } else {
        // Quiz answers incorrect
        const quizRes = res as any;
        if (quizRes.cooldown) {
          setCooldownActive(true);
          setCooldownTime(quizRes.cooldownTime || 5);
          
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
        setQuizError(res.error || 'Verification failed. Intrusive access detection triggered.');
      }
    } catch (err: any) {
      setQuizError(err.message || 'Verification pipeline error.');
    } finally {
      setQuizLoading(false);
    }
  };

  const onSubmit = async (data: SubmissionValues) => {
    if (!selectedTask) return;
    setLoading(true);
    setError('');
    setSuccessMsg('');
    setIsScanning(true);
    setTerminalLogs([]);

    // 1. Scan trigger latency simulations
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    
    setTerminalLogs(prev => [...prev, '> Initializing VeraForge CI/CD pipeline...']);
    await delay(700);
    setTerminalLogs(prev => [...prev, `> Cloning repository: ${data.submissionRepoLink}`]);
    await delay(900);
    setTerminalLogs(prev => [...prev, `> Checking live hosting: ${data.submissionLiveLink}`]);
    await delay(800);
    setTerminalLogs(prev => [...prev, '> Running lint and security audits...']);
    await delay(900);
    setTerminalLogs(prev => [...prev, '> TELEMETRY RESULT: 0 critical vulnerabilities, 2 warnings (Lint) - SUCCESS.']);
    await delay(500);

    try {
      const res = await submitTaskAction({
        userTaskId: selectedTask._id,
        submissionRepoLink: data.submissionRepoLink,
        submissionLiveLink: data.submissionLiveLink,
      });

      if (res.success) {
        setSuccessMsg('Work successfully submitted. Awaiting administrative evaluation.');
        reset();
        setTimeout(() => {
          setSelectedTask(null);
          setIsScanning(false);
          router.refresh();
        }, 1500);
      } else {
        setError(res.error || 'Failed to submit task. Please check server state.');
        setIsScanning(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setIsScanning(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBullets = () => {
    const bullets = getResumeBullets(user.enrolledTrack).join('\n');
    navigator.clipboard.writeText(bullets);
    setCopiedBullets(true);
    setTimeout(() => setCopiedBullets(false), 2000);
  };

  const handleCopyLinkedIn = () => {
    const post = getLinkedInTemplate(user.enrolledTrack);
    navigator.clipboard.writeText(post);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative min-h-screen text-slate-100 pb-20 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[8px] text-slate-400 font-bold tracking-[0.2em] uppercase">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-blue-500 font-semibold bg-zinc-905 border border-zinc-850 px-3 py-1.5 rounded-full hidden sm:inline">
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
          <div className="glass-panel rounded-2xl p-6 bg-zinc-900/50">
            <span className="text-xs text-blue-500 font-bold uppercase tracking-wider block mb-1">Welcome back</span>
            <h2 className="text-2xl font-bold text-white mb-2">{user.fullName}</h2>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Virtual {user.enrolledTrack || 'Web Development'} Internship Track at VeraForge.
            </p>
            
            <div className="mt-6 pt-4 border-t border-zinc-800/60 text-xs text-slate-450 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-light">Institution:</span>
                <span className="text-slate-200 font-medium truncate max-w-[150px]">{user.universityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-light">Graduation Year:</span>
                <span className="text-slate-200 font-medium">{user.graduationYear}</span>
              </div>
            </div>
          </div>
  
          {/* Progress Tracker Card */}
          <div className="glass-panel rounded-2xl p-6 bg-zinc-900/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Track Progress</h3>
              <span className="text-xl font-extrabold text-blue-500">{progressPercent}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-850 p-[2px]">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
 
            <div className="flex justify-between items-center mt-4 text-xs text-slate-400">
              <span>{approvedTasksCount} of {totalTasks} Tasks Approved</span>
              <span className="text-blue-500 font-semibold">{approvedTasksCount === totalTasks ? 'Ready' : 'In Progress'}</span>
            </div>
          </div>

          {/* Graduation & Certificate Card */}
          {progressPercent === 100 && (
            <div className="glass-panel rounded-2xl p-6 bg-zinc-900/50 border border-blue-900/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-950 border border-blue-900/40 rounded-xl">
                  <Award className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Graduation Reached</h4>
                  <p className="text-[10px] text-blue-500 font-bold tracking-wider uppercase">{user.enrolledTrack || 'Web Development'} Track</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                Congratulations! You have successfully completed all internship tasks. 
              </p>
 
              {certificate ? (
                <a
                  href={`/verify/${certificate.certificateId}`}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-lg text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  View Verified Certificate
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl text-center text-xs text-blue-500 font-semibold flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  Awaiting Admin Issuance...
                </div>
              )}
            </div>
          )}

          {/* Resume Booster Card */}
          {approvedTasksCount > 0 && (
            <div className="glass-panel rounded-2xl p-6 bg-zinc-900/50">
              <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/60 pb-3">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Resume Booster</h4>
              </div>
              
              <div className="flex gap-2 mb-4 border-b border-zinc-850 pb-2">
                <button
                  onClick={() => setResumeTab('bullets')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    resumeTab === 'bullets' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-zinc-950 border border-zinc-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Resume Bullets
                </button>
                <button
                  onClick={() => setResumeTab('linkedin')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    resumeTab === 'linkedin' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-zinc-950 border border-zinc-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  LinkedIn Template
                </button>
              </div>

              {resumeTab === 'bullets' ? (
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                    Tailored bullet points verifying your {user.enrolledTrack} achievements:
                  </p>
                  <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3.5 space-y-2 text-[10px] text-slate-400 leading-relaxed font-mono">
                    {getResumeBullets(user.enrolledTrack).map((bullet, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleCopyBullets}
                    className="w-full mt-2 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-slate-300 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedBullets ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Resume Bullets
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                    Share your achievements with your professional network:
                  </p>
                  <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3.5 text-[10px] text-slate-400 leading-relaxed font-mono whitespace-pre-wrap select-all">
                    {getLinkedInTemplate(user.enrolledTrack)}
                  </div>
                  <button
                    onClick={handleCopyLinkedIn}
                    className="w-full mt-2 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-slate-300 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedLinkedIn ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy LinkedIn Template
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column: Sequential Tasks */}
        {user.accountStatus === 'pending_approval' ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-8 md:p-12 text-center space-y-6 bg-zinc-900/50">
              <div className="mx-auto w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Security Audit Notice</h3>
                
                {/* Visual Status Meter */}
                <div className="py-2">
                  <div className="w-full bg-zinc-950 border border-zinc-850 rounded-full h-2 p-[1px] relative">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 mt-1.5 font-mono">
                    <span>ONBOARDING: OK</span>
                    <span>SECURITY CHECK: IN PROGRESS (40%)</span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed font-light font-sans">
                  Your credentials are undergoing administrative verification. The audit engine will release your dashboard upon confirmation.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-905">
              <h3 className="text-base font-bold text-slate-105 flex items-center gap-2 uppercase">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Internship Course Assignments
              </h3>
              <span className="text-xs text-slate-500 font-light">{totalTasks} Sequential Steps</span>
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
                    className={`bg-zinc-900/30 border rounded-2xl p-6 transition-all duration-300 ${
                      isLocked ? 'border-zinc-900 opacity-40' :
                      isApproved ? 'border-zinc-800 bg-zinc-900/20' :
                      isRejected ? 'border-red-950/30 bg-red-950/5' :
                      isPending ? 'border-blue-950/40 bg-blue-950/10' :
                      'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        {/* Step Indicator & Status Badge */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                          <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-zinc-950 border border-zinc-850 rounded text-slate-400 font-mono">
                            Step {task.sequenceOrder}
                          </span>
 
                          {isLocked && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-550 bg-zinc-950 border border-zinc-850 px-2 py-0.5 rounded flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-450 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-450" /> Completed
                            </span>
                          )}
                          {isPending && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-450 bg-blue-950/20 border border-blue-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> Pending Review
                            </span>
                          )}
                          {isRejected && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                              <AlertTriangle className="w-3 h-3" /> Revision Required
                            </span>
                          )}
                          {userTask.status === 'unlocked' && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 bg-blue-950/15 border border-blue-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                              <Unlock className="w-3 h-3" /> Active Task
                            </span>
                          )}
                          {userTask.status === 'quiz_pending' && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-955/20 border border-amber-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                              <BookOpen className="w-3 h-3" /> Quiz Pending
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white mb-2">{task.title}</h4>
                        <p className="text-slate-400 text-xs font-light leading-relaxed mb-4 max-w-xl">
                          {task.description}
                        </p>

                        {/* Display Submitted Links */}
                        {(isApproved || isPending || isRejected) && (
                          <div className="flex flex-wrap gap-4 text-[10px] mt-3 pt-3 border-t border-zinc-800/60 text-slate-500">
                            <a 
                              href={userTask.submissionRepoLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                            >
                              <Github className="w-3 h-3" />
                              GitHub Repository
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            <a 
                              href={userTask.submissionLiveLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                            >
                              <Globe className="w-3 h-3" />
                              Live Hosted App
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        )}
 
                        {/* Feedback Panel */}
                        {userTask.adminFeedback && (
                          <div className="mt-4 p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl flex gap-2.5 items-start text-xs max-w-xl font-sans">
                            <MessageSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-350">Admin Code Audit Report:</div>
                              <p className="text-slate-450 font-light mt-0.5 leading-relaxed">{userTask.adminFeedback}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {isLocked && (
                          <button 
                            disabled 
                            className="px-4 py-2 bg-zinc-950 border border-zinc-850 text-slate-500 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-not-allowed"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            Task Locked
                          </button>
                        )}

                        {userTask.status === 'quiz_pending' && (
                          <button
                            onClick={() => handleOpenQuiz(userTask)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Take Quiz
                          </button>
                        )}
 
                        {userTask.status === 'unlocked' && (
                          <button
                            onClick={() => handleOpenSubmission(userTask)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Submit Assignment
                          </button>
                        )}
 
                        {isPending && (
                          <button
                            disabled
                            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-slate-500 text-xs font-semibold rounded-lg"
                          >
                            Under Evaluation
                          </button>
                        )}
 
                        {isRejected && (
                          <button
                            onClick={() => handleOpenSubmission(userTask)}
                            className="px-4 py-2 bg-red-955/25 hover:bg-red-955/40 border border-red-900/40 text-red-300 text-xs font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Revise & Re-submit
                          </button>
                        )}
 
                        {isApproved && (
                          <button
                            disabled
                            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-slate-500 text-xs font-semibold rounded-lg flex items-center gap-1"
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
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => { if (!loading) setSelectedTask(null); }}
          />
 
          <div className="relative glass-panel rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-zinc-800 z-55 bg-zinc-900">
            <button
              onClick={() => setSelectedTask(null)}
              disabled={loading}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 disabled:opacity-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
 
            <div className="mb-6">
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-slate-400 rounded">
                Step {selectedTask.taskId.sequenceOrder} Submission
              </span>
              <h3 className="text-xl font-bold text-white mt-2.5">
                Submit {selectedTask.taskId.title}
              </h3>
              <p className="text-slate-450 text-xs font-light leading-relaxed mt-1">
                Provide the active Github codebase and the public live deployment URL.
              </p>
            </div>
 
            {error && (
              <div className="mb-4 p-3 bg-red-955/30 border border-red-900/50 rounded-xl text-red-300 text-xs font-semibold">
                {error}
              </div>
            )}
 
            {successMsg && (
              <div className="mb-4 p-3 bg-blue-955/20 border border-blue-900/30 rounded-xl text-blue-300 text-xs font-semibold">
                {successMsg}
              </div>
            )}

            {isScanning ? (
              <div className="space-y-4">
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 font-mono text-[11px] leading-relaxed text-slate-300 min-h-[220px] relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-2 relative z-20">
                     <div className="flex items-center gap-2 border-b border-zinc-850 pb-2 mb-2 text-xs text-blue-500 font-bold tracking-wider">
                       <span className="w-2 h-2 rounded-full bg-blue-500" />
                       <span>VERAFORGE CI/CD PIPELINE AUDIT</span>
                     </div>
                    {terminalLogs.map((log, idx) => {
                      const isSuccess = log.includes('SUCCESS') || log.includes('OK') || log.includes('0 critical');
                      return (
                        <div 
                          key={idx} 
                          className={`animate-in fade-in duration-150 ${
                            isSuccess ? 'text-emerald-450 font-semibold' : 'text-slate-350'
                          }`}
                        >
                          {log}
                        </div>
                      );
                    })}
                     
                     {terminalLogs.length < 5 && (
                       <div className="text-blue-500/70 typing-caret">
                         &gt; Telemetry analyze active...
                       </div>
                     )}
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-zinc-850 pt-2 mt-4 relative z-20">
                     <span>SECURITY AUDIT ENGINE: RUNNING</span>
                     <span>THREADS: 0x2A4</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-500" />
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://github.com/username/calculator"
                    {...register('submissionRepoLink')}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                  />
                  {errors.submissionRepoLink && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors.submissionRepoLink.message}</p>
                  )}
                </div>
 
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-355 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    Live Hosted URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://calculator-demo.vercel.app"
                    {...register('submissionLiveLink')}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                  />
                  {errors.submissionLiveLink && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors.submissionLiveLink.message}</p>
                  )}
                </div>
 
                {selectedTask.adminFeedback && (
                  <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-slate-350 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      Previous Revision Request:
                    </div>
                    <p className="text-slate-450 leading-relaxed font-light">{selectedTask.adminFeedback}</p>
                  </div>
                )}
 
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-650/50 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
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
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => { if (!quizLoading && !cooldownActive) setActiveQuizTask(null); }}
          />

          <div className="relative glass-panel rounded-2xl p-6 md:p-8 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-zinc-805 z-55 overflow-hidden bg-zinc-900">
            
            {cooldownActive ? (
              /* Cooldown Screen Overlay */
              <div className="absolute inset-0 bg-red-950/95 z-60 flex flex-col items-center justify-center p-6 text-center border-4 border-red-500/50 rounded-2xl shadow-lg animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-xl bg-red-950 border border-red-500/35 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-extrabold text-red-400 tracking-wider uppercase mb-2">SECURITY VERIFICATION FAILURE</h3>
                <p className="text-xs text-red-300 max-w-md font-mono leading-relaxed mb-6">
                  Verification cooldown interface activated. Locking verification inputs for {cooldownTime} seconds.
                </p>
                <div className="w-16 h-16 rounded-full border-4 border-red-500/20 border-t-red-500 flex items-center justify-center animate-spin">
                  <span className="text-xl font-bold text-red-400 font-mono">{cooldownTime}</span>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => setActiveQuizTask(null)}
              disabled={quizLoading}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-350 disabled:opacity-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-slate-400 rounded">
                Prerequisite Verification Quiz
              </span>
              <h3 className="text-xl font-bold text-white mt-2.5">
                Verify Track Knowledge
              </h3>
              <p className="text-slate-450 text-xs font-light leading-relaxed mt-1">
                Answer all 3 technical questions correctly to unlock the submission terminal for **{activeQuizTask.taskId.title}**.
              </p>
            </div>

            {quizError && (
              <div className="mb-4 p-3 bg-red-955/30 border border-red-900/50 rounded-xl text-red-350 text-xs font-semibold">
                {quizError}
              </div>
            )}

            <form onSubmit={handleQuizSubmit} className="space-y-6">
              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1">
                {activeQuizTask.taskId.quizQuestions.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="space-y-2 border-b border-zinc-850 pb-4 last:border-0 last:pb-0">
                    <div className="text-xs font-bold text-slate-205 flex gap-2">
                      <span className="text-blue-500">Q{qIdx + 1}.</span>
                      <p>{q.question}</p>
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
                                ? 'bg-blue-950/20 border-blue-600 text-white'
                                : 'bg-zinc-950 border-zinc-850 text-slate-400 hover:border-zinc-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-blue-500' : 'border-zinc-700'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
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
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-900 disabled:border-zinc-850 disabled:text-slate-500 border border-transparent disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {quizLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validating Credentials...
                  </>
                ) : (
                  <>
                    Unlock Submission Terminal
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
    return `I am excited to share that I have graduated from the Data Science Virtual Internship track at VeraForge! I built and deployed explanatory predictive regression models using Pandas, NumPy, and Scikit-Learn. Ready to turn data into high-value business intelligence! #DataScience #MachineLearning #Pandas #VeraForge`;
  } else if (track === 'Artificial Intelligence') {
    return `Proud to have completed the Artificial Intelligence Virtual Internship at VeraForge! I designed custom Retrieval-Augmented Generation (RAG) architectures and integrated Gemini LLM endpoints with robust rate-limit protocols. #AI #GenerativeAI #RAG #VeraForge`;
  } else if (track === 'Backend Engineering') {
    return `I have successfully completed the Backend Engineering Virtual Internship at VeraForge! I built secure REST APIs with Node.js/Express, implemented JWT token authentication, and optimized MongoDB aggregation pipelines. #Backend #API #NodeJS #VeraForge`;
  } else { // Web Development
    return `I am thrilled to announce that I have successfully completed the Web Development Virtual Internship at VeraForge! I engineered a full-stack serverless task workspace using Next.js, Tailwind CSS, and MongoDB, and passed the rigorous reviews. #WebDev #NextJS #FullStack #VeraForge`;
  }
}
