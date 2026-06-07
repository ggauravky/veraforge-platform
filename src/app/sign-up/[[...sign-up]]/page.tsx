import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
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
        <SignUp 
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#10b981', // emerald-500
            }
          }}
        />
      </div>
    </div>
  );
}
