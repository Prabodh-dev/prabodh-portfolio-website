'use client';

import { AboutContent } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function AboutSection() {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  if (!content) return null;

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay for seamless fog transition */}
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs">PROFILE_DATA.SYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase">
            {'<'} About Me {'/>'} 
          </h2>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Main description */}
          <div 
            className="game-card p-4 sm:p-6"
            onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.about.card)}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/20">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
              <span className="text-white font-mono text-xs">summary.txt</span>
            </div>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-mono break-words">
              {content.summary}
            </p>
          </div>
          
          {content.detailed && (
            <div 
              className="mission-card p-4 sm:p-6"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.about.card)}
            >
              <span className="text-white font-mono text-xs uppercase block mb-3">Details</span>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-mono break-words">
                {content.detailed}
              </p>
            </div>
          )}
          
          {/* Stats display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div 
              className="game-card p-4 sm:p-6"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.about.stats)}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-white/10"></div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono uppercase">
                  Education
                </h3>
              </div>
              <p className="text-white/80 font-mono text-xs sm:text-sm break-words">
                {content.education}
              </p>
              <div className="mt-3">
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: '100%' }}></div>
                </div>
                <span className="text-white text-xs font-mono mt-1 block">Completed</span>
              </div>
            </div>
            
            <div 
              className="game-card p-4 sm:p-6"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.about.stats)}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-white/10"></div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono uppercase">
                  Current Focus
                </h3>
              </div>
              <p className="text-white/80 font-mono text-xs sm:text-sm break-words">
                {content.currentFocus}
              </p>
              <div className="mt-3">
                <div className="xp-bar">
                  <div className="xp-bar-fill" style={{ width: '85%' }}></div>
                </div>
                <span className="text-white/80 text-xs font-mono mt-1 block">In Progress: 85%</span>
              </div>
            </div>
          </div>
          
          {content.personalStatement && (
            <div 
              className="mission-card p-4 sm:p-6"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.about.card)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/20 flex items-center justify-center bg-retro-dark/50">
                  <span className="text-white text-lg sm:text-xl">💬</span>
                </div>
                <div className="flex-1">
                  <span className="text-white text-xs font-mono uppercase block mb-2">Statement</span>
                  <p className="text-base sm:text-lg font-mono text-white break-words leading-relaxed">
                    {content.personalStatement}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
