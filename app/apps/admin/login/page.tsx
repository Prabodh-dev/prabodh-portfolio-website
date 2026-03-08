'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/apps/admin');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center admin-bg px-6">
      <div className="w-full max-w-md relative" style={{ zIndex: 10 }}>
        <div className="retro-card p-8">
          <h1 className="text-4xl font-bold text-retro-purple mb-2 text-center neon-text font-mono uppercase tracking-wider">
            Admin Login
          </h1>
          <p className="text-retro-cyan text-center mb-8 font-mono">{'>'} Access Control System</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-retro-pink font-mono mb-2 uppercase">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 neon-box bg-retro-darker text-retro-cyan font-mono focus:outline-none focus:shadow-neon-purple"
                required
              />
            </div>
            
            <div>
              <label className="block text-retro-pink font-mono mb-2 uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 neon-box bg-retro-darker text-retro-cyan font-mono focus:outline-none focus:shadow-neon-purple"
                required
              />
            </div>
            
            {error && (
              <p className="text-retro-pink text-sm font-mono neon-text">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 retro-btn font-mono font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Access System'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
