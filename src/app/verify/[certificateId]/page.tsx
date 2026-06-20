import { connectToDatabase } from '@/lib/db';
import Certificate from '@/models/Certificate';
import User from '@/models/User';
import CertificateVerification from '@/components/CertificateVerification';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface VerifyPageProps {
  params: Promise<{
    certificateId: string;
  }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  // Resolve params as per Next.js 15+ routing conventions
  const { certificateId } = await params;

  await connectToDatabase();

  // Find the certificate
  const rawCertificate = await Certificate.findOne({ certificateId }).lean();
  if (!rawCertificate) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-cyber-navy-dark relative overflow-hidden min-h-screen py-16 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 text-center shadow-2xl">
          <div className="mx-auto w-14 h-14 bg-amber-950/60 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">Invalid Certificate</h2>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
            The credential serial key `<span className="text-slate-300 font-semibold break-all">{certificateId}</span>` could not be verified in the VeraForge Registry database.
          </p>

          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-all"
            >
              Return to VeraForge Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const certificate = JSON.parse(JSON.stringify(rawCertificate));

  // Find the associated student
  const rawStudent = await User.findById(certificate.userId).lean();
  if (!rawStudent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-cyber-navy-dark relative overflow-hidden min-h-screen py-16 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 text-center shadow-2xl">
          <div className="mx-auto w-14 h-14 bg-red-950/60 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">Student Profile Missing</h2>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
            The certificate records show valid authorization, but the associated student profile was deleted or removed from the system.
          </p>

          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-all"
            >
              Return to VeraForge Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const student = JSON.parse(JSON.stringify(rawStudent));

  return (
    <CertificateVerification 
      certificate={certificate} 
      student={student} 
    />
  );
}
