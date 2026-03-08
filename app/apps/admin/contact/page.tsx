'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ContactContent } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function ContactAdmin() {
  const { status } = useSession();
  const [content, setContent] = useState<ContactContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
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

  if (!content || status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} EDIT_CONTACT_INFO</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="neon-box bg-retro-darker/50 p-8 space-y-6">
          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} EMAIL *</label>
            <input
              type="email"
              value={content.email}
              onChange={(e) => setContent({ ...content, email: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} LOCATION</label>
            <input
              type="text"
              value={content.location || ''}
              onChange={(e) => setContent({ ...content, location: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} GITHUB_URL</label>
              <input
                type="url"
                value={content.github || ''}
                onChange={(e) => setContent({ ...content, github: e.target.value })}
                className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} LINKEDIN_URL</label>
              <input
                type="url"
                value={content.linkedin || ''}
                onChange={(e) => setContent({ ...content, linkedin: e.target.value })}
                className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              />
            </div>
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
