'use client';

import { Achievement } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => setAchievements(data.sort((a: Achievement, b: Achievement) => a.order - b.order)));
  }, []);

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 px-6 bg-retro-darker">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-white mb-12 text-center neon-text font-mono uppercase tracking-wider">
          {'<'} Achievements & Highlights {'/>'} 
        </h2>
        
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="neon-box p-6 group hover:shadow-neon-purple transition-all">
              <div className="flex gap-6">
                {achievement.image && (
                  <div className="relative w-24 h-24 flex-shrink-0 game-card">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white font-mono uppercase">
                        {achievement.title}
                      </h3>
                      {achievement.subtitle && (
                        <p className="text-lg text-white/80 font-mono">
                          {'>'} {achievement.subtitle}
                        </p>
                      )}
                    </div>
                    {achievement.date && (
                      <span className="text-sm text-white font-mono px-3 py-1 border border-white/20">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 leading-relaxed font-mono">
                    {achievement.description}
                  </p>
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-white/80 hover:text-white font-mono underline transition-colors"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
