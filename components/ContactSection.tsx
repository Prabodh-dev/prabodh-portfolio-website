'use client';

import { ContactContent } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function ContactSection() {
  const [contact, setContact] = useState<ContactContent | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => setContact(data));
  }, []);

  if (!contact) return null;

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay and game-section class for consistency */}
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs sm:text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-white/10 rounded-full animate-pulse"></div>
              COMMUNICATION_LINK.SYS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase tracking-wider">
            {'<'} Get In Touch {'/>'} 
          </h2>
        </div>
        
        <div className="game-card p-4 sm:p-6 md:p-10 hover:shadow-neon-pink transition-all relative overflow-hidden">
          {/* HUD corner brackets - hidden on mobile to prevent overlap */}
          <div className="hidden md:block absolute top-4 left-4 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-white/20 z-0"></div>
          <div className="hidden md:block absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-white/20 z-0"></div>
          <div className="hidden md:block absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-white/20 z-0"></div>
          <div className="hidden md:block absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-white/20 z-0"></div>
          
          {/* Contact info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 relative z-10">
            {contact.email && (
              <div className="mission-card group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/20 flex items-center justify-center flex-shrink-0 bg-retro-dark/50">
                    <span className="text-white text-lg sm:text-xl">@</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-2 font-mono uppercase tracking-wider">Email</h3>
                    <a 
                      href={`mailto:${contact.email}`}
                      onClick={() => ghostSpeak(GHOST_MESSAGES.contact.email)}
                      onMouseEnter={() => ghostSpeak(GHOST_MESSAGES.contact.email)}
                      className="text-white/80 hover:text-white transition-colors font-mono text-xs sm:text-sm break-all"
                    >
                      {contact.email}
                    </a>
                    {/* Status indicator */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/10 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-mono">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {contact.location && (
              <div className="mission-card group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/20 flex items-center justify-center flex-shrink-0 bg-retro-dark/50">
                    <span className="text-white text-lg sm:text-xl">📍</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-2 font-mono uppercase tracking-wider">Location</h3>
                    <p className="text-white/80 font-mono text-xs sm:text-sm">{contact.location}</p>
                    {/* Coordinates decoration */}
                    <div className="mt-2 text-white text-xs font-mono">
                      ZONE: {contact.location.split(',')[0]?.trim() || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Social links section */}
          <div className="border-t-2 border-white/20 pt-6 sm:pt-8 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-1 h-6 sm:h-8 bg-white/10"></div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono uppercase">Connect With Me</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => ghostSpeak(GHOST_MESSAGES.home.github)}
                  className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center text-white font-mono uppercase hover:text-white transition-all font-bold group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1">⚡</div>
                    <div className="text-[10px] sm:text-xs">GitHub</div>
                  </div>
                  {/* Progress bar decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-retro-dark">
                    <div className="h-full bg-white/10 transition-all duration-300 group-hover:w-full w-0"></div>
                  </div>
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => ghostSpeak(GHOST_MESSAGES.home.linkedin)}
                  className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center text-white font-mono uppercase hover:text-white transition-all font-bold group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1">💼</div>
                    <div className="text-[10px] sm:text-xs">LinkedIn</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-retro-dark">
                    <div className="h-full bg-white/10 transition-all duration-300 group-hover:w-full w-0"></div>
                  </div>
                </a>
              )}
              {contact.customLinks?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => ghostSpeak(`Checking out ${link.label}... 🔗`)}
                  className="game-card px-3 sm:px-4 py-2 sm:py-3 text-center text-white font-mono uppercase hover:text-white transition-all font-bold group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1">🔗</div>
                    <div className="text-[10px] sm:text-xs break-words">{link.label}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-retro-dark">
                    <div className="h-full bg-white/10 transition-all duration-300 group-hover:w-full w-0"></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Connection status bar */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-white/80">CONNECTION STATUS</span>
              <span className="text-white">ONLINE</span>
            </div>
            <div className="xp-bar h-2">
              <div className="xp-bar-fill" style={{ width: '100%' }}></div>
            </div>
            <div className="flex flex-wrap justify-between gap-2 mt-2 text-[10px] font-mono text-white/80">
              <span>LATENCY: 0ms</span>
              <span>BANDWIDTH: ∞</span>
              <span>UPTIME: 99.9%</span>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="game-card px-4 sm:px-6 py-2 inline-flex items-center gap-2 sm:gap-3">
            <span className="text-white text-xs font-mono">TRANSMISSION READY</span>
            <div className="w-2 h-2 bg-white/10 rounded-full quest-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
