'use client';

import { useEffect, useState, useRef } from 'react';

interface GhostMascotProps {
  onInteraction?: (message: string) => void;
}

const idleMessages = [
  "Still there? 👀",
  "Boo... did I scare you?",
  "Type something... anything!",
  "Just floating around... 💭",
  "Hello from the void! 🌌",
];

const hoverMessages = [
  "Hey! Want to drag me around? 👻",
  "I'm a draggable ghost! Try it!",
  "Drag me anywhere! 🎯",
  "I can float anywhere! ✨",
];

const dragMessages = [
  "Wheeee! Dragging me around! 👻",
  "I'm flying! ✈️",
  "Wheee! This is fun! 🎢",
  "Ghost mode: Floating! 💨",
];

const dropMessages = [
  "Nice spot! 📍",
  "I like it here! 😊",
  "Perfect location! ✨",
  "This is my new home! 🏠",
  "Chillin' at my new spot! 😎",
];

export default function GhostMascot({ onInteraction }: GhostMascotProps) {
  const [message, setMessage] = useState("BOO! Welcome to my realm 👻");
  const [showMessage, setShowMessage] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isSquinting, setIsSquinting] = useState(false);
  const ghostRef = useRef<HTMLDivElement>(null);
  const lastHoverMessageTime = useRef(0);
  const hasDraggedRef = useRef(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const speak = (newMessage: string, duration: number = 3000) => {
    // Clear existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    setMessage(newMessage);
    setShowMessage(true);
    
    // Trigger eye squint
    setIsSquinting(true);
    setTimeout(() => setIsSquinting(false), 100);
    
    // Hide message after duration
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };

  // Initialize position on mount (bottom right)
  useEffect(() => {
    const initX = window.innerWidth - 150;
    const initY = window.innerHeight - 200;
    setPosition({ x: initX, y: initY });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;
    
    const rect = ghostRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    const randomDragMessage = dragMessages[Math.floor(Math.random() * dragMessages.length)];
    speak(randomDragMessage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    hasDraggedRef.current = true;
    
    // Calculate new position
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep ghost within viewport bounds
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 120;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (hasDraggedRef.current) {
      const randomDropMessage = dropMessages[Math.floor(Math.random() * dropMessages.length)];
      speak(randomDropMessage);
    }
  };

  const handleGhostHover = () => {
    const now = Date.now();
    // Only speak every 5 seconds on hover to avoid spam
    if (now - lastHoverMessageTime.current > 5000) {
      const randomMessage = hoverMessages[Math.floor(Math.random() * hoverMessages.length)];
      speak(randomMessage);
      lastHoverMessageTime.current = now;
    }
  };

  const handleGhostClick = (e: React.MouseEvent) => {
    // Only trigger click message if not dragging
    if (!hasDraggedRef.current) {
      const messages = [
        "Boo! 👻",
        "You clicked me! 😱",
        "Hehe, that tickles! 😄",
        "Ghost mode: Activated! ✨",
        "Want to drag me? Try it! 🎯",
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      speak(randomMessage);
    }
  };

  useEffect(() => {
    // Initial welcome message
    const welcomeTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    // Listen for custom events from other components
    const handleGhostSpeak = (e: CustomEvent) => {
      const duration = e.detail.duration || 3000;
      speak(e.detail.message, duration);
      setLastActivityTime(Date.now());
    };

    window.addEventListener('ghost-speak', handleGhostSpeak as EventListener);
    
    // Track user activity with throttling
    let activityTimeout: NodeJS.Timeout | null = null;
    const handleActivity = () => {
      if (activityTimeout) return; // Throttle activity tracking
      
      setLastActivityTime(Date.now());
      
      activityTimeout = setTimeout(() => {
        activityTimeout = null;
      }, 1000); // Throttle to once per second
    };
    
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    // Dragging event listeners
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    // Idle timer - check every 5 seconds if user has been idle
    const idleCheckInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivityTime;
      if (timeSinceActivity >= 30000) { // 30 seconds of inactivity
        const randomMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)];
        speak(randomMessage);
        setLastActivityTime(Date.now()); // Reset to prevent immediate repeat
      }
    }, 5000);

    return () => {
      clearTimeout(welcomeTimeout);
      clearInterval(idleCheckInterval);
      if (activityTimeout) clearTimeout(activityTimeout);
      window.removeEventListener('ghost-speak', handleGhostSpeak as EventListener);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [lastActivityTime, isDragging]);

  // Calculate speech bubble position based on ghost location
  const isTopHalf = position.y < (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  const isLeftHalf = position.x < (typeof window !== 'undefined' ? window.innerWidth / 2 : 400);

  return (
    <div 
      id="ghost-mascot"
      ref={ghostRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.5s ease',
        zIndex: 200,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        width: '100px',
        height: '120px'
      }}
    >
      {/* Speech Bubble */}
      {showMessage && (
        <div 
          style={{
            position: 'absolute',
            [isTopHalf ? 'top' : 'bottom']: isTopHalf ? '100%' : '100%',
            [isLeftHalf ? 'left' : 'right']: 0,
            marginTop: isTopHalf ? '16px' : '0',
            marginBottom: isTopHalf ? '0' : '16px',
            pointerEvents: 'none',
            animation: 'scaleIn 0.2s ease-out'
          }}
        >
          <div 
            style={{
              background: '#ffffff',
              backgroundColor: '#ffffff',
              color: '#111111',
              padding: '8px 12px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              maxWidth: '200px',
              fontSize: '13px',
              fontFamily: 'Courier New, monospace',
              backdropFilter: 'none',
              border: 'none',
              position: 'relative',
              wordWrap: 'break-word'
            }}
          >
            {message}
            {/* Triangle pointer */}
            <div style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              [isTopHalf ? 'borderBottom' : 'borderTop']: isTopHalf ? '8px solid #ffffff' : '8px solid #ffffff',
              [isTopHalf ? 'bottom' : 'top']: '100%',
              [isLeftHalf ? 'left' : 'right']: '32px',
              background: 'transparent'
            }}></div>
          </div>
        </div>
      )}
      
      {/* Ghost Character */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseEnter={handleGhostHover}
        onClick={handleGhostClick}
        style={{ 
          position: 'relative',
          animation: 'float 3s ease-in-out infinite',
          width: '100px',
          height: '120px'
        }}
      >
        <svg 
          width="100" 
          height="120" 
          viewBox="0 0 100 120" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ 
            display: 'block',
            overflow: 'visible'
          }}
        >
          {/* Ghost glow effect */}
          <defs>
            <filter id="ghost-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="ghostGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#e8e8f0" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          
          {/* Ghost body with glow ONLY on the shape itself */}
          <path
            d="M 50 20 
               Q 30 20, 25 35
               Q 20 50, 20 65
               L 20 100
               L 28 95
               L 36 100
               L 44 95
               L 52 100
               L 60 95
               L 68 100
               L 76 95
               L 80 100
               L 80 65
               Q 80 50, 75 35
               Q 70 20, 50 20 Z"
            fill="url(#ghostGradient)"
            filter="url(#ghost-glow)"
          />
          
          {/* Left eye */}
          <ellipse
            cx="40"
            cy="50"
            rx="4"
            ry="6"
            fill="#000000"
            className={`animate-blink ${isSquinting ? 'animate-eyeSquint' : ''}`}
          />
          
          {/* Right eye */}
          <ellipse
            cx="60"
            cy="50"
            rx="4"
            ry="6"
            fill="#000000"
            className={`animate-blink ${isSquinting ? 'animate-eyeSquint' : ''}`}
          />
          
          {/* Optional mouth - small curve */}
          <path
            d="M 45 65 Q 50 68, 55 65"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
