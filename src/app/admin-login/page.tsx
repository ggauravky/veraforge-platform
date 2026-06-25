'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, Home } from 'lucide-react';
import { adminLoginAction } from '@/lib/actions/admin-auth';
import Link from 'next/link';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await adminLoginAction({ email, password });
      if (res.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Failed to authenticate.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-cyber-navy-dark relative overflow-hidden min-h-screen py-12 px-4">
      {/* Moving background grid */}
      <div className="absolute inset-0 cyber-grid-moving opacity-[0.22] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyber-navy-dark/80 border border-cyber-navy-light/40 rounded-xl shadow-lg shadow-electric-cyan/5">
            <VeraForgeLogo className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-white bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VERAFORGE</span>
            <span className="block text-[8px] text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="w-full glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-cyber-navy-light/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Administrative Portal</h2>
            <p className="text-slate-500 text-xs mt-1">Authenticate using system environment credentials.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-955/20 border border-red-900/40 rounded-xl text-red-300 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@veraforge.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cyber-navy-dark border border-cyber-navy-light/45 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-650 transition-all text-xs outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Security Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyber-navy-dark border border-cyber-navy-light/45 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-650 transition-all text-xs outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-xs rounded-xl shadow-lg hover:shadow-electric-cyan/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In as Admin
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-electric-cyan transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
}
