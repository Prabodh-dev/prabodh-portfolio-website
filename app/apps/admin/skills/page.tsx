'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { SkillCategory } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function SkillsAdmin() {
  const { status } = useSession();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories),
      });

      if (response.ok) {
        setMessage('Saved successfully!');
      } else {
        setMessage('Failed to save');
      }
    } catch {
      setMessage('Error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: `cat-${Date.now()}`,
        name: 'New Category',
        order: categories.length + 1,
        skills: [],
      },
    ]);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const addSkill = (categoryId: string) => {
    setCategories(
      categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: [...cat.skills, { id: `skill-${Date.now()}`, name: 'New Skill' }],
            }
          : cat
      )
    );
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setCategories(
      categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter(s => s.id !== skillId) }
          : cat
      )
    );
  };

  if (status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_SKILLS</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={addCategory}
            className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
          >
            + ADD_CATEGORY
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="neon-box bg-retro-darker/50 p-6">
              <div className="flex justify-between items-start mb-4 gap-4">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) =>
                    setCategories(
                      categories.map(cat =>
                        cat.id === category.id ? { ...cat, name: e.target.value } : cat
                      )
                    )
                  }
                  className="text-2xl font-mono font-bold text-retro-purple bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple px-4 py-2 flex-1 focus:outline-none uppercase"
                />
                <button
                  onClick={() => removeCategory(category.id)}
                  className="px-4 py-2 bg-red-600 text-white font-mono uppercase text-sm hover:bg-red-700 transition-colors"
                >
                  - REMOVE
                </button>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => addSkill(category.id)}
                  className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono uppercase text-sm hover:bg-retro-pink transition-colors shadow-neon-cyan"
                >
                  + ADD_SKILL
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex gap-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        setCategories(
                          categories.map(cat =>
                            cat.id === category.id
                              ? {
                                  ...cat,
                                  skills: cat.skills.map(s =>
                                    s.id === skill.id ? { ...s, name: e.target.value } : s
                                  ),
                                }
                              : cat
                          )
                        )
                      }
                      className="flex-1 px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 focus:border-retro-cyan text-retro-cyan font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => removeSkill(category.id, skill.id)}
                      className="px-3 py-2 bg-red-600 text-white font-mono hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {message && (
          <p className={`mt-6 font-mono uppercase ${message.includes('success') ? 'text-retro-green' : 'text-red-500'}`}>
            {message.includes('success') ? '✓ ' : '✗ '}{message}
          </p>
        )}

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="retro-btn disabled:opacity-50"
          >
            {saving ? '⟳ SAVING...' : '💾 SAVE_ALL_CHANGES'}
          </button>
        </div>
      </main>
    </div>
  );
}
