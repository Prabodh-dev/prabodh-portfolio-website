'use client';

import { ResumeContent } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function ResumeSection() {
  const [resume, setResume] = useState<ResumeContent | null>(null);

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => setResume(data));
  }, []);

  return (
    <section id="resume" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay for seamless fog transition */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
          <span className="text-white font-mono text-xs">DOWNLOAD.EXE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 neon-text font-mono uppercase">
          {'<'} Resume {'/>'} 
        </h2>
        
        <div className="game-card p-4 sm:p-6 md:p-8">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 border-b border-white/20">
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
            <span className="ml-2 text-white font-mono text-xs">resume.pdf</span>
          </div>
          
          <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 font-mono break-words">
            Download complete resume with background, skills & experience
          </p>
          
          {resume?.fileName ? (
            <div className="space-y-4">
              <a
                href="/resume.pdf"
                download
                onClick={() => ghostSpeak(GHOST_MESSAGES.home.downloadResume)}
                className="inline-flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-mono font-bold uppercase text-sm sm:text-base hover:bg-white/90 transition-all shadow-ghost-glow"
              >
                <span>Download Resume</span>
                <span className="text-lg sm:text-xl">↓</span>
              </a>
              
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono">
                <div className="game-card px-3 py-1">
                  <span className="text-white">TYPE: </span>
                  <span className="text-white/80">PDF</span>
                </div>
                <div className="game-card px-3 py-1">
                  <span className="text-white">UPDATED: </span>
                  <span className="text-white/80">
                    {resume.uploadDate ? new Date(resume.uploadDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="h-2 max-w-xs mx-auto bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-pulse" style={{ width: '100%' }}></div>
                </div>
                <p className="text-white font-mono text-xs mt-2">File Ready</p>
              </div>
            </div>
          ) : (
            <div className="game-card px-4 sm:px-6 py-3 sm:py-4 inline-block">
              <p className="text-white/80 font-mono text-xs sm:text-sm">
                Resume not available. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
