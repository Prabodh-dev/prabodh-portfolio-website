'use client';

import { Project } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ghostSpeak, randomMessage, GHOST_MESSAGES } from '@/lib/ghost-utils';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.sort((a: Project, b: Project) => a.order - b.order)));
  }, []);

  if (projects.length === 0) return null;

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 retro-grid relative">
      {/* Removed gradient overlay and game-section class for consistency */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block game-card px-4 sm:px-6 py-2 mb-3 sm:mb-4">
            <span className="text-white font-mono text-xs sm:text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-white/10 rounded-full animate-pulse"></div>
              MISSION_LOG.SYS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white neon-text font-mono uppercase tracking-wider">
            {'<'} Featured Projects {'/>'} 
          </h2>
        </div>
        
        {featuredProjects.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1 h-6 sm:h-8 bg-white/10"></div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-mono uppercase">
                Active Missions
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="mission-card cursor-pointer group relative overflow-hidden"
                  onMouseEnter={() => ghostSpeak(randomMessage(GHOST_MESSAGES.projects.hover))}
                  onClick={() => {
                    setSelectedProject(project);
                    ghostSpeak(`Diving into ${project.title}... 🕸️`);
                  }}
                >
                  {/* Mission ID badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 game-card px-2 sm:px-3 py-1 z-20">
                    <span className="text-white/80 font-mono text-[10px] sm:text-xs">
                      MISSION #{String(index + 1).padStart(3, '0')}
                    </span>
                  </div>
                  
                  {project.thumbnail && (
                    <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent"></div>
                      {/* Scan line effect */}
                      <div className="absolute inset-0 pointer-events-none" style={{
                        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
                      }}></div>
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono uppercase neon-text flex-1">
                        {project.title}
                      </h4>
                      <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 font-mono font-bold flex-shrink-0 ${
                        project.status === 'completed' ? 'bg-white/10 text-white border border-white/20' :
                        project.status === 'ongoing' ? 'bg-white/10 text-white border border-white/20' :
                        'bg-white/10 text-white border border-white/20'
                      }`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-white/80 mb-4 font-mono leading-relaxed">{project.summary}</p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] sm:text-xs px-2 py-1 border border-white/20 text-white font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Mission stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
                      <div className="text-center">
                        <div className="text-white font-mono text-[10px] sm:text-xs">COMPLEXITY</div>
                        <div className="stat-bar h-1 mt-1">
                          <div className="stat-bar-fill" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-mono text-[10px] sm:text-xs">IMPACT</div>
                        <div className="stat-bar h-1 mt-1">
                          <div className="stat-bar-fill" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-mono text-[10px] sm:text-xs">INNOVATION</div>
                        <div className="stat-bar h-1 mt-1">
                          <div className="stat-bar-fill" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="w-1 h-6 sm:h-8 bg-white/10"></div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-mono uppercase">
              Mission Archive
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="game-card p-4 sm:p-6 cursor-pointer group hover:shadow-neon-purple transition-all"
                onMouseEnter={() => ghostSpeak(randomMessage(GHOST_MESSAGES.projects.hover))}
                onClick={() => {
                  setSelectedProject(project);
                  ghostSpeak(`Checking out ${project.title}... 👻`);
                }}
              >
                {/* Project number badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="game-card px-2 py-1 inline-block">
                    <span className="text-white font-mono text-xs">#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-1 font-mono ${
                    project.status === 'completed' ? 'bg-white/10 text-white border border-white/20' :
                    'bg-white/10 text-white/80 border border-white/20'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono uppercase">
                  {project.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 mb-3 font-mono line-clamp-2">{project.summary}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 bg-white/10 text-white font-mono border border-white/20">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] px-2 py-1 text-white/80 font-mono">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Bottom corner decoration */}
                <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-[10px] font-mono text-white/80">
                  <span>VIEW_DETAILS</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 sm:p-6 z-50 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="game-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
            {/* Header bar */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/10 rounded-full"></div>
                <span className="text-white font-mono text-xs sm:text-sm">PROJECT_DETAILS.DAT</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-2xl sm:text-3xl text-white hover:text-white/80 font-mono transition-colors w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 hover:border-white/40"
              >
                ×
              </button>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 neon-text font-mono uppercase">
              {selectedProject.title}
            </h3>
            
            {selectedProject.thumbnail && (
              <div className="relative h-48 sm:h-64 md:h-96 w-full mb-4 sm:mb-6 game-card overflow-hidden">
                <Image
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                {/* Scan effect */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
                }}></div>
              </div>
            )}
            
            <div className="space-y-4 sm:space-y-6">
              <div className="mission-card">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-mono uppercase">Mission Briefing</h4>
                <p className="text-sm sm:text-base text-white/80 font-mono leading-relaxed">{selectedProject.description}</p>
              </div>
              
              {selectedProject.problemStatement && (
                <div className="mission-card border-l-4 border-white/20">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-mono uppercase">Problem Statement</h4>
                  <p className="text-sm sm:text-base text-white/80 font-mono leading-relaxed">{selectedProject.problemStatement}</p>
                </div>
              )}
              
              <div className="game-card p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 font-mono uppercase flex items-center">
                  <div className="w-1 h-5 sm:h-6 bg-white/10 mr-2"></div>
                  Key Features
                </h4>
                <ul className="space-y-2 text-white/80 font-mono text-sm sm:text-base">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1 flex-shrink-0">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="game-card p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 font-mono uppercase flex items-center">
                  <div className="w-1 h-5 sm:h-6 bg-white/10 mr-2"></div>
                  Tech Arsenal
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 sm:px-3 py-1 bg-white/10 text-white font-mono font-bold text-xs sm:text-sm border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedProject.role && (
                <div className="mission-card">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-mono uppercase">Player Role</h4>
                  <p className="text-sm sm:text-base text-white/80 font-mono">{selectedProject.role}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-btn px-4 sm:px-6 py-2 sm:py-3 font-mono font-bold uppercase flex items-center gap-2 text-sm sm:text-base"
                    onClick={() => ghostSpeak(GHOST_MESSAGES.projects.github)}
                  >
                    <span>View Code</span>
                    <span>→</span>
                  </a>
                )}
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-btn px-4 sm:px-6 py-2 sm:py-3 font-mono font-bold uppercase flex items-center gap-2 text-sm sm:text-base"
                    onClick={() => ghostSpeak(GHOST_MESSAGES.projects.demo)}
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
