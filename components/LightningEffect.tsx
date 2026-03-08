'use client';

import { useEffect, useState, useRef } from 'react';
import { ghostSpeak } from '@/lib/ghost-utils';

export default function LightningEffect() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [boltPosition, setBoltPosition] = useState({ x: 50, rotation: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
    };
    
    // Initialize on first click/touch
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // Thunder sound effect using Web Audio API
  const playThunderSound = () => {
    if (!audioContextRef.current) {
      return;
    }
    
    const ctx = audioContextRef.current;
    
    // Resume audio context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const now = ctx.currentTime;
    
    // Create thunder rumble using filtered noise
    const bufferSize = ctx.sampleRate * 3; // 3 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate brown noise (lower frequency rumble)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      const brown = (lastOut + (0.02 * white)) / 1.02;
      lastOut = brown;
      data[i] = brown * 5; // Increased volume multiplier
    }
    
    // Create audio nodes
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Filter for deep rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200; // Increased from 150 for more audible frequency
    filter.Q.value = 1.0;
    
    // Gain envelope for thunder crack then rumble - MUCH LOUDER
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.6, now + 0.02); // Quick crack - MUCH LOUDER
    gainNode.gain.exponentialRampToValueAtTime(0.4, now + 0.3); // Hold - LOUDER
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 2.5); // Fade out
    
    // Connect nodes
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Play
    source.start(now);
    source.stop(now + 3);
  };

  useEffect(() => {
    const triggerLightning = () => {
      // Randomize lightning position (20% to 80% across screen)
      const randomX = 20 + Math.random() * 60;
      const randomRotation = -15 + Math.random() * 30; // -15 to +15 degrees
      setBoltPosition({ x: randomX, rotation: randomRotation });
      
      // First flash with lightning bolt
      setIsFlashing(true);
      
      // Play thunder sound
      playThunderSound();
      
      // Ghost reacts to lightning
      const reactions = [
        "Whoa! That lightning!",
        "Thunder strikes!",
        "Did you see that bolt?",
        "Electric shock!",
        "Stormy weather!",
        "KABOOM!",
        "Lightning crackles!",
      ];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      
      setTimeout(() => {
        ghostSpeak(randomReaction, 2500);
      }, 300);

      // End first flash
      setTimeout(() => {
        setIsFlashing(false);
        
        // Second quick flash (realistic lightning pattern)
        setTimeout(() => {
          setIsFlashing(true);
          setTimeout(() => {
            setIsFlashing(false);
          }, 60);
        }, 100);
      }, 200);
    };

    // Trigger every 10 seconds
    const interval = setInterval(triggerLightning, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isFlashing) return null;

  return (
    <>
      {/* Screen flash */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 500,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, transparent 80%)',
          animation: 'lightningFlash 200ms ease-out',
        }}
      />
      
      {/* Lightning bolt SVG */}
      <div
        className="fixed top-0 pointer-events-none"
        style={{
          zIndex: 501,
          left: `${boltPosition.x}%`,
          transform: `translateX(-50%) rotate(${boltPosition.rotation}deg)`,
          transformOrigin: 'top center',
          animation: 'lightningBoltAppear 200ms ease-out',
        }}
      >
        <svg
          width="120"
          height="100vh"
          viewBox="0 0 120 1000"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(255,255,255,0.6))',
          }}
        >
          {/* Main lightning bolt - jagged white line */}
          <path
            d="M 60 0 L 55 80 L 65 85 L 50 180 L 68 190 L 45 290 L 70 300 L 48 400 L 75 410 L 50 520 L 72 530 L 55 640 L 78 650 L 60 760 L 85 770 L 65 900 L 70 1000"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity="0.95"
          />
          
          {/* Inner glow */}
          <path
            d="M 60 0 L 55 80 L 65 85 L 50 180 L 68 190 L 45 290 L 70 300 L 48 400 L 75 410 L 50 520 L 72 530 L 55 640 L 78 650 L 60 760 L 85 770 L 65 900 L 70 1000"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity="0.4"
            style={{ filter: 'blur(4px)' }}
          />
          
          {/* Outer glow */}
          <path
            d="M 60 0 L 55 80 L 65 85 L 50 180 L 68 190 L 45 290 L 70 300 L 48 400 L 75 410 L 50 520 L 72 530 L 55 640 L 78 650 L 60 760 L 85 770 L 65 900 L 70 1000"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity="0.2"
            style={{ filter: 'blur(12px)' }}
          />
          
          {/* Side branches */}
          <path d="M 65 85 L 85 120 L 90 140" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 68 190 L 40 220 L 35 245" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 70 300 L 95 340 L 100 365" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 75 410 L 50 450 L 45 480" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M 72 530 L 95 570 L 100 600" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M 78 650 L 55 690 L 50 720" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
        </svg>
      </div>
    </>
  );
}
