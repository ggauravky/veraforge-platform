'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Settings, Shield, User as UserIcon, RotateCcw, AlertTriangle, X } from 'lucide-react';
import { toggleRoleAction, resetStudentAction } from '@/lib/actions/dev';

export default function DevConsole() {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch db user profile to show current status/role
  const fetchDbUser = async () => {
    if (!user) return;
    try {
      // We can fetch from an inline API route or server action, but let's make a quick client request
      // to a lightweight endpoint or just use user metadata.
      // Alternatively, we can pass it down, but fetching is easy if we make a simple API route.
      // Let's create an API route /api/dev/me for this
      const res = await fetch('/api/dev/me');
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      }
    } catch (err) {
      console.error('Error fetching db user:', err);
    }
  };

  useEffect(() => {
    if (isLoaded && user && isOpen) {
      fetchDbUser();
    }
  }, [user, isLoaded, isOpen]);

  if (!isLoaded || !user) return null;

  const handleToggleRole = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await toggleRoleAction(user.id);
      if (res.success) {
        setMessage(`Role toggled! New role: ${res.role?.toUpperCase()}`);
        fetchDbUser();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage(`Error: ${res.error}`);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetProgress = async () => {
    if (!confirm('Are you sure you want to reset your student profile, tasks, and certificates? This will wipe your progress for testing.')) {
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await resetStudentAction(user.id);
      if (res.success) {
        setMessage('Progress reset successfully! Reloading...');
        fetchDbUser();
        setTimeout(() => {
          window.location.href = '/onboarding';
        }, 1000);
      } else {
        setMessage(`Error: ${res.error}`);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border border-emerald-400/30 group"
          title="Open Dev Console"
        >
          <Settings className="w-5 h-5 animate-spin-slow group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-sm font-bold tracking-wide">Dev Console</span>
        </button>
      )}

      {/* Console Drawer */}
      {isOpen && (
        <div className="w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Settings className="w-5 h-5" />
              <span>VeraForge Developer Console</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* User Info */}
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs space-y-2">
              <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Database Synced Profile</div>
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="text-slate-300 font-medium">{dbUser?.fullName || user.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DB Role:</span>
                <span className={`font-bold flex items-center gap-1 ${dbUser?.role === 'admin' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                  {dbUser?.role === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                  {dbUser?.role?.toUpperCase() || 'STUDENT (CLERK)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className={`font-semibold capitalize ${
                  dbUser?.accountStatus === 'active' ? 'text-emerald-400' :
                  dbUser?.accountStatus === 'rejected' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {dbUser?.accountStatus || 'Pending Sync'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={handleToggleRole}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700/60 transition-colors"
              >
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Toggle Admin / Student Role</span>
              </button>

              <button
                onClick={handleResetProgress}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-300 hover:text-red-200 text-xs font-semibold rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset My Progress / Onboarding</span>
              </button>
            </div>

            {/* Warnings & Messages */}
            <div className="text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5 bg-slate-950/30 p-2.5 rounded-lg border border-slate-900">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Toggling role will reload the page. Resetting will redirect you to onboarding and clean up your task records.</span>
            </div>

            {message && (
              <div className="text-xs font-medium text-center p-2 rounded bg-slate-800 text-emerald-400 border border-slate-700 animate-pulse">
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
