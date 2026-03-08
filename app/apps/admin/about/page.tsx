'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AboutContent } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function AboutAdmin() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState<AboutContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setMessage('Saved successfully!');
      } else {
        setMessage('Failed to save');
      }
    } catch (error) {
      setMessage('Error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (!content || status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} EDIT_ABOUT_SECTION</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="neon-box bg-retro-darker/50 p-8 space-y-6">
          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} SUMMARY *</label>
            <textarea
              value={content.summary}
              onChange={(e) => setContent({ ...content, summary: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-32"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DETAILED_DESCRIPTION</label>
            <textarea
              value={content.detailed || ''}
              onChange={(e) => setContent({ ...content, detailed: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-40"
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} EDUCATION *</label>
            <input
              type="text"
              value={content.education}
              onChange={(e) => setContent({ ...content, education: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} CURRENT_FOCUS *</label>
            <input
              type="text"
              value={content.currentFocus}
              onChange={(e) => setContent({ ...content, currentFocus: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} PERSONAL_STATEMENT</label>
            <textarea
              value={content.personalStatement || ''}
              onChange={(e) => setContent({ ...content, personalStatement: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
            />
          </div>

          {message && (
            <p className={`font-mono uppercase ${message.includes('success') ? 'text-retro-green' : 'text-red-500'}`}>
              {message.includes('success') ? '✓ ' : '✗ '}{message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="retro-btn w-full disabled:opacity-50"
          >
            {saving ? '⟳ SAVING...' : '💾 SAVE_CHANGES'}
          </button>
        </form>
      </main>
    </div>
  );
}
