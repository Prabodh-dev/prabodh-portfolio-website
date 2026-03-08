'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Project } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function ProjectsAdmin() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.sort((a: Project, b: Project) => a.order - b.order)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadProjects();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingProject({
      id: '',
      title: '',
      summary: '',
      description: '',
      features: [],
      techStack: [],
      status: 'ongoing',
      featured: false,
      tags: [],
      order: projects.length + 1,
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      const url = isCreating ? '/api/projects' : `/api/projects/${editingProject.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        setEditingProject(null);
        setIsCreating(false);
        loadProjects();
      }
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  if (status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_PROJECTS</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {!editingProject ? (
          <>
            <div className="mb-6">
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
              >
                + CREATE_NEW_PROJECT
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="retro-card">
                  <h3 className="text-xl font-mono font-bold text-retro-purple mb-2 uppercase">
                    {project.title}
                  </h3>
                  <p className="text-sm text-retro-cyan mb-4 font-mono">{project.summary}</p>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {project.featured && (
                      <span className="text-xs px-2 py-1 bg-retro-pink text-retro-dark font-mono">FEATURED</span>
                    )}
                    <span className="text-xs px-2 py-1 bg-retro-purple text-retro-dark font-mono">
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono text-sm hover:bg-retro-purple transition-colors uppercase"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-4 py-2 bg-red-600 text-white font-mono text-sm hover:bg-red-700 transition-colors uppercase"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="neon-box bg-retro-darker/50 p-8">
            <h2 className="text-3xl font-mono font-bold text-retro-purple mb-6 uppercase neon-text">
              {'>'} {isCreating ? 'CREATE_PROJECT' : 'EDIT_PROJECT'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TITLE *</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} SUMMARY *</label>
                <textarea
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DESCRIPTION *</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} PROBLEM_STATEMENT</label>
                <textarea
                  value={editingProject.problemStatement || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} FEATURES (one per line)</label>
                <textarea
                  value={editingProject.features.join('\n')}
                  onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value.split('\n').filter(f => f.trim()) })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-32"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TECH_STACK (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.techStack.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TAGS (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Web Development, Full Stack"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ROLE</label>
                  <input
                    type="text"
                    value={editingProject.role || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} STATUS</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as 'ongoing' | 'completed' | 'archived' })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  >
                    <option value="ongoing">ONGOING</option>
                    <option value="completed">COMPLETED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} GITHUB_LINK</label>
                  <input
                    type="url"
                    value={editingProject.githubLink || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubLink: e.target.value })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} LIVE_LINK</label>
                  <input
                    type="url"
                    value={editingProject.liveLink || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-5 h-5 bg-retro-gray border-2 border-retro-purple accent-retro-purple"
                  />
                  <span className="text-retro-cyan font-mono uppercase">FEATURED PROJECT</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
                >
                  {isCreating ? '+ CREATE' : '💾 SAVE'}
                </button>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setIsCreating(false);
                  }}
                  className="px-6 py-3 border-2 border-retro-purple text-retro-purple font-mono uppercase hover:bg-retro-purple hover:text-retro-dark transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
