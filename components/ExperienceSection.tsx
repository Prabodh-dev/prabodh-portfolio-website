'use client';

import { Experience } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ghostSpeak, randomMessage, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => setExperiences(data.sort((a: Experience, b: Experience) => a.order - b.order)));
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay for seamless fog transition */}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs">QUEST_LOG.DAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase">
            {'['} Experience {']'}
          </h2>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className="mission-card p-4 sm:p-6"
              onMouseEnter={() => ghostSpeak(randomMessage(GHOST_MESSAGES.experience.hover))}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {exp.logo && (
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 game-card overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={exp.organization}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 
                      className="text-lg sm:text-xl font-bold text-white font-mono uppercase break-words"
                      onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.experience.company)}
                    >
                      {exp.title}
                    </h3>
                    <p 
                      className="text-base sm:text-lg text-white font-mono break-words"
                      onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.experience.company)}
                    >
                      @ {exp.organization}
                    </p>
                  </div>
                  
                  <div 
                    className="game-card px-3 py-1 inline-block mb-3"
                    onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.experience.timeline)}
                  >
                    <span className="text-xs sm:text-sm text-white font-mono">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-xs font-mono mb-1">
                      <span className="text-white/80">XP</span>
                      <div className="flex-1 max-w-xs"></div>
                      <span className="text-white">MAX</span>
                    </div>
                    <div className="xp-bar h-2 max-w-xs">
                      <div className="xp-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="game-card px-2 py-1 self-start">
                  <span className="text-white font-mono text-xs">
                    #{String(experiences.length - index).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-white font-mono">{experiences.length}</div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Quests</div>
          </div>
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-white font-mono">{experiences.length}</div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Completed</div>
          </div>
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-white font-mono">100%</div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Success</div>
          </div>
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-white font-mono">MAX</div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Level</div>
          </div>
        </div>
      </div>
    </section>
  );
}
