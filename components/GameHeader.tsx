'use client';

import { useState, useEffect } from 'react';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function GameHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      
      // Trigger ghost speech based on section
      const messages: Record<string, string> = {
        home: GHOST_MESSAGES.nav.home,
        about: GHOST_MESSAGES.nav.about,
        skills: GHOST_MESSAGES.nav.skills,
        projects: GHOST_MESSAGES.nav.projects,
        experience: GHOST_MESSAGES.nav.experience,
        contact: GHOST_MESSAGES.nav.contact,
      };
      
      if (messages[sectionId]) {
        ghostSpeak(messages[sectionId]);
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: '◆' },
    { id: 'about', label: 'ABOUT', icon: '●' },
    { id: 'skills', label: 'SKILLS', icon: '▲' },
    { id: 'projects', label: 'PROJECTS', icon: '■' },
    { id: 'experience', label: 'EXP', icon: '★' },
    { id: 'contact', label: 'CONTACT', icon: '►' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 transition-all duration-400"
      style={{
        background: 'rgba(8, 8, 8, 0.75)',
        backdropFilter: scrolled ? 'blur(28px)' : 'blur(20px)',
        WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.07)',
        padding: '14px 0',
        zIndex: 100,
        transition: 'all 0.4s ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo/Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded transition-all duration-300 cursor-pointer"
              style={{
                background: logoHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: logoHovered ? '0 0 12px rgba(255, 255, 255, 0.1)' : 'none',
                transform: logoHovered ? 'rotate(10deg)' : 'rotate(0deg)'
              }}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <span className="text-white font-bold text-lg sm:text-xl">&lt;/&gt;</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span 
                className="text-white font-mono text-base sm:text-lg font-bold"
                style={{ letterSpacing: '0.15em' }}
              >
                PORTFOLIO
              </span>
              <div 
                className="w-24 sm:w-32 mt-1 rounded-full overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.25)',
                  height: '1px'
                }}
              >
                <div className="h-full w-full bg-white animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden lg:flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-mono font-bold px-3 py-2 relative transition-all duration-200"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  textShadow: activeSection === item.id ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.5)';
                  const icon = e.currentTarget.querySelector('.nav-icon') as HTMLElement;
                  if (icon) icon.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.textShadow = 'none';
                  }
                  const icon = e.currentTarget.querySelector('.nav-icon') as HTMLElement;
                  if (icon && activeSection !== item.id) icon.style.opacity = '0.4';
                }}
              >
                <span 
                  className="mr-1 nav-icon transition-opacity duration-200" 
                  style={{ opacity: activeSection === item.id ? '1' : '0.4' }}
                >
                  {item.icon}
                </span>
                {item.label}
                {/* Active indicator - white dot below */}
                {activeSection === item.id && (
                  <span 
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      bottom: '-6px',
                      width: '2px',
                      height: '2px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)'
                    }}
                  ></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Side - Stats/Info */}
          <div className="hidden md:flex items-center" style={{ gap: '8px' }}>
            {/* Level Badge */}
            <div 
              className="flex items-center rounded transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '5px 12px',
                gap: '6px'
              }}
            >
              <span 
                className="font-mono" 
                style={{ 
                  fontSize: '11px', 
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.8)' 
                }}
              >
                LVL
              </span>
              <span 
                className="font-mono font-bold" 
                style={{ 
                  fontSize: '14px',
                  color: '#ffffff' 
                }}
              >
                99
              </span>
            </div>

            {/* Time Display */}
            <div 
              className="hidden lg:block rounded transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '5px 12px'
              }}
            >
              <span 
                className="font-mono" 
                style={{ 
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.8)' 
                }}
              >
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            {/* Status Indicator */}
            <div 
              className="hidden lg:flex items-center rounded transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '5px 12px',
                gap: '6px'
              }}
            >
              <div 
                className="rounded-full"
                style={{
                  width: '6px',
                  height: '6px',
                  background: '#ffffff',
                  animation: 'onlinePulse 2s ease-in-out infinite'
                }}
              ></div>
              <span 
                className="font-mono" 
                style={{ 
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
                }}
              >
                ONLINE
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden transition-colors p-2"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav 
            className="lg:hidden mt-4 pb-4"
            style={{ 
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(8, 8, 8, 0.97)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 font-mono font-bold tracking-wider transition-all text-left rounded"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '13px',
                    color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                    textShadow: activeSection === item.id ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none'
                  }}
                >
                  <span className="mr-2" style={{ opacity: activeSection === item.id ? '1' : '0.4' }}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Stats */}
            <div className="flex items-center justify-between mt-4 px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-mono text-xs" style={{ color: '#ffffff' }}>ONLINE</span>
              </div>
              <div className="font-mono text-xs" style={{ color: '#ffffff' }}>
                LVL <span className="font-bold">99</span>
              </div>
              <span className="font-mono text-xs" style={{ color: '#ffffff' }}>
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </nav>
        )}
      </div>

      <style jsx>{`
        @keyframes onlinePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.7;
          }
        }
      `}</style>
    </header>
  );
}
