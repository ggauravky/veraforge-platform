'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, CheckSquare, Award, CheckCircle2, XCircle, 
  ExternalLink, Globe, Loader2, MessageSquare, AlertCircle, RefreshCw,
  UserPlus, Trash2, RotateCw, Sparkles
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';
import { Github, Linkedin } from '@/components/icons';
import { 
  approveStudentAction, 
  rejectStudentAction, 
  reviewTaskAction, 
  issueCertificateAction,
  removeStudentAction,
  resetStudentTasksAction,
  generateAIFeedbackAction
} from '@/lib/actions/admin';
import { adminLogoutAction } from '@/lib/actions/admin-auth';

interface AdminDashboardProps {
  pendingStudents: any[];
  pendingSubmissions: any[];
  graduationCandidates: any[];
  allStudents: any[];
}

type TabType = 'registrations' | 'submissions' | 'graduations' | 'students';

function parseAIFeedback(feedback: string) {
  if (!feedback) return null;
  
  let strengths: string[] = [];
  let optimizations: string[] = [];
  let security = '';
  
  const lines = feedback.split('\n');
  let currentSection = '';
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().includes('code strengths')) {
      currentSection = 'strengths';
    } else if (trimmed.toLowerCase().includes('optimization ideas') || trimmed.toLowerCase().includes('optimization')) {
      currentSection = 'optimizations';
    } else if (trimmed.toLowerCase().includes('security review') || trimmed.toLowerCase().includes('security note') || trimmed.toLowerCase().includes('security review note')) {
      currentSection = 'security';
    } else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
      const bullet = trimmed.replace(/^[\*\-\s]+/, '');
      if (bullet) {
        if (currentSection === 'strengths') strengths.push(bullet);
        if (currentSection === 'optimizations') optimizations.push(bullet);
      }
    } else if (trimmed) {
      if (currentSection === 'security') {
        security += (security ? ' ' : '') + trimmed;
      } else if (currentSection === 'strengths' && !strengths.length) {
        strengths.push(trimmed);
      } else if (currentSection === 'optimizations' && !optimizations.length) {
        optimizations.push(trimmed);
      }
    }
  });

  return { strengths, optimizations, security };
}

export default function AdminDashboard({ 
  pendingStudents, 
  pendingSubmissions, 
  graduationCandidates,
  allStudents
}: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('registrations');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feedbackTaskId, setFeedbackTaskId] = useState<string | null>(null);
  const [adminFeedback, setAdminFeedback] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);

  const handleGenerateAIFeedback = async (taskIdToUse?: string) => {
    const id = taskIdToUse || feedbackTaskId;
    if (!id) return;
    setGeneratingAI(true);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await generateAIFeedbackAction(id);
      if (res.success && res.feedback) {
        setAdminFeedback(res.feedback);
        setActionSuccess('AI feedback report successfully generated.');
      } else {
        setActionError(res.error || 'Failed to generate AI feedback.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred during AI report generation.');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleApproveStudent = async (studentId: string) => {
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await approveStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student profile approved and course tasks seeded successfully.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to approve student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing student approval.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectStudent = async (studentId: string) => {
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await rejectStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student registration declined.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to reject student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing student rejection.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleApproveTask = async (taskSubmissionId: string) => {
    setLoadingId(taskSubmissionId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await reviewTaskAction({ userTaskId: taskSubmissionId, status: 'approved', adminFeedback: '' });
      if (res.success) {
        setActionSuccess('Task submission approved. Next sequential step unlocked for the student.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to approve task.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing task approval.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleOpenRejectTask = (taskSubmissionId: string) => {
    setFeedbackTaskId(taskSubmissionId);
    setAdminFeedback('');
    setActionError('');
    setActionSuccess('');
  };

  const handleRejectTaskSubmit = async () => {
    if (!feedbackTaskId) return;
    if (!adminFeedback.trim()) {
      setActionError('Feedback explanation comments are required to request revisions.');
      return;
    }

    setLoadingId(feedbackTaskId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await reviewTaskAction({ userTaskId: feedbackTaskId, status: 'rejected', adminFeedback });
      if (res.success) {
        setActionSuccess('Task evaluation submitted with revision requests.');
        setFeedbackTaskId(null);
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to request task revision.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing revision request.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleIssueCertificate = async (studentId: string) => {
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await issueCertificateAction(studentId);
      if (res.success) {
        setActionSuccess('Cryptographic verified certificate issued successfully.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to issue graduation certificate.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing certificate issuance.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to completely remove this student and all their tasks? This action is irreversible.')) {
      return;
    }
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await removeStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student record deleted from database.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to remove student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing student removal.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleResetTasks = async (studentId: string) => {
    if (!confirm('Reset student task timeline? This will clear all submitted code links and reset status back to unlocked for Step 1.')) {
      return;
    }
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await resetStudentTasksAction(studentId);
      if (res.success) {
        setActionSuccess('Student tasks reset and seeded back to Step 1.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to reset student tasks.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error executing task reset.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 min-h-screen text-slate-100 pb-20 relative font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-20">
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
              Super Admin Control
            </span>
            <button
              onClick={async () => {
                await adminLogoutAction();
                router.push('/admin-login');
                router.refresh();
              }}
              className="text-xs text-red-400 hover:text-red-350 font-medium bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Control Panel content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        
        {/* Statistics & Notices */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-900">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Platform Administration</h2>
            <p className="text-slate-400 text-xs font-light mt-1">
              Verify applications, review task repositories, and issue graduation credentials.
            </p>
          </div>

          <button 
            onClick={() => { router.refresh(); setActionSuccess('Sync completed.'); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-semibold text-blue-500 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Data
          </button>
        </div>

        {/* Global Action Notifications */}
        {actionError && (
          <div className="mb-6 p-4 bg-red-955/20 border border-red-900/45 rounded-xl text-red-350 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        {actionSuccess && (
          <div className="mb-6 p-4 bg-blue-950/20 border border-blue-900/40 rounded-xl text-blue-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-900 mb-8 gap-2">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'registrations' 
                ? 'border-blue-500 text-blue-500 bg-blue-950/10' 
                : 'border-transparent text-slate-500 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Pending Approvals
            {pendingStudents.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-extrabold rounded-full">
                {pendingStudents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'submissions' 
                ? 'border-blue-500 text-blue-500 bg-blue-950/10' 
                : 'border-transparent text-slate-500 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Task Submissions
            {pendingSubmissions.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-extrabold rounded-full">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('graduations')}
            className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'graduations' 
                ? 'border-blue-500 text-blue-500 bg-blue-950/10' 
                : 'border-transparent text-slate-500 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Graduations
            {graduationCandidates.filter(c => !c.certificateId).length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-extrabold rounded-full">
                {graduationCandidates.filter(c => !c.certificateId).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'students' 
                ? 'border-blue-500 text-blue-500 bg-blue-950/10' 
                : 'border-transparent text-slate-500 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Student Directory
          </button>
        </div>

        {/* Dashboard Panels */}
        <div className="glass-panel rounded-2xl p-6 bg-zinc-900/30">
          
          {/* TAB 1: PENDING REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <div className="overflow-x-auto animate-in fade-in duration-200">
              {pendingStudents.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <UserPlus className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                  No student applications are pending verification.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student Name</th>
                      <th className="pb-4 font-semibold">University</th>
                      <th className="pb-4 font-semibold">Social Handles</th>
                      <th className="pb-4 font-semibold text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850">
                    {pendingStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-sm">{student.fullName}</div>
                          <div className="text-slate-500 text-[10px] mt-0.5">{student.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-slate-350 font-medium">{student.universityName}</div>
                          <div className="text-slate-500 text-[10px] mt-0.5 font-light">Class of {student.graduationYear}</div>
                        </td>
                        <td className="py-4 space-y-1">
                          <a 
                            href={student.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-slate-450 hover:text-blue-500 w-fit transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            GitHub Profile
                          </a>
                          <a 
                            href={student.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-slate-450 hover:text-blue-500 w-fit transition-colors"
                          >
                            <Linkedin className="w-3 h-3" />
                            LinkedIn Profile
                          </a>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <button
                              onClick={() => handleRejectStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-3.5 py-2 border border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 text-[10px] font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                            >
                              {loadingId === student._id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                'Approve & Seed'
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: TASK SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="overflow-x-auto animate-in fade-in duration-200">
              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <CheckSquare className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                  No student task submissions are pending evaluation.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Task Details</th>
                      <th className="pb-4 font-semibold">Deliverable Links</th>
                      <th className="pb-4 font-semibold text-right">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850">
                    {pendingSubmissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-sm">{sub.userId?.fullName || 'Unknown Student'}</div>
                          <div className="text-slate-500 text-[10px] mt-0.5">{sub.userId?.email}</div>
                        </td>
                        <td className="py-4">
                          <span className="inline-block px-2 py-0.5 bg-zinc-950 border border-zinc-850 rounded text-slate-400 font-medium text-[9px] tracking-wide mb-1 font-mono">
                            Step {sub.taskId?.sequenceOrder}
                          </span>
                          <div className="text-slate-200 font-bold text-xs">{sub.taskId?.title}</div>
                        </td>
                        <td className="py-4 space-y-1.5">
                          <a 
                            href={sub.submissionRepoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-slate-450 hover:text-blue-500 w-fit transition-colors"
                          >
                            <Github className="w-3 h-3 text-slate-500" />
                            Repository Code
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <a 
                            href={sub.submissionLiveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-slate-450 hover:text-blue-500 w-fit transition-colors"
                          >
                            <Globe className="w-3 h-3 text-slate-500" />
                            Live Host Application
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <button
                            onClick={() => {
                              handleOpenRejectTask(sub._id);
                              handleGenerateAIFeedback(sub._id);
                            }}
                            className="mt-1 flex items-center gap-1 text-[9px] text-blue-500 hover:text-white bg-zinc-950 border border-zinc-850 px-2 py-1 rounded transition-all cursor-pointer font-bold"
                          >
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            Generate Automated AI Code Report
                          </button>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenRejectTask(sub._id)}
                              disabled={loadingId !== null}
                              className="px-3.5 py-2 border border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Request Revision
                            </button>
                            <button
                              onClick={() => handleApproveTask(sub._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 text-[10px] font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                            >
                              {loadingId === sub._id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                'Approve & Unlock'
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 3: GRADUATION & CERTIFICATE ISSUANCE */}
          {activeTab === 'graduations' && (
            <div className="overflow-x-auto animate-in fade-in duration-200">
              {graduationCandidates.length === 0 ? (
                <div className="text-center py-16 text-slate-505 text-sm">
                  <Award className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                  No students have completed all track assignments yet.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Institution</th>
                      <th className="pb-4 font-semibold">Credential State</th>
                      <th className="pb-4 font-semibold text-right">Certificate Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850">
                    {graduationCandidates.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-sm">{candidate.fullName}</div>
                          <div className="text-slate-500 text-[10px] mt-0.5">{candidate.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-slate-350 font-medium">{candidate.universityName}</div>
                          <div className="text-slate-500 text-[10px] mt-0.5">Class of {candidate.graduationYear}</div>
                        </td>
                        <td className="py-4">
                          {candidate.certificateId ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-950/20 border border-blue-900/30 text-blue-500 text-[10px] font-semibold rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Issued
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-950/20 border border-blue-900/20 text-blue-500 text-[10px] font-semibold rounded-full animate-pulse">
                              Ready for Certificate
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          {candidate.certificateId ? (
                            <a
                              href={`/verify/${candidate.certificateId}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-slate-300 hover:text-white text-[10px] font-bold rounded-lg transition-all"
                            >
                              Verify Portal
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <button
                              onClick={() => handleIssueCertificate(candidate._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-lg shadow-sm transition-all cursor-pointer"
                            >
                              {loadingId === candidate._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                'Issue Certificate'
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 4: STUDENT DIRECTORY */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto animate-in fade-in duration-200">
              {allStudents.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <Users className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                  No students registered on the platform.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student Name / Email</th>
                      <th className="pb-4 font-semibold">Onboarding Details</th>
                      <th className="pb-4 font-semibold">Verification Status</th>
                      <th className="pb-4 font-semibold text-right">Directory Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850">
                    {allStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-sm">{student.fullName}</div>
                          <div className="text-slate-450 text-[10px] mt-0.5">{student.email}</div>
                        </td>
                        <td className="py-4">
                          {student.universityName ? (
                            <>
                              <div className="text-slate-350 font-medium">{student.universityName}</div>
                              <div className="text-slate-500 text-[10px] mt-0.5">Class of {student.graduationYear}</div>
                            </>
                          ) : (
                            <span className="text-slate-600 text-xs italic">Pending Onboarding Form</span>
                          )}
                        </td>
                        <td className="py-4">
                          {student.accountStatus === 'active' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-950/20 border border-blue-900/30 text-blue-500 text-[10px] font-semibold rounded-full">
                              Active Student
                            </span>
                          )}
                          {student.accountStatus === 'pending_approval' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-955/15 border border-blue-900/20 text-blue-450 text-[10px] font-semibold rounded-full animate-pulse">
                              Pending Review
                            </span>
                          )}
                          {student.accountStatus === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-950/40 border border-red-900/30 text-red-400 text-[10px] font-semibold rounded-full">
                              Application Declined
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            {student.accountStatus === 'active' && (
                              <button
                                onClick={() => handleResetTasks(student._id)}
                                disabled={loadingId !== null}
                                className="px-3 py-1.5 border border-zinc-850 text-slate-300 bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                title="Reset student's task progress and re-assign tasks"
                              >
                                <RotateCw className="w-3 h-3" />
                                Reset Tasks
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-3 py-1.5 border border-red-950/30 hover:border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Revision Dialog Feedback Modal */}
      {feedbackTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => { if (loadingId === null) setFeedbackTaskId(null); }}
          />

          <div className={`relative glass-panel rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-zinc-800 z-55 bg-zinc-900 w-full ${adminFeedback ? 'max-w-4xl' : 'max-w-md'}`}>
            <button
              onClick={() => setFeedbackTaskId(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              Request Assignment Revision
            </h3>
            <p className="text-slate-450 text-[11px] font-light leading-relaxed mb-4">
              Explain why this submission requires revisions and what specific updates the student must apply.
            </p>

            <div className={`grid gap-6 ${adminFeedback ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Left Column: Form & Actions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleGenerateAIFeedback()}
                    disabled={generatingAI}
                    className="px-3 py-1.5 bg-blue-950/15 hover:bg-blue-950/30 border border-blue-900/30 text-blue-450 disabled:opacity-50 text-[9px] font-bold rounded transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    {generatingAI ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Analyzing Submission...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Generate Automated AI Code Report
                      </>
                    )}
                  </button>
                </div>
                
                <textarea
                  value={adminFeedback}
                  onChange={(e) => setAdminFeedback(e.target.value)}
                  placeholder="e.g. Please refactor your CSS layout to be fully responsive. The calculator grid overflows on narrow screens."
                  rows={8}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl p-3 text-slate-105 placeholder-slate-700 text-xs outline-none resize-none font-sans shadow-inner"
                />

                <div className="flex items-center justify-end gap-2.5 mt-2">
                  <button
                    onClick={() => setFeedbackTaskId(null)}
                    disabled={loadingId !== null}
                    className="px-4 py-2 text-slate-500 hover:text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectTaskSubmit}
                    disabled={loadingId !== null}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    {loadingId === feedbackTaskId ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: AI Report Bento-Style Visualizer */}
              {adminFeedback && (
                <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 max-h-[300px] md:max-h-none md:h-full overflow-y-auto space-y-4 font-sans text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-blue-500 font-bold border-b border-zinc-850 pb-2 uppercase text-[9px]">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>Structured AI Feedback Report</span>
                    </div>
                    
                    {(() => {
                      const report = parseAIFeedback(adminFeedback);
                      if (!report) return <p className="text-slate-400 font-mono text-[10px] whitespace-pre-wrap mt-2">{adminFeedback}</p>;
                      return (
                        <div className="space-y-4 mt-3">
                          {report.strengths.length > 0 && (
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-3">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-450 block mb-1">Code Strengths</span>
                              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[10px] font-light">
                                {report.strengths.map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                            </div>
                          )}
                          
                          {report.optimizations.length > 0 && (
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-3">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-450 block mb-1 font-sans">Optimizations</span>
                              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[10px] font-light">
                                {report.optimizations.map((o, i) => <li key={i}>{o}</li>)}
                              </ul>
                            </div>
                          )}
                          
                          {report.security && (
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-3">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 block mb-1">Security Audit</span>
                              <p className="text-slate-400 text-[10px] leading-relaxed font-light">{report.security}</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <div className="text-[8px] text-slate-600 border-t border-zinc-850 pt-2 font-mono mt-4">
                    ANALYZER MODEL: gemini-2.5-flash-preview
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
