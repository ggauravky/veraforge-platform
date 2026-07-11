'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Globe, Database, Cpu, Mail, Calendar, 
  Award, CheckCircle2, ChevronRight, X, Loader2, Send, ExternalLink, Sparkles
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { contactStudentAction } from '@/lib/actions/recruiter';
import VeraForgeLogo from '@/components/VeraForgeLogo';
import { UserButton } from '@clerk/nextjs';

interface RecruiterDashboardProps {
  recruiter: any;
  students: any[];
}

type TrackFilter = 'All' | 'Web Development' | 'Backend Engineering' | 'Data Science' | 'Artificial Intelligence';

export default function RecruiterDashboard({ recruiter, students }: RecruiterDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTrack, setActiveTrack] = useState<TrackFilter>('All');
  const [graduatedOnly, setGraduatedOnly] = useState(false);
  
  // Contact candidate modal state
  const [contactStudent, setContactStudent] = useState<any | null>(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredStudents = students.filter(student => {
    // 1. Search term match (Name, University, Email)
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.universityName && student.universityName.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // 2. Active track match
    const matchesTrack = activeTrack === 'All' || student.enrolledTrack === activeTrack;
    
    // 3. Graduation state match
    const matchesGraduation = !graduatedOnly || student.graduated === true;

    return matchesSearch && matchesTrack && matchesGraduation;
  });

  const handleOpenContactModal = (student: any) => {
    setContactStudent(student);
    setContactSubject(`VeraForge Internship Inquiry - ${recruiter.companyName}`);
    setContactMessage(
      `Hello ${student.fullName},\n\n` +
      `I am reviewing graduates in the VeraForge Registry and came across your verified portfolio. Your completion metrics in the ${student.enrolledTrack} track align closely with our current technical project requirements.\n\n` +
      `I would love to set up a brief technical sync to discuss upcoming junior opportunities at ${recruiter.companyName}.\n\n` +
      `Best regards,\n` +
      `${recruiter.fullName}\n` +
      `${recruiter.companyName}`
    );
    setError('');
    setSuccess('');
  };

  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactStudent) return;
    if (!contactSubject.trim() || !contactMessage.trim()) {
      setError('Please fill in both the subject and message fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await contactStudentAction({
        studentId: contactStudent._id,
        subject: contactSubject,
        message: contactMessage
      });

      if (res.success) {
        setSuccess(res.msg || 'Message successfully dispatched through VeraForge.');
        setContactSubject('');
        setContactMessage('');
        setTimeout(() => {
          setContactStudent(null);
        }, 2000);
      } else {
        setError(res.error || 'Failed to dispatch message.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-white">{recruiter.fullName}</span>
              <span className="block text-[9px] text-blue-500 font-bold uppercase tracking-wider">{recruiter.companyName} (Employer)</span>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Recruiter Board */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-900">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Talent Discovery Registry</h2>
            <p className="text-slate-405 text-xs font-light mt-1">
              Browse candidate progress profiles, analyze task repositories, and contact graduated interns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates, universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-light"
              />
            </div>
            
            {/* Graduated Toggle Checkbox */}
            <label className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-semibold text-slate-400 select-none cursor-pointer hover:border-zinc-700 transition-all">
              <input 
                type="checkbox"
                checked={graduatedOnly}
                onChange={(e) => setGraduatedOnly(e.target.checked)}
                className="rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500/20"
              />
              Graduates Only
            </label>
          </div>
        </div>

        {/* Track Filters */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-zinc-900">
          {(['All', 'Web Development', 'Backend Engineering', 'Data Science', 'Artificial Intelligence'] as TrackFilter[]).map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border cursor-pointer ${
                activeTrack === track
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-slate-400 hover:text-slate-200 hover:border-zinc-700'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Candidates Bento Grid */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-900 rounded-2xl">
            <Search className="w-10 h-10 mx-auto text-slate-700 mb-3" />
            <h4 className="text-sm font-bold text-slate-400">No candidates found</h4>
            <p className="text-xs text-slate-500 mt-1 font-light">Refine your search term or specialization track filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => {
              const approvedCount = student.tasks.filter((t: any) => t.status === 'approved').length;
              const totalCount = student.tasks.length;
              const percent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

              return (
                <div 
                  key={student._id}
                  className="glass-panel rounded-2xl p-6 bg-zinc-900/50 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group"
                >
                  <div>
                    {/* Top row: Name & Track badge */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{student.fullName}</h4>
                        <span className="text-[10px] text-slate-455 font-light leading-normal block mt-0.5">{student.email}</span>
                      </div>
                      
                      {student.enrolledTrack ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-blue-500 rounded">
                          {student.enrolledTrack}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-950 border border-zinc-855 text-slate-500 rounded">
                          Unenrolled
                        </span>
                      )}
                    </div>

                    {/* School & Links */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mb-6 pt-3 border-t border-zinc-800/40">
                      <div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Education</span>
                        <div className="font-medium text-slate-300 truncate max-w-[150px]">{student.universityName || 'Not Available'}</div>
                        <div className="text-[9px] text-slate-500">Class of {student.graduationYear || 'N/A'}</div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Social Links</span>
                        <div className="flex items-center gap-2">
                          {student.githubUrl && (
                            <a 
                              href={student.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-1.5 bg-zinc-955 hover:bg-zinc-850 border border-zinc-850 rounded hover:text-blue-500 transition-colors"
                              title="GitHub Profile"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {student.linkedinUrl && (
                            <a 
                              href={student.linkedinUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-1.5 bg-zinc-955 hover:bg-zinc-850 border border-zinc-850 rounded hover:text-blue-500 transition-colors"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {student.portfolioUrl && (
                            <a 
                              href={student.portfolioUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-1.5 bg-zinc-955 hover:bg-zinc-850 border border-zinc-850 rounded hover:text-blue-500 transition-colors"
                              title="Personal Website"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress parameters */}
                    {student.enrolledTrack && (
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                          <span>Milestone Tasks Completion</span>
                          <span className="text-blue-500">{percent}% ({approvedCount}/{totalCount})</span>
                        </div>
                        <div className="w-full bg-zinc-950 border border-zinc-850 p-[2px] rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full transition-all duration-350"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Task details summary (little horizontal pills) */}
                    {student.enrolledTrack && (
                      <div className="space-y-1.5 mb-6">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Audit Telemetry</span>
                        <div className="flex flex-wrap gap-1.5">
                          {student.tasks.map((ut: any) => {
                            const isApproved = ut.status === 'approved';
                            return (
                              <span 
                                key={ut._id}
                                className={`text-[8.5px] font-mono px-2 py-0.5 border rounded flex items-center gap-1 ${
                                  isApproved 
                                    ? 'border-emerald-900/30 bg-emerald-950/20 text-emerald-450 font-bold' 
                                    : 'border-zinc-850 bg-zinc-950/60 text-slate-500 font-light'
                                }`}
                              >
                                {isApproved && <CheckCircle2 className="w-2.5 h-2.5" />}
                                Step {ut.taskId?.sequenceOrder}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions (View Certificate / Contact) */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/40 flex items-center justify-between gap-3">
                    <div>
                      {student.certificate ? (
                        <a 
                          href={`/verify/${student.certificate.certificateId}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-blue-550 font-extrabold uppercase tracking-wider hover:text-white transition-colors"
                        >
                          <Award className="w-3.5 h-3.5 text-blue-500" />
                          Registry Certificate
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-[9px] text-slate-500 italic block font-light">Internship In Progress</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleOpenContactModal(student)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Contact Candidate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Recruiter Communication Modal Dialog */}
      {contactStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => { if (!loading) setContactStudent(null); }}
          />

          <div className="relative glass-panel rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-zinc-800 z-55 bg-zinc-900">
            <button
              onClick={() => setContactStudent(null)}
              disabled={loading}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 disabled:opacity-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-slate-400 rounded">
                Direct Candidate Gateway
              </span>
              <h3 className="text-xl font-bold text-white mt-2.5">
                Contact {contactStudent.fullName}
              </h3>
              <p className="text-slate-450 text-xs font-light leading-relaxed mt-1 font-sans">
                Send a secure recruiting invitation. The student will receive notification metrics.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-955/30 border border-red-900/50 rounded-xl text-red-300 text-xs font-semibold">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-blue-950/20 border border-blue-900/40 rounded-xl text-blue-300 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSendContact} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  id="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-slate-105 placeholder-slate-700 text-xs outline-none shadow-inner"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1.5 font-sans">
                  Message Content
                </label>
                <textarea
                  id="message"
                  rows={8}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl p-3.5 text-slate-105 placeholder-slate-700 text-xs outline-none resize-none font-sans shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Dispatching Message...
                  </>
                ) : (
                  <>
                    Send Secure Invitation
                    <Send className="w-3.5 h-3.5" />
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
