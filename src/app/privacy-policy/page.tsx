import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VeraForgeLogo from '@/components/VeraForgeLogo';

export const dynamic = 'force-dynamic';

export default function PrivacyPolicyPage() {
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
            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em]">Legal Statement</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Privacy Policy</h1>
            <p className="text-slate-500 text-xs mt-2">Last Updated: June 6, 2026</p>
          </div>

          <div className="space-y-8 text-sm font-light leading-relaxed max-w-prose">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">1. Information Collection</h2>
              <p>
                At VeraForge, we collect information necessary to register, onboard, and evaluate virtual internship candidates. This information includes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-450">
                <li>Authentication identity data synchronized via Clerk (Email Address, Full Name, User ID).</li>
                <li>Educational and academic details (University Name, Year of Graduation).</li>
                <li>Professional reference links (GitHub profiles, LinkedIn profiles, personal portfolios).</li>
                <li>Project deliverables (Git repositories, deployment links, and assignment submissions).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. Use of Collected Data</h2>
              <p>
                We use the information we collect to operate, manage, and audit our virtual internship program. Specifically, data is used to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-450">
                <li>Evaluate applicant profiles for enrollment approval.</li>
                <li>Allow administrators to view, evaluate, and provide revisions on task submissions.</li>
                <li>Issue cryptographically verifiable completion certificates with unique identifiers.</li>
                <li>Provide public verification pages so prospective employers can audit your completed internship tasks.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">3. Data Sharing and Transfer</h2>
              <p>
                VeraForge does not sell, trade, or rent candidate personal data to third parties. We only share information in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-450">
                <li>With service providers acting on our behalf, such as MongoDB for database storage and Clerk for identity services.</li>
                <li>Through public certificate verification pages (displaying graduation candidate names, university details, and links to approved task repositories).</li>
                <li>To comply with regulatory or legal processes.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">4. Cookies and Sessions</h2>
              <p>
                We use secure, HTTP-only cookies to handle administrator sessions. Student authentication sessions are securely handled through Clerk using strict browser tokens. These cookies ensure only validated administrators can access administrative actions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">5. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request data deletion, please contact us at:
                <br />
                <span className="font-semibold text-slate-350">legal@veraforge.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
