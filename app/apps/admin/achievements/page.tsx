'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Achievement } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function AchievementsAdmin() {
  const { data: session, status } = useSession();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => setAchievements(data.sort((a: Achievement, b: Achievement) => a.order - b.order)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const response = await fetch(`/api/achievements?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadAchievements();
      }
    } catch (error) {
      // Error handling - could implement user notification here
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingAchievement({
      id: '',
      title: '',
      description: '',
      order: achievements.length + 1,
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingAchievement) return;

    try {
      const url = '/api/achievements';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAchievement),
      });

      if (response.ok) {
        setEditingAchievement(null);
        setIsCreating(false);
        loadAchievements();
      }
    } catch (error) {
      // Error handling - could implement user notification here
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
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_ACHIEVEMENTS</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {!editingAchievement ? (
          <>
            <div className="mb-6">
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
              >
                + CREATE_NEW_ACHIEVEMENT
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="retro-card">
                  <h3 className="text-xl font-mono font-bold text-retro-purple mb-2 uppercase">
                    {achievement.title}
                  </h3>
                  {achievement.subtitle && (
                    <p className="text-sm text-retro-pink mb-2 font-mono">{achievement.subtitle}</p>
                  )}
                  {achievement.date && (
                    <p className="text-xs text-retro-cyan/70 mb-2 font-mono">{achievement.date}</p>
                  )}
                  <p className="text-sm text-retro-cyan mb-4 font-mono line-clamp-3">{achievement.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono text-sm hover:bg-retro-purple transition-colors uppercase"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
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
              {'>'} {isCreating ? 'CREATE_ACHIEVEMENT' : 'EDIT_ACHIEVEMENT'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TITLE *</label>
                <input
                  type="text"
                  value={editingAchievement.title}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="First Prize - Hackathon"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} SUBTITLE</label>
                <input
                  type="text"
                  value={editingAchievement.subtitle || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Tech Conference 2024"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DATE</label>
                <input
                  type="text"
                  value={editingAchievement.date || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, date: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="March 2024"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DESCRIPTION *</label>
                <textarea
                  value={editingAchievement.description}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-32"
                  placeholder="Description of the achievement"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} IMAGE_URL</label>
                  <input
                    type="url"
                    value={editingAchievement.image || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, image: e.target.value })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                    placeholder="https://example.com/image.png"
                  />
                </div>

                <div>
                  <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ICON</label>
                  <input
                    type="text"
                    value={editingAchievement.icon || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                    placeholder="🏆"
                  />
                </div>
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} LINK_URL</label>
                <input
                  type="url"
                  value={editingAchievement.link || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, link: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="https://example.com/certificate"
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
                    setEditingAchievement(null);
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
