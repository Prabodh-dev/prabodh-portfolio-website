'use client';

import { useEffect, useRef } from 'react';

export default function GhostParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wisp class - floating spirit particles (STEP 4 specifications)
    class Wisp {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      maxOpacity: number;
      driftOffset: number;
      progress: number;

      constructor() {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200; // Start below screen
        this.radius = 1.5 + Math.random() * 2.5; // 1.5 to 4
        this.speed = 0.25 + Math.random() * 0.7; // 0.25 to 0.95
        this.maxOpacity = 0.3 + Math.random() * 0.25; // 0.3 to 0.55
        this.opacity = 0;
        this.driftOffset = Math.random() * Math.PI * 2;
        this.progress = 0; // 0 to 1 as it travels
      }

      update() {
        if (!canvas) return;
        
        // Move upward
        this.y -= this.speed;
        
        // Horizontal drift (sine wave)
        this.x += Math.sin(Date.now() * 0.001 + this.driftOffset) * 0.35;
        
        // Calculate progress (0 to 1)
        this.progress = 1 - (this.y / canvas.height);
        
        // Opacity calculation as specified
        if (this.progress < 0.2) {
          // Fade in first 20%
          this.opacity = (this.progress / 0.2) * this.maxOpacity;
        } else if (this.progress > 0.7) {
          // Fade out last 30%
          this.opacity = ((1 - this.progress) / 0.3) * this.maxOpacity;
        } else {
          // Full opacity in middle
          this.opacity = this.maxOpacity;
        }

        // Reset when exits top
        if (this.y < -20) {
          this.y = canvas.height + Math.random() * 100;
          this.x = Math.random() * canvas.width;
          this.progress = 0;
        }
      }

      draw() {
        if (!ctx || this.opacity <= 0) return;
        
        // Draw as soft glowing circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.restore();
      }
    }

    // Create 12 wisps as specified
    const wisps: Wisp[] = [];
    const wispCount = 12;

    for (let i = 0; i < wispCount; i++) {
      wisps.push(new Wisp());
    }

    // Animation loop - clear canvas each frame
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      wisps.forEach(wisp => {
        wisp.update();
        wisp.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="wisps-canvas"
      className="fixed pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    />
  );
}
