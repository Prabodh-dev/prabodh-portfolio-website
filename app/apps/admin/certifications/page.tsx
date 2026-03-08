'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Certification } from '@/types/portfolio';
import GameLoader from '@/components/GameLoader';

export default function CertificationsAdmin() {
  const { status } = useSession();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = () => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => setCertifications(data.sort((a: Certification, b: Certification) => a.order - b.order)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;

    try {
      const response = await fetch(`/api/certifications?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadCertifications();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingCert({
      id: '',
      title: '',
      issuer: '',
      issueDate: '',
      order: certifications.length + 1,
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingCert) return;

    try {
      const url = '/api/certifications';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCert),
      });

      if (response.ok) {
        setEditingCert(null);
        setIsCreating(false);
        loadCertifications();
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
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_CERTIFICATIONS</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {!editingCert ? (
          <>
            <div className="mb-6">
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-retro-purple text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-purple"
              >
                + CREATE_NEW_CERTIFICATION
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="retro-card">
                  <h3 className="text-xl font-mono font-bold text-retro-purple mb-2 uppercase">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-retro-cyan mb-1 font-mono">{cert.issuer}</p>
                  <p className="text-xs text-retro-pink mb-3 font-mono">{cert.issueDate}</p>
                  {cert.description && (
                    <p className="text-sm text-retro-cyan/70 mb-4 font-mono line-clamp-2">{cert.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="px-4 py-2 bg-retro-cyan text-retro-dark font-mono text-sm hover:bg-retro-purple transition-colors uppercase"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
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
              {'>'} {isCreating ? 'CREATE_CERTIFICATION' : 'EDIT_CERTIFICATION'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} TITLE *</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ISSUER *</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} ISSUE_DATE *</label>
                <input
                  type="text"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="March 2024"
                  required
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} DESCRIPTION</label>
                <textarea
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors h-24"
                  placeholder="Brief description of the certification"
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} CREDENTIAL_LINK</label>
                <input
                  type="url"
                  value={editingCert.credentialLink || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialLink: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="https://www.credly.com/badges/..."
                />
              </div>

              <div>
                <label className="block text-retro-purple font-mono mb-2 uppercase tracking-wider">{'>'} CERTIFICATE_IMAGE_URL</label>
                <input
                  type="url"
                  value={editingCert.certificateImage || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, certificateImage: e.target.value })}
                  className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 focus:border-retro-purple text-retro-cyan font-mono focus:outline-none transition-colors"
                  placeholder="https://example.com/certificate.png"
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
                    setEditingCert(null);
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
