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
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden min-h-screen py-12 px-4 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-moving pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-550/2 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm">
            <VeraForgeLogo className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
            <span className="block text-[8px] text-slate-400 font-bold tracking-[0.2em] uppercase">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="w-full glass-panel rounded-2xl p-8 bg-zinc-900/50">
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-white uppercase tracking-tight">Administrative Portal</h2>
            <p className="text-slate-500 text-xs mt-1">Authenticate using system environment credentials.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-red-300 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@veraforge.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-355 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Security Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 transition-all text-xs outline-none shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
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
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
}
