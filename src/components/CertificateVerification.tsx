'use client';

import React, { useRef, useState } from 'react';
import { Shield, Award, Calendar, CheckCircle2, Download, ExternalLink, Globe, Home, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateVerificationProps {
  certificate: any;
  student: any;
}

export default function CertificateVerification({ certificate, student }: CertificateVerificationProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);

    try {
      const element = certificateRef.current;
      
      // Render the HTML element as a high-res canvas (scale 2 for sharpness)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#020617', // match slate-950
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Certificate is standard landscape A4 size: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Draw image to fit the entire PDF page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`VeraForge_Certificate_${student.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF certificate:', error);
      alert('Failed to generate PDF. Please try printing the page manually (Ctrl+P) or try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative min-h-screen text-slate-100 pb-20">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Corporate Verification Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10 mb-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase">Credential Registry</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-900/30 text-emerald-400 text-xs font-bold rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Verification Card */}
      <main className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Verification Status Banner */}
        <div className="w-full max-w-4xl bg-slate-900/40 border border-slate-900 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/20 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">System Registry Check</span>
              <h2 className="text-xl font-bold text-white">CREDENTIAL VERIFIED & AUTHENTIC</h2>
              <p className="text-slate-400 text-xs mt-0.5">This certificate record has been matched with our secure database registry.</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-slate-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.01] transition-all shrink-0 cursor-pointer"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Official PDF
              </>
            )}
          </button>
        </div>

        {/* Certificate Rendering Area (Landscape aspect ratio ~1.41) */}
        <div className="w-full max-w-4xl bg-slate-950 border border-slate-900 rounded-3xl p-1 shadow-2xl relative overflow-hidden mb-8 group">
          
          <div 
            ref={certificateRef}
            className="w-full aspect-[1.414/1] bg-slate-950 border-[12px] border-double border-slate-900 p-8 md:p-12 relative flex flex-col justify-between overflow-hidden"
          >
            {/* Watermark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-slate-100 pointer-events-none">
              <Shield className="w-[350px] h-[350px]" />
            </div>

            {/* Top Border Accents */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
            
            {/* Certificate Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <Shield className="w-7 h-7 text-emerald-400" />
                <div>
                  <span className="font-extrabold text-lg tracking-wider text-slate-200 block">VERAFORGE</span>
                  <span className="text-[8px] text-slate-500 font-bold tracking-[0.25em] uppercase block">Virtual Academy</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase block">Certificate Serial No.</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">{certificate.certificateId.slice(0, 18)}...</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center my-auto py-4">
              <h3 className="font-extrabold text-xs text-emerald-400 tracking-[0.35em] uppercase mb-4">
                Certificate of Completion
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mb-1">
                This document is proudly awarded to
              </p>
              <h1 className="text-2xl md:text-4xl font-serif font-extrabold text-white my-3 italic tracking-wide">
                {student.fullName}
              </h1>
              <p className="text-slate-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
                for successfully completing the rigorous curriculum of the <span className="text-slate-200 font-semibold">Full Stack Development Internship Track</span>, 
                demonstrating functional competence in developing production-ready web platforms using <span className="text-emerald-400 font-medium">Next.js App Router, MongoDB, and Tailwind CSS</span>.
              </p>
            </div>

            {/* Certificate Footers (Signatures and Seal) */}
            <div className="flex justify-between items-end pt-4 border-t border-slate-900/60">
              
              {/* Registrar signature */}
              <div className="w-1/3">
                <div className="font-serif font-semibold text-sm italic text-slate-300 pl-2">
                  Antigravity AI
                </div>
                <div className="h-[1px] bg-slate-800 w-36 mt-1 mb-1.5" />
                <span className="text-[8px] text-slate-500 font-bold tracking-widest uppercase block">Lead Program Director</span>
              </div>

              {/* Verified Hologram Badge */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-[7px] text-emerald-400/80 font-bold tracking-widest uppercase mt-1.5 block">VERIFIED AUTHENTIC</span>
              </div>

              {/* Date & Link */}
              <div className="w-1/3 text-right">
                <span className="text-[8px] text-slate-500 font-bold tracking-widest uppercase block">Date of Issue</span>
                <span className="text-xs text-slate-300 font-semibold block mt-0.5">{formattedDate}</span>
                <div className="mt-2 text-[8px] text-slate-500">
                  Secure Verify URL: <span className="text-slate-400 font-mono">veraforge.com/verify/...</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            VeraForge Home
          </Link>
          <span className="text-slate-800">|</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Internship Dashboard
          </Link>
        </div>

      </main>
    </div>
  );
}
