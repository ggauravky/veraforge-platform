'use client';

import React, { useRef, useState } from 'react';
import { 
  Shield, Award, CheckCircle2, Download, Home, ArrowLeft, Loader2, ShieldCheck, ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import VeraForgeLogo from '@/components/VeraForgeLogo';

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
    setDownloading(true);
    try {
      const element = document.getElementById('certificate-render-canvas');
      if (!element) throw new Error('Render canvas not found');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#060a12'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`VeraForge_Certificate_${certificate.certificateId}.pdf`);
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
      <header className="border-b border-cyber-navy-light/35 bg-cyber-navy-dark/80 backdrop-blur-md relative z-10 mb-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2.5 bg-cyber-navy-dark/80 border border-cyber-navy-light/40 rounded-xl shadow-lg">
              <VeraForgeLogo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white">VERAFORGE</span>
              <span className="block text-[8px] text-electric-cyan font-bold tracking-[0.2em] uppercase text-cyan-glow">VIRTUAL INTERNSHIP SECURITY PORTAL</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-electric-cyan/15 border border-electric-cyan/20 text-electric-cyan text-xs font-bold rounded-full shadow-[0_0_10px_rgba(0,255,255,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
              </span>
              Registry Status: ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Verification Card */}
      <main className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Verification Status Banner */}
        <div className="w-full max-w-[1123px] glass-panel rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-cyber-navy-light/45">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-electric-cyan/15 border border-electric-cyan/20 rounded-2xl shadow-[0_0_10px_rgba(0,255,255,0.05)]">
              <CheckCircle2 className="w-8 h-8 text-electric-cyan text-cyan-glow" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-electric-cyan uppercase tracking-widest block font-sans text-cyan-glow">System Registry Check</span>
              <h2 className="text-xl font-bold text-white font-sans">CREDENTIAL VERIFIED & AUTHENTIC</h2>
              <p className="text-slate-400 text-xs mt-0.5 font-sans">This certificate record has been matched with our secure database registry.</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-electric-cyan hover:bg-electric-cyan/85 disabled:bg-electric-cyan/50 text-cyber-navy-dark font-extrabold text-sm rounded-xl hover:shadow-lg hover:shadow-electric-cyan/25 hover:scale-[1.01] transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.15)]"
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
            id="certificate-render-canvas"
            className="w-[1123px] h-[794px] bg-[#fcfbf7] border-[16px] border-double border-[#0b1e36] p-16 relative flex flex-col justify-between overflow-hidden text-[#1a2e40] shadow-2xl shrink-0 select-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {/* Transparent HEIC Seal Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <svg className="w-[500px] h-[500px] text-[#0b1e36] opacity-[0.03]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4"/>
                <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1"/>
                <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="1"/>
                <path d="M 200 40 L 250 140 L 360 140 L 270 210 L 310 320 L 200 250 L 90 320 L 130 210 L 40 140 L 150 140 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                <text x="200" y="195" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" fontFamily="serif" letterSpacing="1.5">HIGHER EDUCATION</text>
                <text x="200" y="210" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" fontFamily="serif" letterSpacing="1.5">INNOVATION COUNCIL</text>
              </svg>
            </div>

            {/* Gold Accent Inner Border */}
            <div className="absolute inset-4 border border-[#d4af37] pointer-events-none z-0" />

            {/* Top Section: Header & Partnership */}
            <div className="flex justify-between items-start z-10 font-sans">
              <div className="flex items-center gap-2 text-left">
                <div className="p-1.5 bg-[#0b1e36] rounded-md text-white">
                  <VeraForgeLogo className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm tracking-wider text-[#0b1e36] block">VERAFORGE</span>
                  <span className="text-[7px] text-[#c5a059] font-bold tracking-wider uppercase block font-sans">Identity Certification & Audit Portal</span>
                </div>
              </div>
              <div className="text-right max-w-xs font-sans">
                <p className="text-[7.5px] text-[#55697d] font-bold leading-normal uppercase tracking-wider">
                  In academic partnership with the<br />Higher Education Innovation Council
                </p>
              </div>
            </div>

            {/* Middle Section: Recipient & Core Message */}
            <div className="text-center z-10 flex flex-col justify-center items-center my-auto px-10">
              <h2 className="font-extrabold text-[10px] text-[#c5a059] tracking-[0.35em] uppercase mb-5 font-sans">
                VERIFIED SECURITY PLATFORM REGISTRY
              </h2>
              <h1 className="text-3xl font-serif font-bold text-[#0b1e36] tracking-[0.1em] uppercase mb-6 border-b border-[#d4af37]/30 pb-4 w-full max-w-2xl">
                CERTIFICATE OF ARCHITECTURAL COMPLETION
              </h1>
              <p className="text-[11px] text-[#55697d] uppercase tracking-widest font-sans font-semibold mb-3">
                This is to certify that
              </p>
              <h2 className="text-4xl font-serif font-black text-[#0b1e36] mb-4 italic tracking-wide">
                {student.fullName}
              </h2>
              <p className="text-[#55697d] text-xs font-sans leading-relaxed max-w-3xl">
                has successfully executed the technical directives of the <strong className="text-[#0b1e36] font-extrabold font-sans uppercase tracking-wider">{trackName}</strong> Virtual Internship, completing all advanced milestone architectures.
              </p>
            </div>

            {/* Bottom Section: Signatures & Holographic Seal */}
            <div className="flex justify-between items-end z-10 border-t border-[#0b1e36]/15 pt-5">
              {/* Left Signature (Director) */}
              <div className="w-1/3 text-left">
                {/* Director Signature Scribble */}
                <svg className="w-36 h-12 text-[#0b1e36]/80 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 30 C 25 15, 35 45, 55 25 C 75 5, 95 45, 115 25 C 125 15, 130 35, 140 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25 25 C 45 15, 65 35, 95 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-[#0b1e36]/20 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-[#55697d] font-bold tracking-wider uppercase font-sans block">Director of Global Operations</span>
              </div>
 
              {/* Holographic Seal Center */}
              <div className="flex flex-col items-center justify-center relative -mb-4">
                <div className="relative flex items-center justify-center shrink-0">
                  {/* CSS gold seal jagged outer border */}
                  <div 
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 border border-amber-500 shadow-md animate-pulse" 
                    style={{ clipPath: 'polygon(50% 0%, 64% 18%, 85% 9%, 82% 32%, 99% 38%, 88% 59%, 95% 82%, 73% 79%, 68% 99%, 50% 88%, 32% 99%, 27% 79%, 5% 82%, 12% 59%, 1% 38%, 18% 32%, 15% 9%, 36% 18%)' }} 
                  />
                  {/* Gold Seal inner circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fcfbf7] to-[#e8e4d9] border border-[#d4af37] flex flex-col items-center justify-center shadow-inner relative z-10">
                    <ShieldCheck className="w-8 h-8 text-[#0b1e36]" />
                    <span className="text-[6px] text-[#0b1e36] font-black tracking-wider uppercase mt-0.5 block font-sans">SECURED</span>
                  </div>
                </div>
                <span className="text-[7px] text-[#c5a059] font-extrabold tracking-widest uppercase mt-2.5 block font-sans">Gold Metallic Seal</span>
              </div>
 
              {/* Right Signature (Gaurav Kumar Yadav) */}
              <div className="w-1/3 text-right flex flex-col items-end">
                {/* Gaurav Signature Scribble */}
                <svg className="w-36 h-12 text-[#0b1e36]/80 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 25 C 35 5, 25 45, 55 15 C 85 -15, 65 55, 95 25 C 125 -5, 115 45, 135 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M45 30 C 65 25, 85 35, 115 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-[#0b1e36]/20 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-[#55697d] font-bold tracking-wider uppercase font-sans block">Gaurav Kumar Yadav</span>
                <span className="text-[6px] text-[#718596] font-semibold font-sans block">Lead Educator & Platform Architect, VeraForge</span>
              </div>
            </div>
 
            {/* Verification Footer Link */}
            <div className="absolute bottom-4 inset-x-0 text-center text-[7.5px] text-[#718596] font-sans z-10 tracking-wider">
              Certificate ID: {certificate.certificateId} | Verify live at veraforge.com/verify/{certificate.certificateId}
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-4 mt-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-electric-cyan transition-colors font-sans"
          >
            <Home className="w-3.5 h-3.5" />
            VeraForge Home
          </Link>
          <span className="text-cyber-navy-light/40">|</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-electric-cyan transition-colors font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Internship Dashboard
          </Link>
        </div>

      </main>
    </div>
  );
}
