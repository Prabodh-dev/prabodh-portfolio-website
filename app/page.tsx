'use client';

import { useState, useEffect, useRef } from 'react';
import GameLoader from '@/components/GameLoader';
import GameHeader from '@/components/GameHeader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import GhostMascot from '@/components/GhostMascot';
import GhostParticles from '@/components/GhostParticles';
import FogBackground from '@/components/FogBackground';
import LightningEffect from '@/components/LightningEffect';
import { ghostSpeak, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const visitedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Simulate initial load time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AMBIENT REACTION 1: Page Load Welcome (800ms delay)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const welcomeTimer = setTimeout(() => {
      ghostSpeak(GHOST_MESSAGES.ambient.welcome, 4000);
    }, 800);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AMBIENT REACTION 2 & 3: Scroll Detection (down/up)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    let hasScrolledDown = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // First scroll down detection
      if (!hasScrolledDown && currentScrollY > 100) {
        hasScrolledDown = true;
        ghostSpeak(GHOST_MESSAGES.ambient.scrollDown);
      }
      
      // Scroll to top detection
      if (hasScrolledDown && currentScrollY < 50 && lastScrollY >= 50) {
        ghostSpeak(GHOST_MESSAGES.ambient.scrollTop);
      }
      
      lastScrollY = currentScrollY;
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AMBIENT REACTION 4 & 5: Idle Detection (6 seconds) + Back from Idle
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    let idleTimer: NodeJS.Timeout | null = null;
    let isIdle = false;

    const resetIdleTimer = () => {
      // If coming back from idle, announce return
      if (isIdle) {
        isIdle = false;
        ghostSpeak(GHOST_MESSAGES.ambient.backFromIdle);
      }

      // Clear existing timer
      if (idleTimer) clearTimeout(idleTimer);

      // Set new idle timer (6 seconds)
      idleTimer = setTimeout(() => {
        isIdle = true;
        const idleMessage = GHOST_MESSAGES.ambient.idle[
          Math.floor(Math.random() * GHOST_MESSAGES.ambient.idle.length)
        ];
        ghostSpeak(idleMessage, 4000);
      }, 6000);
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AMBIENT REACTION 6: Empty Background Click
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click was on the main element (empty background)
      if (target.tagName === 'MAIN' || target.classList.contains('scanlines')) {
        ghostSpeak(GHOST_MESSAGES.ambient.emptyClick);
      }
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AMBIENT REACTION 7: Right Click Detection
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const handleContextMenu = () => {
      ghostSpeak(GHOST_MESSAGES.ambient.rightClick, 3500);
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Section Scroll Detection (Intersection Observer)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const sectionMessages: { [key: string]: string } = {
      'about': GHOST_MESSAGES.sections.about,
      'skills': GHOST_MESSAGES.sections.skills,
      'projects': GHOST_MESSAGES.sections.projects,
      'certifications': GHOST_MESSAGES.sections.certifications,
      'experience': GHOST_MESSAGES.sections.experience,
      'contact': GHOST_MESSAGES.sections.contact,
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          if (sectionId && sectionMessages[sectionId] && !visitedSections.current.has(sectionId)) {
            visitedSections.current.add(sectionId);
            ghostSpeak(sectionMessages[sectionId]);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Attach All Event Listeners
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('click', handleClick);
    window.addEventListener('contextmenu', handleContextMenu);
    
    // Initialize idle timer
    resetIdleTimer();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Cleanup
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    return () => {
      clearTimeout(welcomeTimer);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('contextmenu', handleContextMenu);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading]);

  if (loading) {
    return <GameLoader />;
  }

  return (
    <main className="min-h-screen relative">
      {/* Atmospheric Fog Background Layers */}
      <FogBackground />
      
      {/* Floating Spirit Wisps Canvas */}
      <GhostParticles />
      
      {/* Lightning Effect - flashes every 10 seconds */}
      <LightningEffect />
      
      {/* Scanlines at z-1 so they're above fog but below content */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      
      {/* Ghost Mascot */}
      <GhostMascot />
      
      {/* Content with fade-in animation - z-10 to be above everything except ghost mascot */}
      <div className="relative animate-fadeIn" style={{ zIndex: 10 }}>
        <GameHeader />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
