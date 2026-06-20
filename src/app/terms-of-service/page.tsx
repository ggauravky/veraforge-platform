import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 flex flex-col bg-cyber-navy-dark relative overflow-hidden min-h-screen text-slate-350">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-cyber-navy-light/80 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <VeraForgeLogo className="w-5 h-5" />
            <span className="font-extrabold text-lg tracking-wider text-white">VERAFORGE</span>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 relative z-10 w-full">
        <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="border-b border-slate-900 pb-8 mb-8">
            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Agreement Guidelines</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Terms of Service</h1>
            <p className="text-slate-500 text-xs mt-2">Last Updated: June 6, 2026</p>
          </div>

          <div className="space-y-8 text-sm font-light leading-relaxed max-w-prose">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
              <p>
                By registering for an account or using the VeraForge Virtual Internship Management Platform, you agree to be bound by these Terms of Service. If you do not agree, you must immediately terminate use of the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. Registration and Onboarding</h2>
              <p>
                To apply for an internship, you must submit accurate educational, portfolio, and identity details. VeraForge administrators reserve the right to approve, reject, or suspend student applications at their sole discretion, for any reason or no reason.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">3. Code Submission & Plagiarism</h2>
              <p>
                Students are required to complete real-world software engineering tasks sequentially. When submitting code deliverables:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-450">
                <li>The repository must contain code that you have personally written.</li>
                <li>Copying code or using boilerplate templates without substantial customization is strictly prohibited.</li>
                <li>The application must be fully deployed to a public URL that is actively reachable by administrators.</li>
              </ul>
              <p>
                Failure to comply with these rules will result in the immediate rejection of the submission and potential expulsion from the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">4. Certificates and Credentials</h2>
              <p>
                VeraForge completion certificates are issued only upon satisfactory completion of all sequential tasks, as determined by platform administrators. Once issued, certificates contain a public verification URL and a unique cryptographic identifier (UUID) which will remain searchable on the VeraForge platform registry.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">5. Platform Modification & Disclaimer</h2>
              <p>
                VeraForge reserves the right to modify, restrict, or suspend any part of the platform at any time without notice. The platform and all task content are provided "as-is" without any express or implied warranty of any kind, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">6. Contact Info</h2>
              <p>
                Questions about these Terms of Service should be directed to:
                <br />
                <span className="font-semibold text-slate-350">support@veraforge.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
