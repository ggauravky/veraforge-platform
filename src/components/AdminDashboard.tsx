'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, CheckSquare, Award, CheckCircle2, XCircle, 
  ExternalLink, Globe, Loader2, MessageSquare, AlertCircle, RefreshCw,
  UserPlus, Trash2, RotateCw
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';
import { Github, Linkedin } from '@/components/icons';
import { 
  approveStudentAction, 
  rejectStudentAction, 
  reviewTaskAction, 
  issueCertificateAction,
  removeStudentAction,
  resetStudentTasksAction
} from '@/lib/actions/admin';
import { adminLogoutAction } from '@/lib/actions/admin-auth';

interface AdminDashboardProps {
  pendingStudents: any[];
  pendingSubmissions: any[];
  graduationCandidates: any[];
  allStudents: any[];
}

type TabType = 'registrations' | 'submissions' | 'graduations' | 'students';

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

  const handleApproveStudent = async (studentId: string) => {
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await approveStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student approved successfully and default tasks assigned.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to approve student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to reject this student application?')) return;
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await rejectStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student application rejected.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to reject student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleApproveTask = async (userTaskId: string) => {
    setLoadingId(userTaskId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await reviewTaskAction({
        userTaskId,
        status: 'approved',
      });
      if (res.success) {
        setActionSuccess('Task approved! Next task unlocked if available.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to approve task.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleOpenRejectTask = (userTaskId: string) => {
    setFeedbackTaskId(userTaskId);
    setAdminFeedback('');
    setActionError('');
  };

  const handleRejectTaskSubmit = async () => {
    if (!feedbackTaskId) return;
    if (!adminFeedback.trim()) {
      setActionError('Feedback is required to request revision.');
      return;
    }
    setLoadingId(feedbackTaskId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await reviewTaskAction({
        userTaskId: feedbackTaskId,
        status: 'rejected',
        adminFeedback,
      });
      if (res.success) {
        setActionSuccess('Revision request submitted with feedback.');
        setFeedbackTaskId(null);
        setAdminFeedback('');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to request revision.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
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
        setActionSuccess('Certificate generated successfully!');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to issue certificate.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };
  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to permanently remove this student and delete all their progress/certificates?')) return;
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await removeStudentAction(studentId);
      if (res.success) {
        setActionSuccess('Student record and related progress successfully removed from database.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to remove student.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleResetTasks = async (studentId: string) => {
    if (!confirm('Are you sure you want to reset this student\'s task assignments? This will wipe all current submissions and certificates.')) return;
    setLoadingId(studentId);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await resetStudentTasksAction(studentId);
      if (res.success) {
        setActionSuccess('Student assignments successfully reset and default tasks re-seeded.');
        router.refresh();
      } else {
        setActionError(res.error || 'Failed to reset student assignments.');
      }
    } catch (err: any) {
      setActionError(err.message || 'An error occurred.');
    } finally {
      setLoadingId(null);
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
              Super Admin Control
            </span>
            <button
              onClick={async () => {
                await adminLogoutAction();
                router.push('/admin-login');
                router.refresh();
              }}
              className="text-xs text-red-400 hover:text-red-350 font-medium bg-cyber-navy-dark hover:bg-cyber-navy-light/40 border border-red-900/30 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Control Panel content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        
        {/* Statistics & Notices */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-cyber-navy-light/35">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Platform Administration</h2>
            <p className="text-slate-400 text-sm font-light mt-1">
              Verify applications, review task repositories, and issue dynamic graduation credentials.
            </p>
          </div>

          <button 
            onClick={() => { router.refresh(); setActionSuccess('Sync completed.'); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyber-navy-dark hover:bg-cyber-navy-light border border-cyber-navy-light/40 rounded-xl text-xs font-semibold text-electric-cyan hover:text-white transition-all shadow-[0_0_10px_rgba(0,255,255,0.05)] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Data
          </button>
        </div>

        {/* Global Action Notifications */}
        {actionError && (
          <div className="mb-6 p-4 bg-red-950/20 border border-red-900/40 rounded-xl text-red-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        {actionSuccess && (
          <div className="mb-6 p-4 bg-electric-cyan/10 border border-electric-cyan/20 rounded-xl text-electric-cyan text-xs font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(0,255,255,0.05)]">
            <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-cyber-navy-light/35 mb-8 gap-2">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all relative cursor-pointer ${
              activeTab === 'registrations' 
                ? 'border-electric-cyan text-white bg-electric-cyan/5 text-cyan-glow' 
                : 'border-transparent text-slate-400 hover:text-slate-250'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Pending Approvals
            {pendingStudents.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-electric-cyan text-cyber-navy-dark text-[10px] font-extrabold rounded-full shadow-[0_0_8px_rgba(0,255,255,0.25)]">
                {pendingStudents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'submissions' 
                ? 'border-electric-cyan text-white bg-electric-cyan/5 text-cyan-glow' 
                : 'border-transparent text-slate-400 hover:text-slate-250'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Task Submissions
            {pendingSubmissions.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-electric-blue text-white text-[10px] font-extrabold rounded-full animate-pulse">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('graduations')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'graduations' 
                ? 'border-electric-cyan text-white bg-electric-cyan/5 text-cyan-glow' 
                : 'border-transparent text-slate-400 hover:text-slate-250'
            }`}
          >
            <Award className="w-4 h-4" />
            Graduations
            {graduationCandidates.filter(c => !c.certificateId).length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-electric-cyan text-cyber-navy-dark text-[10px] font-extrabold rounded-full shadow-[0_0_8px_rgba(0,255,255,0.25)]">
                {graduationCandidates.filter(c => !c.certificateId).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'students' 
                ? 'border-electric-cyan text-white bg-electric-cyan/5 text-cyan-glow' 
                : 'border-transparent text-slate-400 hover:text-slate-250'
            }`}
          >
            <Users className="w-4 h-4" />
            Student Directory
            {allStudents.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/60 text-slate-300 text-[10px] font-extrabold rounded-full">
                {allStudents.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Panel contents */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl min-h-[300px]">
          
          {/* TAB 1: PENDING STUDENTS */}
          {activeTab === 'registrations' && (
            <div className="overflow-x-auto">
              {pendingStudents.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <Users className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                  No pending student applications at this time.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-cyber-navy-light/35 text-slate-405 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Education</th>
                      <th className="pb-4 font-semibold">Reference Profiles</th>
                      <th className="pb-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-navy-light/25">
                    {pendingStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-cyber-navy-light/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{student.fullName}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{student.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-slate-300 font-medium">{student.universityName}</div>
                          <div className="text-slate-500 text-xs mt-0.5">Class of {student.graduationYear}</div>
                        </td>
                        <td className="py-4 space-y-1">
                          <a 
                            href={student.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-electric-cyan w-fit transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub Profile
                          </a>
                          <a 
                            href={student.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-electric-cyan w-fit transition-colors"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            LinkedIn Profile
                          </a>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <button
                              onClick={() => handleRejectStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-3.5 py-2 border border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark disabled:opacity-50 text-xs font-extrabold rounded-lg shadow transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                            >
                              {loadingId === student._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
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
            <div className="overflow-x-auto">
              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <CheckSquare className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                  No student task submissions are pending evaluation.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-cyber-navy-light/35 text-slate-405 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Task Details</th>
                      <th className="pb-4 font-semibold">Deliverable Links</th>
                      <th className="pb-4 font-semibold text-right">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-navy-light/25">
                    {pendingSubmissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-cyber-navy-light/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{sub.userId?.fullName || 'Unknown Student'}</div>
                          <div className="text-slate-505 text-xs mt-0.5">{sub.userId?.email}</div>
                        </td>
                        <td className="py-4">
                          <span className="inline-block px-2.5 py-0.5 bg-cyber-navy-dark border border-cyber-navy-light/50 rounded-full text-slate-400 font-medium text-[10px] tracking-wide mb-1">
                            Step {sub.taskId?.sequenceOrder}
                          </span>
                          <div className="text-slate-200 font-bold text-sm">{sub.taskId?.title}</div>
                        </td>
                        <td className="py-4 space-y-1.5">
                          <a 
                            href={sub.submissionRepoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-electric-cyan w-fit transition-colors"
                          >
                            <Github className="w-3.5 h-3.5 text-slate-550" />
                            Repository Code
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href={sub.submissionLiveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-electric-cyan w-fit transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5 text-slate-550" />
                            Live Host Application
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenRejectTask(sub._id)}
                              disabled={loadingId !== null}
                              className="px-3.5 py-2 border border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Request Revision
                            </button>
                            <button
                              onClick={() => handleApproveTask(sub._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark disabled:opacity-50 text-xs font-extrabold rounded-lg shadow transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                            >
                              {loadingId === sub._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
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
            <div className="overflow-x-auto">
              {graduationCandidates.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <Award className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                  No students have completed all track assignments yet.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-cyber-navy-light/35 text-slate-405 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Institution</th>
                      <th className="pb-4 font-semibold">Credential State</th>
                      <th className="pb-4 font-semibold text-right">Certificate Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-navy-light/25">
                    {graduationCandidates.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-cyber-navy-light/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{candidate.fullName}</div>
                          <div className="text-slate-505 text-xs mt-0.5">{candidate.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-slate-300 font-medium">{candidate.universityName}</div>
                          <div className="text-slate-505 text-xs mt-0.5">Class of {candidate.graduationYear}</div>
                        </td>
                        <td className="py-4">
                          {candidate.certificateId ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-semibold rounded-full shadow-[0_0_8px_rgba(0,255,255,0.05)]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Issued
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-electric-blue/15 border border-electric-blue/20 text-electric-blue text-xs font-semibold rounded-full animate-pulse">
                              Ready for Certificate
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          {candidate.certificateId ? (
                            <a
                              href={`/verify/${candidate.certificateId}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 border border-cyber-navy-light/40 hover:border-cyber-navy-light bg-cyber-navy-dark hover:bg-cyber-navy-light/20 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all"
                            >
                              Verify Portal
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={() => handleIssueCertificate(candidate._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-xs rounded-lg shadow-lg shadow-electric-cyan/25 hover:shadow-electric-cyan/35 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.1)]"
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
            <div className="overflow-x-auto">
              {allStudents.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <Users className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                  No students registered on the platform.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-cyber-navy-light/35 text-slate-405 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student Name / Email</th>
                      <th className="pb-4 font-semibold">Onboarding Details</th>
                      <th className="pb-4 font-semibold">Verification Status</th>
                      <th className="pb-4 font-semibold text-right">Directory Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-navy-light/25">
                    {allStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-cyber-navy-light/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{student.fullName}</div>
                          <div className="text-slate-450 text-xs mt-0.5">{student.email}</div>
                        </td>
                        <td className="py-4">
                          {student.universityName ? (
                            <>
                              <div className="text-slate-300 font-medium">{student.universityName}</div>
                              <div className="text-slate-500 text-xs mt-0.5">Class of {student.graduationYear}</div>
                            </>
                          ) : (
                            <span className="text-slate-650 text-xs italic">Pending Onboarding Form</span>
                          )}
                        </td>
                        <td className="py-4">
                          {student.accountStatus === 'active' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-electric-cyan/15 border border-electric-cyan/20 text-electric-cyan text-xs font-semibold rounded-full shadow-[0_0_8px_rgba(0,255,255,0.05)]">
                              Active Student
                            </span>
                          )}
                          {student.accountStatus === 'pending_approval' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-electric-blue/15 border border-electric-blue/20 text-electric-blue text-xs font-semibold rounded-full animate-pulse">
                              Pending Review
                            </span>
                          )}
                          {student.accountStatus === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-950/40 border border-red-900/30 text-red-400 text-xs font-semibold rounded-full">
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
                                className="px-3 py-1.5 border border-cyber-navy-light/30 text-slate-350 bg-cyber-navy-dark hover:bg-cyber-navy-light/35 disabled:opacity-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                title="Reset student's task progress and re-assign tasks"
                              >
                                <RotateCw className="w-3.5 h-3.5" />
                                Reset Tasks
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveStudent(student._id)}
                              disabled={loadingId !== null}
                              className="px-3 py-1.5 border border-red-950/30 hover:border-red-900/40 text-red-400 bg-red-950/10 hover:bg-red-950/20 disabled:opacity-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
            className="absolute inset-0 bg-cyber-navy-dark/80 backdrop-blur-md"
            onClick={() => { if (loadingId === null) setFeedbackTaskId(null); }}
          />

          <div className="relative glass-panel rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-cyber-navy-light/65 z-55">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-electric-cyan text-cyan-glow" />
              Request Assignment Revision
            </h3>
            <p className="text-slate-405 text-xs font-light leading-relaxed mb-4">
              Explain why this submission requires revisions and what specific updates the student must apply.
            </p>

            <div className="space-y-4">
              <textarea
                value={adminFeedback}
                onChange={(e) => setAdminFeedback(e.target.value)}
                placeholder="e.g. Please refactor your CSS layout to be fully responsive. The calculator grid overflows on narrow screens."
                rows={4}
                className="w-full bg-cyber-navy-dark border border-cyber-navy-light/40 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs outline-none resize-none"
              />

              <div className="flex items-center justify-end gap-2.5 mt-2">
                <button
                  onClick={() => setFeedbackTaskId(null)}
                  disabled={loadingId !== null}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectTaskSubmit}
                  disabled={loadingId !== null}
                  className="px-4 py-2 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark text-xs font-extrabold rounded-lg shadow-lg shadow-electric-cyan/25 hover:shadow-electric-cyan/35 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                >
                  {loadingId === feedbackTaskId ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
