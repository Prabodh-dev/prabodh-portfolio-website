'use client';

import { SkillCategory } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import { ghostSpeak, randomMessage, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function SkillsSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setCategories(data.sort((a: SkillCategory, b: SkillCategory) => a.order - b.order)));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay for seamless fog transition */}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs">SKILL_TREE.DAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase">
            {'['} Skills & Expertise {']'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category, catIndex) => (
            <div key={category.id} className="game-card p-4 sm:p-6">
              {/* Header */}
              <div 
                className="flex items-center justify-between mb-4 pb-3 border-b border-white/20"
                onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.skills.category)}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white/20 flex items-center justify-center bg-retro-dark/50">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {String.fromCharCode(65 + catIndex)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono uppercase">
                    {category.name}
                  </h3>
                </div>
                <span className="text-white font-mono text-xs">LV {90 + catIndex * 2}</span>
              </div>
              
              {/* Skills */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => {
                  const proficiency = skillIndex % 2 === 0 ? 99 : 98;
                  return (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span 
                          className="px-2 sm:px-3 py-1 bg-retro-dark/60 text-white/80 font-mono text-xs sm:text-sm border border-white/20 hover:border-white/40 hover:text-white transition-all cursor-pointer"
                          onMouseEnter={() => ghostSpeak(randomMessage(GHOST_MESSAGES.skills.hover))}
                        >
                          {skill.name}
                        </span>
                        <span className="text-white font-mono text-xs ml-2">{proficiency}%</span>
                      </div>
                      <div 
                        className="stat-bar h-1.5"
                        onMouseEnter={() => ghostSpeak(randomMessage(GHOST_MESSAGES.skills.hover))}
                      >
                        <div 
                          className="stat-bar-fill" 
                          style={{ 
                            width: `${proficiency}%`,
                            animationDelay: `${skillIndex * 0.1}s` 
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Bottom stats */}
              <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-xs font-mono text-white/80">
                <span>Total: {category.skills.length}</span>
                <span className="text-white">Playing: {category.skills.length}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4">
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">
              {categories.reduce((sum, cat) => sum + cat.skills.length, 0)}
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Total Skills</div>
          </div>
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">
              {categories.length}
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Categories</div>
          </div>
          <div className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">
              99
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Level</div>
          </div>
        </div>
      </div>
    </section>
  );
}
