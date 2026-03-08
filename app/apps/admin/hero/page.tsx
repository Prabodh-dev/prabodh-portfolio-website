'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import GameLoader from '@/components/GameLoader';
import { HeroContent } from '@/types/portfolio';

export default function HeroAdmin() {
  const { status } = useSession();
  const [content, setContent] = useState<HeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/hero', {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setContent(prev => prev ? { ...prev, profileImage: data.url } : null);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const addButton = () => {
    if (!content) return;
    setContent({
      ...content,
      buttons: [...content.buttons, { label: 'New Button', link: '#', type: 'secondary' }],
    });
  };

  const removeButton = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      buttons: content.buttons.filter((_, i) => i !== index),
    });
  };

  if (!content || status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} EDIT_HERO_SECTION</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="neon-box bg-retro-darker/50 p-8 space-y-6">
          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} NAME</label>
            <input
              type="text"
              value={content.name}
              onChange={(e) => setContent({ ...content, name: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ROLE_TITLE</label>
            <input
              type="text"
              value={content.role}
              onChange={(e) => setContent({ ...content, role: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TAGLINE</label>
            <input
              type="text"
              value={content.tagline}
              onChange={(e) => setContent({ ...content, tagline: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DESCRIPTION</label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-32"
              required
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} PROFILE_IMAGE</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 text-retro-cyan font-mono file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-retro-purple file:text-retro-dark file:font-mono file:cursor-pointer hover:file:bg-retro-pink"
            />
            {content.profileImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.profileImage} alt="Profile" className="mt-4 w-32 h-32 object-cover border-2 border-retro-cyan shadow-neon-cyan" />
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-retro-purple font-mono uppercase tracking-wider">{'>'} BUTTONS</label>
              <button
                type="button"
                onClick={addButton}
                className="px-4 py-2 bg-retro-purple text-retro-dark font-mono uppercase text-sm hover:bg-retro-pink transition-colors shadow-neon-purple"
              >
                + ADD_BUTTON
              </button>
            </div>
            {content.buttons.map((button, index) => (
              <div key={index} className="border-2 border-retro-cyan/30 bg-retro-darker p-4 mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="LABEL"
                  value={button.label}
                  onChange={(e) => {
                    const newButtons = [...content.buttons];
                    newButtons[index].label = e.target.value;
                    setContent({ ...content, buttons: newButtons });
                  }}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 focus:border-retro-cyan text-retro-cyan font-mono focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="LINK"
                  value={button.link}
                  onChange={(e) => {
                    const newButtons = [...content.buttons];
                    newButtons[index].link = e.target.value;
                    setContent({ ...content, buttons: newButtons });
                  }}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 focus:border-retro-cyan text-retro-cyan font-mono focus:outline-none"
                />
                <div className="flex justify-between items-center">
                  <select
                    value={button.type}
                    onChange={(e) => {
                      const newButtons = [...content.buttons];
                      newButtons[index].type = e.target.value as 'primary' | 'secondary';
                      setContent({ ...content, buttons: newButtons });
                    }}
                    className="px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 text-retro-cyan font-mono focus:outline-none"
                  >
                    <option value="primary">PRIMARY</option>
                    <option value="secondary">SECONDARY</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeButton(index)}
                    className="px-4 py-2 bg-red-600 text-white font-mono uppercase text-sm hover:bg-red-700 transition-colors"
                  >
                    - REMOVE
                  </button>
                </div>
              </div>
            ))}
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
