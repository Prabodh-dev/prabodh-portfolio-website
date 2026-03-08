'use client';

import { HeroContent } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function HeroSection() {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  if (!content) return null;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 retro-grid relative overflow-hidden" style={{ zIndex: 2 }}>
      {/* Removed scanlines class - it was blocking content with z-index */}
      
      {/* Corner brackets - WHITE */}
      <div className="hidden md:block absolute top-32 left-8 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-white/30 pointer-events-none z-10"></div>
      <div className="hidden md:block absolute top-32 right-8 w-12 h-12 md:w-16 md:h-16 border-r-2 border-t-2 border-white/30 pointer-events-none z-10"></div>
      <div className="hidden md:block absolute bottom-20 left-8 w-12 h-12 md:w-16 md:h-16 border-l-2 border-b-2 border-white/30 pointer-events-none z-10"></div>
      <div className="hidden md:block absolute bottom-20 right-8 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-white/30 pointer-events-none z-10"></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            {/* Player Status */}
            <div className="neon-box px-3 sm:px-4 py-2 inline-flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-ghost-glow"></div>
              <span className="text-white font-mono text-xs uppercase">Player Online</span>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight neon-text font-mono uppercase tracking-wider"
                style={{ whiteSpace: 'nowrap', overflowWrap: 'normal' }}
                onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.name)}
              >
                {content.name}
              </h1>
              <p 
                className="text-lg sm:text-xl md:text-2xl text-white/80 font-mono break-words"
                onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.subtitle)}
              >
                {'>'} {content.role}
              </p>
              
              {/* XP Bar - WHITE */}
              <div 
                className="flex items-center gap-2 pt-2"
                onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.levelBar)}
              >
                <span className="text-white/60 font-mono text-xs whitespace-nowrap">LV 99</span>
                <div className="flex-1 max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-pulse" style={{ width: '100%' }}></div>
                </div>
                <span className="text-white font-mono text-xs">MAX</span>
              </div>
            </div>
            
            <div 
              className="neon-box-pink p-3 sm:p-4 border-l-2 border-white/40"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.quest)}
            >
              <span className="text-white/60 font-mono text-xs uppercase block mb-2">Active Quest</span>
              <p className="text-sm sm:text-base text-white font-mono leading-relaxed break-words">
                {content.tagline}
              </p>
            </div>
            
            <div 
              className="neon-box p-3 sm:p-4"
              onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.bio)}
            >
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-mono break-words">
                {content.description}
              </p>
            </div>
            
            {/* Action Buttons - Glass morphism */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              {content.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  onClick={() => {
                    if (button.label.toLowerCase().includes('github')) {
                      ghostSpeak(GHOST_MESSAGES.home.github);
                    } else if (button.label.toLowerCase().includes('linkedin')) {
                      ghostSpeak(GHOST_MESSAGES.home.linkedin);
                    } else if (button.label.toLowerCase().includes('project')) {
                      ghostSpeak(GHOST_MESSAGES.home.viewProjects);
                    }
                  }}
                  className={`px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                    button.type === 'primary'
                      ? 'bg-white text-black font-bold hover:bg-white/90 shadow-ghost-glow'
                      : 'retro-btn text-white hover:bg-white/15'
                  }`}
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 md:mt-0">
            {content.profileImage ? (
              <div 
                className="relative w-full max-w-xs sm:max-w-sm aspect-square neon-box overflow-visible group"
                onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.home.photo)}
              >
                {/* Floating ghost particles around the frame */}
                <div className="absolute -inset-8 pointer-events-none">
                  {/* Top-left ghost orb */}
                  <div 
                    className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full opacity-40 animate-float"
                    style={{ 
                      boxShadow: '0 0 20px rgba(255,255,255,0.6)',
                      animationDelay: '0s',
                      animationDuration: '3s'
                    }}
                  />
                  {/* Top-right ghost orb */}
                  <div 
                    className="absolute top-4 right-0 w-2 h-2 bg-white rounded-full opacity-30 animate-float"
                    style={{ 
                      boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                      animationDelay: '1s',
                      animationDuration: '4s'
                    }}
                  />
                  {/* Bottom-left ghost orb */}
                  <div 
                    className="absolute bottom-4 left-2 w-2.5 h-2.5 bg-white rounded-full opacity-35 animate-float"
                    style={{ 
                      boxShadow: '0 0 18px rgba(255,255,255,0.5)',
                      animationDelay: '2s',
                      animationDuration: '3.5s'
                    }}
                  />
                  {/* Bottom-right ghost orb */}
                  <div 
                    className="absolute bottom-0 right-4 w-3 h-3 bg-white rounded-full opacity-40 animate-float"
                    style={{ 
                      boxShadow: '0 0 20px rgba(255,255,255,0.6)',
                      animationDelay: '1.5s',
                      animationDuration: '4s'
                    }}
                  />
                </div>

                {/* Ghostly glow pulse on hover */}
                <div className="absolute -inset-1 bg-white/10 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />

                {/* Main image container with subtle float */}
                <div className="relative w-full h-full overflow-hidden animate-float" style={{ animationDuration: '6s' }}>
                  {/* Top overlay */}
                  <div className="absolute top-0 left-0 right-0 z-20 p-2 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex justify-between items-center text-white/80 font-mono text-xs">
                      <span className="animate-pulse">IMG_001</span>
                      <span className="text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        REC
                      </span>
                    </div>
                  </div>
                  
                  <Image
                    src={content.profileImage}
                    alt={content.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Animated ghostly overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Floating ghost wisp effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div 
                      className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/20 rounded-full blur-2xl"
                      style={{ animation: 'float 4s ease-in-out infinite' }}
                    />
                    <div 
                      className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/15 rounded-full blur-3xl"
                      style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}
                    />
                  </div>

                  {/* Scanline effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                    }}
                  />
                  
                  {/* Bottom stats - WHITE with ghost glow */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                      <div>
                        <div className="text-white/60 uppercase">STR</div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-1000 group-hover:shadow-ghost-glow" 
                            style={{ width: '95%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 uppercase">INT</div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-1000 group-hover:shadow-ghost-glow" 
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 uppercase">DEX</div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-1000 group-hover:shadow-ghost-glow" 
                            style={{ width: '90%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xs sm:max-w-sm aspect-square neon-box bg-retro-gray flex items-center justify-center">
                <p className="text-white font-mono text-sm">PROFILE_IMAGE.JPG</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
