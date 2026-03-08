'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import GameLoader from '@/components/GameLoader';
import { ResumeContent } from '@/types/portfolio';

export default function ResumeAdmin() {
  const { data: session, status } = useSession();
  const [resume, setResume] = useState<ResumeContent | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => setResume(data));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Resume uploaded successfully!');
        setResume(data);
        
        fetch('/api/resume')
          .then(res => res.json())
          .then(data => setResume(data));
      } else {
        setMessage('Failed to upload resume');
      }
    } catch (error) {
      setMessage('Error occurred');
    } finally {
      setUploading(false);
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
          <h1 className="text-2xl font-mono font-bold uppercase neon-text">{'>'} MANAGE_RESUME</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="neon-box bg-retro-darker/50 p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-mono font-bold text-retro-purple mb-4 uppercase">
              {'>'} CURRENT_RESUME
            </h2>
            {resume?.fileName ? (
              <div className="border-2 border-retro-cyan/30 p-6 bg-retro-gray">
                <p className="text-retro-cyan mb-2 font-mono">
                  <strong className="text-retro-purple">FILE:</strong> {resume.fileName}
                </p>
                <p className="text-retro-cyan mb-4 font-mono">
                  <strong className="text-retro-purple">UPLOADED:</strong> {resume.uploadDate ? new Date(resume.uploadDate).toLocaleString() : 'N/A'}
                </p>
                <a
                  href={`/uploads/${resume.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-retro-cyan text-retro-dark font-mono uppercase hover:bg-retro-pink transition-colors shadow-neon-cyan"
                >
                  📄 VIEW_CURRENT_RESUME
                </a>
              </div>
            ) : (
              <p className="text-retro-cyan font-mono italic">{'>'} NO_RESUME_UPLOADED_YET</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-mono font-bold text-retro-purple mb-4 uppercase">
              {'>'} UPLOAD_NEW_RESUME
            </h2>
            <p className="text-retro-cyan mb-4 font-mono">
              {'>'} Upload a PDF file. This will replace the existing resume.
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              disabled={uploading}
              className="w-full px-4 py-2 bg-retro-gray border-2 border-retro-purple/30 text-retro-cyan font-mono file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-retro-purple file:text-retro-dark file:font-mono file:cursor-pointer hover:file:bg-retro-pink disabled:opacity-50"
            />
          </div>

          {message && (
            <p className={`font-mono uppercase ${message.includes('success') ? 'text-retro-green' : 'text-red-500'}`}>
              {message.includes('success') ? '✓ ' : '✗ '}{message}
            </p>
          )}

          {uploading && (
            <p className="text-retro-cyan font-mono uppercase">{'>'} ⟳ UPLOADING...</p>
          )}
        </div>
      </main>
    </div>
  );
}
