'use client';

import { FooterContent } from '@/types/portfolio';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [footer, setFooter] = useState<FooterContent | null>(null);

  useEffect(() => {
    fetch('/api/footer')
      .then(res => res.json())
      .then(data => setFooter(data));
  }, []);

  if (!footer) return null;

  return (
    <footer className="retro-grid border-t-2 border-white/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Changed to-retro-dark to transparent for seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-transparent pointer-events-none"></div>
      
      {/* Top decorative line with animated glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-0"></div>
      
      {/* Corner brackets - hidden on mobile to prevent overlap */}
      <div className="hidden md:block absolute top-4 left-4 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-white/20 z-0"></div>
      <div className="hidden md:block absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-white/20 z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand/About */}
          <div>
            <div className="game-card px-3 sm:px-4 py-2 inline-block mb-3 sm:mb-4">
              <p className="font-mono text-base sm:text-lg text-white neon-text">{footer.text}</p>
            </div>
            {/* Status indicators */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="w-2 h-2 bg-white/10 rounded-full animate-pulse"></div>
                <span className="text-white">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="w-2 h-2 bg-white/10"></div>
                <span className="text-white/80">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-white/10"></div>
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-sm sm:text-base">Quick Links</h3>
            </div>
            <div className="space-y-2">
              {footer.quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.link}
                  className="block text-white/80 hover:text-white transition-colors font-mono text-xs sm:text-sm group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-white transition-transform group-hover:translate-x-1">▸</span>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Social Connect */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-white/10"></div>
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-sm sm:text-base">Connect</h3>
            </div>
            <div className="space-y-2">
              {footer.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-xs sm:text-sm group"
                >
                  <div className="game-card px-3 py-2 inline-flex items-center gap-2 hover:shadow-neon-purple transition-all">
                    <span className="text-white">◆</span>
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      {link.platform}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Divider with stats */}
        <div className="border-t border-white/20 pt-4 sm:pt-6 mt-4 sm:mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Copyright */}
            <div className="text-white/80 font-mono text-xs sm:text-sm text-center md:text-left">
              <span className="text-white">{'>'}</span> {footer.copyright}
            </div>
            
            {/* Game-style stats */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-mono">
              <div className="game-card px-2 sm:px-3 py-1">
                <span className="text-white">BUILD: </span>
                <span className="text-white/80">{new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}</span>
              </div>
              <div className="game-card px-2 sm:px-3 py-1">
                <span className="text-white">VER: </span>
                <span className="text-white/80">2.0.0</span>
              </div>
              <div className="game-card px-2 sm:px-3 py-1 flex items-center gap-2">
                <div className="w-2 h-2 bg-white/10 rounded-full quest-indicator"></div>
                <span className="text-white">STABLE</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar decoration */}
          <div className="mt-3 sm:mt-4">
            <div className="xp-bar h-1">
              <div className="xp-bar-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative text */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-white/60 font-mono text-xs">
            <span className="text-white">{'>'}</span> Crafted with passion & pixels <span className="text-white">{'<3'}</span>
          </p>
        </div>
      </div>
      
      {/* Bottom corner brackets - hidden on mobile to prevent overlap */}
      <div className="hidden md:block absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-white/20 z-0"></div>
      <div className="hidden md:block absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-white/20 z-0"></div>
    </footer>
  );
}
