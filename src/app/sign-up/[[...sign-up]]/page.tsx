import { SignUp } from '@clerk/nextjs';
import { Shield } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden min-h-screen py-12 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg">
            <Shield className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
            <span className="block text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase">Security Portal</span>
          </div>
        </div>

        {/* Clerk Sign Up component */}
        <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-2xl p-1 shadow-2xl">
          <SignUp 
            appearance={{
              variables: {
                colorPrimary: '#10b981', // emerald-500
                colorBackground: '#0b0f19', // slate-950/90
                colorInputBackground: '#020617', // slate-950
                colorText: '#f8fafc', // slate-50
                colorTextSecondary: '#94a3b8', // slate-400
                colorInputText: '#f8fafc',
                colorBorder: '#1e293b', // slate-800
              },
              elements: {
                card: 'border-0 bg-transparent shadow-none',
                headerTitle: 'text-white',
                headerSubtitle: 'text-slate-400',
                socialButtonsBlockButton: 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200',
                formFieldLabel: 'text-slate-300 font-semibold',
                formFieldInput: 'bg-slate-950 border-slate-800 focus:border-emerald-500 text-white',
                footerActionText: 'text-slate-400',
                footerActionLink: 'text-emerald-400 hover:text-emerald-300',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
