'use client';

import { Certification } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => setCertifications(data.sort((a: Certification, b: Certification) => a.order - b.order)));
  }, []);

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay for seamless fog transition */}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs">ACHIEVEMENTS.SYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase">
            {'['} Certifications {']'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="game-card p-4 sm:p-6">
              {cert.certificateImage && (
                <div className="relative h-32 sm:h-40 w-full mb-4 overflow-hidden game-card">
                  <Image
                    src={cert.certificateImage}
                    alt={cert.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent opacity-40"></div>
                  <div className="absolute top-2 left-2 game-card px-2 py-1">
                    <span className="text-white font-mono text-[10px]">★ UNLOCKED</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono uppercase break-words flex-1">
                    {cert.title}
                  </h3>
                  <span className="game-card px-2 py-1 text-white font-mono text-xs flex-shrink-0">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <p className="text-white font-mono text-xs sm:text-sm break-words">{cert.issuer}</p>
                
                <div className="game-card px-2 py-1 inline-block">
                  <span className="text-xs text-white font-mono">
                    {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                {cert.description && (
                  <p className="text-xs text-white/80 font-mono leading-relaxed pt-2 border-t border-white/20 break-words">
                    {cert.description}
                  </p>
                )}
                
                <div className="pt-2">
                  <div className="xp-bar h-1.5">
                    <div className="xp-bar-fill" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono mt-1">
                    <span className="text-white">XP</span>
                    <span className="text-white">+1000</span>
                  </div>
                </div>
                
                {cert.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/80 hover:text-white font-mono text-xs transition-colors pt-1"
                  >
                    <span>View</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="game-card px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">{certifications.length}</div>
              <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Achievements</div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/10"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">100%</div>
              <div className="text-[10px] sm:text-xs text-white/80 font-mono uppercase mt-1">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
