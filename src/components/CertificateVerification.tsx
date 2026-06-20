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
            className="w-[1123px] h-[794px] bg-gradient-to-br from-[#060a12] to-[#0d1627] border-[24px] border-double border-cyber-navy-light p-16 relative flex flex-col justify-between overflow-hidden text-slate-100 shadow-2xl shrink-0 select-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {/* Transparent Neural Network Watermark */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Nodes */}
                <circle cx="150" cy="150" r="4" fill="#00ffff" />
                <circle cx="250" cy="200" r="3" fill="#00ffff" />
                <circle cx="200" cy="350" r="5" fill="#00ffff" />
                <circle cx="500" cy="180" r="4" fill="#00ffff" />
                <circle cx="550" cy="320" r="5" fill="#00ffff" />
                <circle cx="450" cy="450" r="3" fill="#00ffff" />
                <circle cx="800" cy="250" r="4" fill="#00ffff" />
                <circle cx="850" cy="400" r="3" fill="#00ffff" />
                <circle cx="750" cy="550" r="5" fill="#00ffff" />
                <circle cx="950" cy="300" r="4" fill="#00ffff" />
                <circle cx="900" cy="150" r="3" fill="#00ffff" />

                {/* Connections */}
                <line x1="150" y1="150" x2="250" y2="200" stroke="#00ffff" strokeWidth="1" />
                <line x1="250" y1="200" x2="200" y2="350" stroke="#00ffff" strokeWidth="1" />
                <line x1="200" y1="350" x2="450" y2="450" stroke="#00ffff" strokeWidth="1" />
                <line x1="500" y1="180" x2="550" y2="320" stroke="#00ffff" strokeWidth="1" />
                <line x1="550" y1="320" x2="450" y2="450" stroke="#00ffff" strokeWidth="1" />
                <line x1="500" y1="180" x2="800" y2="250" stroke="#00ffff" strokeWidth="1" />
                <line x1="800" y1="250" x2="850" y2="400" stroke="#00ffff" strokeWidth="1" />
                <line x1="850" y1="400" x2="750" y2="550" stroke="#00ffff" strokeWidth="1" />
                <line x1="800" y1="250" x2="950" y2="300" stroke="#00ffff" strokeWidth="1" />
                <line x1="950" y1="300" x2="900" y2="150" stroke="#00ffff" strokeWidth="1" />
                
                {/* Curved paths */}
                <path d="M 150 150 Q 300 100, 500 180" stroke="#00ffff" strokeWidth="0.8" fill="none" strokeDasharray="5,5" />
                <path d="M 550 320 Q 700 280, 800 250" stroke="#00ffff" strokeWidth="0.8" fill="none" strokeDasharray="5,5" />
                <path d="M 200 350 Q 500 250, 750 550" stroke="#00ffff" strokeWidth="0.8" fill="none" strokeDasharray="5,5" />
              </svg>
            </div>

            {/* Elegant Inner Accent Line */}
            <div className="absolute inset-2.5 border border-electric-cyan/20 pointer-events-none" />

            {/* Top Section: Header & Partnership */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-navy-dark border border-cyber-navy-light/60 rounded-lg">
                  <Shield className="w-6 h-6 text-electric-cyan" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-widest text-white block">VERAFORGE</span>
                  <span className="text-[7px] text-electric-cyan font-bold tracking-[0.25em] uppercase block font-sans text-cyan-glow">Virtual Internship Security Portal</span>
                </div>
              </div>
              <div className="text-right max-w-xs font-sans">
                <p className="text-[8px] text-slate-400 font-extrabold leading-normal uppercase tracking-wider">
                  In academic collaboration with the<br />Higher Education Innovation Council
                </p>
              </div>
            </div>

            {/* Middle Section: Recipient & Core Message */}
            <div className="text-center z-10 flex flex-col justify-center items-center my-auto">
              <h2 className="font-extrabold text-xs text-electric-cyan tracking-[0.45em] uppercase mb-4 font-sans text-cyan-glow">
                Certificate of Completion
              </h2>
              <p className="text-[11px] text-slate-450 uppercase tracking-widest font-sans font-medium mb-1">
                This document is proudly awarded to
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white my-4 italic tracking-wide">
                {student.fullName}
              </h1>
              <p className="text-slate-450 text-xs tracking-widest uppercase font-sans mb-5">
                for successfully completing the virtual internship program in
              </p>
              <h3 className="text-2xl font-bold font-sans text-electric-blue uppercase tracking-wider mb-6">
                {trackName}
              </h3>
              <p className="text-slate-350 text-sm font-light max-w-2xl leading-relaxed">
                During this program, the candidate demonstrated exceptional technical proficiency, problem-solving capabilities, and a commitment to professional excellence by completing all required enterprise-grade architecture tasks.
              </p>
            </div>

            {/* Bottom Section: Signatures & Holographic Seal */}
            <div className="flex justify-between items-end z-10 border-t border-cyber-navy-light/40 pt-6">
              {/* Left Signature (Director) */}
              <div className="w-1/3 text-left">
                {/* Director Signature Scribble */}
                <svg className="w-36 h-12 text-electric-blue/60 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 30 C 25 15, 35 45, 55 25 C 75 5, 95 45, 115 25 C 125 15, 130 35, 140 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25 25 C 45 15, 65 35, 95 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-cyber-navy-light/40 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase font-sans block">Program Board Director</span>
              </div>
 
              {/* Holographic Seal Center */}
              <div className="flex flex-col items-center justify-center relative -mb-4">
                <div className="relative flex items-center justify-center shrink-0">
                  {/* CSS holographic seal jagged outer border */}
                  <div 
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-electric-blue via-electric-cyan to-blue-500 border border-electric-cyan/35 shadow-lg pointer-events-none animate-pulse" 
                    style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} 
                  />
                  {/* Holographic Seal inner circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyber-navy-dark to-[#0f243b] border border-electric-cyan/40 flex flex-col items-center justify-center shadow-md relative z-10">
                    <ShieldCheck className="w-8 h-8 text-electric-cyan text-cyan-glow" />
                    <span className="text-[5px] text-electric-cyan font-black tracking-widest uppercase mt-0.5 block font-sans text-cyan-glow">SECURED</span>
                  </div>
                </div>
                <span className="text-[7px] text-electric-cyan font-extrabold tracking-widest uppercase mt-2.5 block font-sans text-cyan-glow">Verified Seal</span>
              </div>
 
              {/* Right Signature (Gaurav Kumar Yadav) */}
              <div className="w-1/3 text-right flex flex-col items-end">
                {/* Gaurav Signature Scribble */}
                <svg className="w-36 h-12 text-electric-cyan/60 -mb-2" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 25 C 35 5, 25 45, 55 15 C 85 -15, 65 55, 95 25 C 125 -5, 115 45, 135 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M45 30 C 65 25, 85 35, 115 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="h-[1px] bg-cyber-navy-light/40 w-40 mt-1 mb-1.5" />
                <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase font-sans block">Gaurav Kumar Yadav</span>
                <span className="text-[6px] text-slate-500 font-semibold font-sans block">Lead Educator & Platform Architect, VeraForge</span>
              </div>
            </div>
 
            {/* Verification Footer Link */}
            <div className="absolute bottom-4 inset-x-0 text-center text-[7px] text-slate-400 font-sans z-10 tracking-wider">
              Certificate ID: {certificate.certificateId} | Publicly verifiable at veraforge.com/verify/{certificate.certificateId}
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
