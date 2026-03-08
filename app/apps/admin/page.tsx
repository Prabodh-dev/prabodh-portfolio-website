'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GameLoader from '@/components/GameLoader';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/apps/admin/login');
    }
  }, [status, router]);

  // Handle session fetch errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('CLIENT_FETCH_ERROR')) {
        setError('Session fetch error. Please check your environment variables (NEXTAUTH_SECRET, NEXTAUTH_URL).');
        console.error('NextAuth configuration issue:', event);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-retro-dark">
        <div className="neon-box-pink p-8 max-w-lg">
          <h2 className="text-2xl font-bold text-retro-pink mb-4 font-mono">Configuration Error</h2>
          <p className="text-white/80 mb-4 font-mono text-sm">{error}</p>
          <button
            onClick={() => router.replace('/apps/admin/login')}
            className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-all font-mono"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return <GameLoader />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const sections = [
    { name: 'Hero Section', href: '/apps/admin/hero', description: 'Edit landing page content', color: 'purple' },
    { name: 'About Me', href: '/apps/admin/about', description: 'Manage about section', color: 'cyan' },
    { name: 'Skills', href: '/apps/admin/skills', description: 'Edit skills and categories', color: 'pink' },
    { name: 'Projects', href: '/apps/admin/projects', description: 'Manage project portfolio', color: 'purple' },
    { name: 'Certifications', href: '/apps/admin/certifications', description: 'Add/edit certifications', color: 'cyan' },
    { name: 'Experience', href: '/apps/admin/experience', description: 'Edit work experience', color: 'pink' },
    { name: 'Resume', href: '/apps/admin/resume', description: 'Upload resume file', color: 'purple' },
    { name: 'Contact', href: '/apps/admin/contact', description: 'Edit contact information', color: 'cyan' },
    { name: 'Footer', href: '/apps/admin/footer', description: 'Manage footer content', color: 'pink' },
  ];

  return (
    <div className="min-h-screen admin-bg relative" style={{ zIndex: 1 }}>
      <header className="bg-retro-darker border-b-2 border-retro-purple p-6 relative" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono uppercase neon-text text-retro-purple">
            {'<'} Admin Panel {'/>'} 
          </h1>
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="px-4 py-2 neon-box text-retro-cyan hover:shadow-neon-cyan transition-all font-mono uppercase"
            >
              View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/apps/admin/login' })}
              className="px-4 py-2 neon-box-pink text-retro-pink hover:shadow-neon-pink transition-all font-mono uppercase"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 relative" style={{ zIndex: 10 }}>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-retro-cyan mb-2 font-mono uppercase neon-text">
            Welcome, {session?.user?.name}
          </h2>
          <p className="text-retro-blue font-mono">
            {'>'} Manage all sections of your portfolio from here
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="retro-card p-6 group cursor-pointer block"
            >
              <h3 className={`text-2xl font-bold mb-2 font-mono uppercase neon-text ${
                section.color === 'purple' ? 'text-retro-purple' : 
                section.color === 'cyan' ? 'text-retro-cyan' : 'text-retro-pink'
              }`}>
                {'>'} {section.name}
              </h3>
              <p className="text-retro-blue font-mono">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
