'use client';

import React, { useRef, useState } from 'react';
import { 
  Shield, Award, CheckCircle2, Download, Home, ArrowLeft, Loader2, ShieldCheck, ExternalLink 
} from 'lucide-react';
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

  const trackName = student.enrolledTrack || 'Web Development';

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);

    try {
      const element = certificateRef.current;
      
      // Render the HTML element as a high-res canvas (scale 2 for sharpness, CORS true, logging false)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc', // matching slate-50
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 landscape sizing: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Fit canvas image directly onto the A4 landscape sheet
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

      {/* Verification Registry Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10 mb-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase">Credential Registry</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-900/30 text-emerald-400 text-xs font-bold rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Registry Status: ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Verification Card */}
      <main className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Verification Status Banner */}
        <div className="w-full max-w-[1123px] bg-slate-900/40 border border-slate-900 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/20 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block font-sans">System Registry Check</span>
              <h2 className="text-xl font-bold text-white font-sans">CREDENTIAL VERIFIED & AUTHENTIC</h2>
              <p className="text-slate-400 text-xs mt-0.5 font-sans">This certificate record has been matched with our secure database registry.</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01] transition-all shrink-0 cursor-pointer"
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

        {/* Certificate Scroll Wrapper */}
        <div className="w-full max-w-[1123px] overflow-x-auto pb-6">
          {/* Certificate Fixed Sized A4 Landscape Container */}
          <div 
            ref={certificateRef}
            className="w-[1123px] h-[794px] bg-slate-50 border-[24px] border-double border-[#0f172a] p-16 relative flex flex-col justify-between overflow-hidden text-[#0f172a] shadow-2xl shrink-0 select-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {/* Elegant Inner Accent Line */}
            <div className="absolute inset-2 border border-amber-500/40 pointer-events-none" />

            {/* Top Section: Header & Partnership */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0f172a] rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-widest text-[#0f172a] block">VERAFORGE</span>
                  <span className="text-[7px] text-[#0f172a]/70 font-bold tracking-[0.25em] uppercase block font-sans">Virtual Internship Security Portal</span>
                </div>
              </div>
              <div className="text-right max-w-xs font-sans">
                <p className="text-[8px] text-slate-500 font-extrabold leading-normal uppercase tracking-wider">
                  In academic collaboration with the<br />Higher Education Innovation Council
                </p>
              </div>
            </div>

            {/* Middle Section: Recipient & Core Message */}
            <div className="text-center z-10 flex flex-col justify-center items-center my-auto">
              <h2 className="font-extrabold text-xs text-amber-600/90 tracking-[0.45em] uppercase mb-4 font-sans">
                Certificate of Completion
              </h2>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest font-sans font-medium mb-1">
                This document is proudly awarded to
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#0f172a] my-4 italic tracking-wide">
                {student.fullName}
              </h1>
              <p className="text-slate-500 text-xs tracking-widest uppercase font-sans mb-5">
                for successfully completing the virtual internship program in
              </p>
              <h3 className="text-2xl font-bold font-sans text-indigo-950 uppercase tracking-wider mb-6">
                {trackName}
              </h3>
              <p className="text-slate-650 text-sm font-light max-w-2xl leading-relaxed">
                During this program, the candidate demonstrated exceptional technical proficiency, problem-solving capabilities, and a commitment to professional excellence by completing all required enterprise-grade architecture tasks.
              </p>
            </div>

            {/* Bottom Section: Signatures & Gold Seal */}
            <div className="flex justify-between items-end z-10 border-t border-slate-200/80 pt-6">
              {/* Left Signature (Director) */}
              <div className="w-1/3 text-left">
                {/* Director Signature Scribble */}
                <svg className="w-36 h-12 text-indigo-900/70 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 30 C 25 15, 35 45, 55 25 C 75 5, 95 45, 115 25 C 125 15, 130 35, 140 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25 25 C 45 15, 65 35, 95 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-slate-300 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-slate-500 font-bold tracking-widest uppercase font-sans block">Program Director</span>
              </div>

              {/* Gold Seal Center */}
              <div className="flex flex-col items-center justify-center relative -mb-4">
                <div className="relative flex items-center justify-center shrink-0">
                  {/* CSS gold seal jagged outer border */}
                  <div 
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-600 border border-yellow-600/30 shadow-lg pointer-events-none" 
                    style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} 
                  />
                  {/* Gold Seal inner circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border border-yellow-600/40 flex flex-col items-center justify-center shadow-md relative z-10">
                    <ShieldCheck className="w-8 h-8 text-amber-950" />
                    <span className="text-[5px] text-amber-950 font-black tracking-widest uppercase mt-0.5 block font-sans">VERIFIED</span>
                  </div>
                </div>
                <span className="text-[7px] text-amber-700 font-extrabold tracking-widest uppercase mt-2.5 block font-sans">Official Seal</span>
              </div>

              {/* Right Signature (Gaurav Kumar Yadav) */}
              <div className="w-1/3 text-right flex flex-col items-end">
                {/* Gaurav Signature Scribble */}
                <svg className="w-36 h-12 text-indigo-900/70 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 25 C 35 5, 25 45, 55 15 C 85 -15, 65 55, 95 25 C 125 -5, 115 45, 135 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M45 30 C 65 25, 85 35, 115 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-slate-300 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-slate-500 font-bold tracking-widest uppercase font-sans block">Gaurav Kumar Yadav</span>
                <span className="text-[6px] text-slate-400 font-semibold font-sans block">Lead Educator & Platform Architect, VeraForge</span>
              </div>
            </div>

            {/* Verification Footer Link */}
            <div className="absolute bottom-4 inset-x-0 flex justify-between px-16 text-[8px] text-slate-450 font-sans z-10">
              <div>
                Certificate ID: <span className="font-mono text-slate-600">{certificate.certificateId}</span>
              </div>
              <div className="text-right">
                To verify the authenticity of this document, visit <span className="font-semibold text-indigo-900">veraforge.com/verify/{certificate.certificateId.slice(0, 8)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-4 mt-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors font-sans"
          >
            <Home className="w-3.5 h-3.5" />
            VeraForge Home
          </Link>
          <span className="text-slate-800">|</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Internship Dashboard
          </Link>
        </div>

      </main>
    </div>
  );
}
