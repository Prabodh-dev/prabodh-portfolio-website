'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FooterContent } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function FooterAdmin() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState<FooterContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/footer')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/footer', {
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

  const addQuickLink = () => {
    if (!content) return;
    setContent({
      ...content,
      quickLinks: [...content.quickLinks, { label: 'New Link', link: '#' }]
    });
  };

  const removeQuickLink = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      quickLinks: content.quickLinks.filter((_, i) => i !== index)
    });
  };

  const updateQuickLink = (index: number, field: 'label' | 'link', value: string) => {
    if (!content) return;
    const updated = [...content.quickLinks];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, quickLinks: updated });
  };

  const addSocialLink = () => {
    if (!content) return;
    setContent({
      ...content,
      socialLinks: [...content.socialLinks, { platform: 'New Platform', url: '' }]
    });
  };

  const removeSocialLink = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      socialLinks: content.socialLinks.filter((_, i) => i !== index)
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    if (!content) return;
    const updated = [...content.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, socialLinks: updated });
  };

  if (!content || status === 'loading') return <GameLoader />;

  return (
    <div className="min-h-screen admin-bg">
      <header className="bg-retro-darker border-b-2 border-retro-purple text-retro-cyan p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/apps/admin" className="text-lg font-mono hover:text-retro-pink transition-colors">
            {'<'} BACK_TO_DASHBOARD
          </Link>
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} EDIT_FOOTER</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="neon-box bg-retro-darker/50 p-8 space-y-8">
          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} FOOTER_TEXT *</label>
            <textarea
              value={content.text}
              onChange={(e) => setContent({ ...content, text: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
              required
              placeholder="Thank you for visiting my portfolio..."
            />
          </div>

          <div>
            <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} COPYRIGHT_TEXT *</label>
            <input
              type="text"
              value={content.copyright}
              onChange={(e) => setContent({ ...content, copyright: e.target.value })}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
              required
              placeholder="© 2024 Your Name. All rights reserved."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-retro-purple font-mono uppercase tracking-wider">{'>'} QUICK_LINKS</label>
              <button
                type="button"
                onClick={addQuickLink}
                className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono uppercase text-sm hover:bg-retro-pink transition-colors"
              >
                + ADD_LINK
              </button>
            </div>
            <div className="space-y-3">
              {content.quickLinks.map((link, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                    className="flex-1 px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 focus:border-retro-cyan text-retro-cyan font-mono focus:outline-none"
                    placeholder="Link Label"
                  />
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => updateQuickLink(index, 'link', e.target.value)}
                    className="flex-1 px-4 py-2 bg-retro-gray border-2 border-retro-cyan/30 focus:border-retro-cyan text-retro-cyan font-mono focus:outline-none"
                    placeholder="Link URL or #section-id"
                  />
                  <button
                    type="button"
                    onClick={() => removeQuickLink(index)}
                    className="px-3 py-2 bg-red-600 text-white font-mono hover:bg-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-retro-purple font-mono uppercase tracking-wider">{'>'} SOCIAL_LINKS</label>
              <button
                type="button"
                onClick={addSocialLink}
                className="px-4 py-2 bg-retro-pink text-retro-dark font-mono uppercase text-sm hover:bg-retro-purple transition-colors"
              >
                + ADD_SOCIAL
              </button>
            </div>
            <div className="space-y-3">
              {content.socialLinks.map((social, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={social.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="flex-1 px-4 py-2 bg-retro-gray border-2 border-retro-pink/30 focus:border-retro-pink text-retro-cyan font-mono focus:outline-none"
                    placeholder="Platform (e.g., GitHub)"
                  />
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="flex-1 px-4 py-2 bg-retro-gray border-2 border-retro-pink/30 focus:border-retro-pink text-retro-cyan font-mono focus:outline-none"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="px-3 py-2 bg-red-600 text-white font-mono hover:bg-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
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
