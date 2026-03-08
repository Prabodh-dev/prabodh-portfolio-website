'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Experience } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function ExperienceAdmin() {
  const { data: session, status } = useSession();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = () => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => setExperiences(data.sort((a: Experience, b: Experience) => a.order - b.order)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/experiences?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadExperiences();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingExp({
      id: '',
      title: '',
      organization: '',
      duration: '',
      description: '',
      highlights: [],
      order: experiences.length + 1,
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingExp) return;

    try {
      const url = '/api/experiences';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp),
      });

      if (response.ok) {
        setEditingExp(null);
        setIsCreating(false);
        loadExperiences();
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
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_EXPERIENCE</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {!editingExp ? (
          <>
            <div className="mb-6">
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
              >
                + CREATE_NEW_EXPERIENCE
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="retro-card">
                  <h3 className="text-xl font-mono font-bold text-retro-purple mb-2 uppercase">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-retro-cyan mb-1 font-mono">{exp.organization}</p>
                  <p className="text-xs text-retro-pink mb-3 font-mono">{exp.duration}</p>
                  <p className="text-sm text-retro-cyan/70 mb-4 font-mono line-clamp-2">{exp.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono text-sm hover:bg-retro-purple transition-colors uppercase"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
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
              {'>'} {isCreating ? 'CREATE_EXPERIENCE' : 'EDIT_EXPERIENCE'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TITLE *</label>
                <input
                  type="text"
                  value={editingExp.title}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Senior Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ORGANIZATION *</label>
                <input
                  type="text"
                  value={editingExp.organization}
                  onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Company Name"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DURATION *</label>
                <input
                  type="text"
                  value={editingExp.duration}
                  onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Jan 2020 - Present"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DESCRIPTION *</label>
                <textarea
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
                  placeholder="Brief description of the role"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} LOGO_URL</label>
                <input
                  type="url"
                  value={editingExp.logo || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, logo: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="https://example.com/logo.png"
                />
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
                    setEditingExp(null);
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
