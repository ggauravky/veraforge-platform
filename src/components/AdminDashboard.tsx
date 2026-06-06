'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, Users, CheckSquare, Award, CheckCircle2, XCircle, 
  ExternalLink, Globe, Loader2, MessageSquare, AlertCircle, RefreshCw 
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { 
  approveStudentAction, 
  rejectStudentAction, 
  reviewTaskAction, 
  issueCertificateAction 
} from '@/lib/actions/admin';
import { UserButton } from '@clerk/nextjs';

interface AdminDashboardProps {
  pendingStudents: any[];
  pendingSubmissions: any[];
  graduationCandidates: any[];
}

type TabType = 'registrations' | 'submissions' | 'graduations';

export default function AdminDashboard({ 
  pendingStudents, 
  pendingSubmissions, 
  graduationCandidates 
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

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative min-h-screen text-slate-100">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
              <span className="block text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase">Administrative Suite</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-indigo-400 font-medium bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full hidden sm:inline">
              Super Admin Control
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Control Panel content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        
        {/* Statistics & Notices */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Platform Administration</h2>
            <p className="text-slate-400 text-sm font-light mt-1">
              Verify applications, review task repositories, and issue dynamic graduation credentials.
            </p>
          </div>

          <button 
            onClick={() => { router.refresh(); setActionSuccess('Sync completed.'); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
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
          <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-900 mb-8 gap-2">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all relative ${
              activeTab === 'registrations' 
                ? 'border-indigo-500 text-white bg-indigo-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Pending Applications
            {pendingStudents.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold rounded-full">
                {pendingStudents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'submissions' 
                ? 'border-indigo-500 text-white bg-indigo-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Task Submissions
            {pendingSubmissions.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-amber-600 text-white text-[10px] font-extrabold rounded-full animate-pulse">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('graduations')}
            className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'graduations' 
                ? 'border-indigo-500 text-white bg-indigo-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Graduations
            {graduationCandidates.filter(c => !c.certificateId).length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full">
                {graduationCandidates.filter(c => !c.certificateId).length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Panel contents */}
        <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 shadow-xl min-h-[300px]">
          
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
                    <tr className="border-b border-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Education</th>
                      <th className="pb-4 font-semibold">Reference Profiles</th>
                      <th className="pb-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50">
                    {pendingStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-slate-900/10 transition-colors">
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
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 w-fit transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub Profile
                          </a>
                          <a 
                            href={student.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 w-fit transition-colors"
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
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-slate-950 disabled:opacity-50 text-xs font-extrabold rounded-lg shadow transition-all cursor-pointer"
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
                    <tr className="border-b border-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Task Details</th>
                      <th className="pb-4 font-semibold">Deliverable Links</th>
                      <th className="pb-4 font-semibold text-right">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50">
                    {pendingSubmissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{sub.userId?.fullName || 'Unknown Student'}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{sub.userId?.email}</div>
                        </td>
                        <td className="py-4">
                          <span className="inline-block px-2.5 py-0.5 bg-slate-950 border border-slate-800 rounded-full text-slate-400 font-medium text-[10px] tracking-wide mb-1">
                            Step {sub.taskId?.sequenceOrder}
                          </span>
                          <div className="text-slate-200 font-bold text-sm">{sub.taskId?.title}</div>
                        </td>
                        <td className="py-4 space-y-1.5">
                          <a 
                            href={sub.submissionRepoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 w-fit transition-colors"
                          >
                            <Github className="w-3.5 h-3.5 text-slate-500" />
                            Repository Code
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href={sub.submissionLiveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 w-fit transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
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
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-slate-950 disabled:opacity-50 text-xs font-extrabold rounded-lg shadow transition-all cursor-pointer"
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
                    <tr className="border-b border-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Student</th>
                      <th className="pb-4 font-semibold">Institution</th>
                      <th className="pb-4 font-semibold">Credential State</th>
                      <th className="pb-4 font-semibold text-right">Certificate Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50">
                    {graduationCandidates.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-base">{candidate.fullName}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{candidate.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-slate-300 font-medium">{candidate.universityName}</div>
                          <div className="text-slate-500 text-xs mt-0.5">Class of {candidate.graduationYear}</div>
                        </td>
                        <td className="py-4">
                          {candidate.certificateId ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-xs font-semibold rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Issued
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 text-xs font-semibold rounded-full animate-pulse">
                              Ready for Certificate
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          {candidate.certificateId ? (
                            <a
                              href={`/verify/${candidate.certificateId}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all"
                            >
                              Verify Portal
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={() => handleIssueCertificate(candidate._id)}
                              disabled={loadingId !== null}
                              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-extrabold text-xs rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer"
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

        </div>
      </main>

      {/* Revision Dialog Feedback Modal */}
      {feedbackTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => { if (loadingId === null) setFeedbackTaskId(null); }}
          />

          <div className="relative bg-slate-900 border border-slate-850 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Request Assignment Revision
            </h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed mb-4">
              Explain why this submission requires revisions and what specific updates the student must apply.
            </p>

            <div className="space-y-4">
              <textarea
                value={adminFeedback}
                onChange={(e) => setAdminFeedback(e.target.value)}
                placeholder="e.g. Please refactor your CSS layout to be fully responsive. The calculator grid overflows on narrow screens."
                rows={4}
                className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl p-3 text-slate-100 placeholder-slate-650 text-xs outline-none resize-none"
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-extrabold rounded-lg shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
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
