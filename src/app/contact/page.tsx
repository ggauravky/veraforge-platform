'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Mail, Clock, Send, 
  CheckCircle2, HelpCircle, MessageSquare, Activity, Cpu
} from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    subject: '',
    message: ''
  });
  
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  // Live monitor states
  const [ping, setPing] = useState(14);
  const [cpuLoad, setCpuLoad] = useState(4.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 12) + 11);
      setCpuLoad(Number((Math.random() * 3 + 2.5).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setError('');
    setIsSending(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Student',
      subject: '',
      message: ''
    });
    setIsSent(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden min-h-screen text-slate-300">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-blue-500 transition-colors font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-5 h-5" />
            <span className="font-extrabold text-lg tracking-wider text-white">VERAFORGE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 relative z-10 w-full flex flex-col justify-center">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Info Side (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-slate-450 rounded-full text-xs font-semibold mb-4">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                <span>Contact Registry Support</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                Get In <br />
                <span className="text-blue-500">Touch.</span>
              </h1>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-4">
                Have questions regarding the virtual internship tracks, certificate verification procedures, or custom corporate partnerships? Drop us a message.
              </p>
            </div>

            {/* Live Monitor Widget */}
            <div className="glass-panel rounded-2xl p-5 bg-zinc-900/40 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>SECURE GATEWAY MONITOR</span>
                </div>
                <span className="font-bold text-blue-500">ONLINE</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                <div className="bg-zinc-950 p-2.5 border border-zinc-850 rounded-xl">
                  <div className="text-slate-500 mb-0.5">CPU OCCUPANCY</div>
                  <div className="text-white font-bold flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    {cpuLoad}%
                  </div>
                </div>
                <div className="bg-zinc-950 p-2.5 border border-zinc-850 rounded-xl">
                  <div className="text-slate-500 mb-0.5">PING LATENCY</div>
                  <div className="text-white font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    {ping}ms
                  </div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-slate-500 flex justify-between items-center px-1">
                <span>SECURED GATEWAY CONNECTION</span>
                <span className="text-emerald-450 font-semibold">ACTIVE</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-blue-500 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Email Address</h4>
                  <p className="text-xs font-light text-slate-400 mt-1 hover:text-blue-500 transition-colors">
                    <a href="mailto:support@veraforge.com">support@veraforge.com</a>
                  </p>
                  <p className="text-[10px] text-slate-505 mt-0.5 font-light">Response within 24 business hours</p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-blue-500 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Office Hours</h4>
                  <p className="text-xs font-light text-slate-400 mt-1">Monday &ndash; Friday</p>
                  <p className="text-[10px] font-light text-slate-505">09:00 AM &ndash; 06:00 PM EST</p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-blue-500 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Registry Inquiries</h4>
                  <p className="text-xs font-light text-slate-400 mt-1 leading-relaxed">
                    To check a completion UUID, navigate directly to <span className="text-blue-500 font-mono">/verify</span> registry lookup page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (7 Columns) */}
          <div className="md:col-span-7">
            <div className="glass-panel rounded-2xl p-8 md:p-10 bg-zinc-900/50">
              {isSent ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-blue-950/20 border border-blue-900/30 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">Message Sent Successfully!</h3>
                    <p className="text-slate-400 text-xs font-light mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting VeraForge. Our engineering coordinator will review your inquiry and follow up shortly.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">Send a secure message</h3>
                    <p className="text-slate-500 text-xs mt-1">Your inquiry is routed through our security sandbox.</p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-950/30 border border-red-900/40 text-red-400 text-xs rounded-xl font-light">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 focus:border-blue-500 rounded-xl text-slate-100 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-500/20 placeholder-slate-700 transition-all shadow-inner"
                        required
                      />
                    </div>
 
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-355 uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 focus:border-blue-500 rounded-xl text-slate-100 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-500/20 placeholder-slate-700 transition-all shadow-inner"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                        Your Role
                      </label>
                      <select 
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 focus:border-blue-500 rounded-xl text-slate-300 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer shadow-inner"
                      >
                        <option value="Student">Intern / Student</option>
                        <option value="Employer">Employer / Recruiter</option>
                        <option value="Partner">Academic Partner</option>
                        <option value="Developer">Open Source / Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="internship inquiry"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 focus:border-blue-500 rounded-xl text-slate-100 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-500/20 placeholder-slate-700 transition-all shadow-inner"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 focus:border-blue-500 rounded-xl text-slate-100 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-500/20 placeholder-slate-700 transition-all resize-none shadow-inner"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-extrabold text-xs rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Secure Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
 
        </div>
      </main>
 
      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center relative z-10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-4 h-4" />
            <span className="font-extrabold text-xs tracking-wider text-white uppercase">VeraForge Secure Mailbox</span>
          </div>
          <p className="text-[10px] text-slate-550">
            &copy; {new Date().getFullYear()} VeraForge Platform. SSL Secured routing.
          </p>
        </div>
      </footer>
    </div>
  );
}
