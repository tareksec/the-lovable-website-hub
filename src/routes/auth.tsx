import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/auth')({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: 'Admin Sign In | Bangladesh Executive Chamber' },
      { name: 'description', content: 'Secure sign in for the BEC content administration panel.' },
      { name: 'robots', content: 'noindex' },
      { property: 'og:title', content: 'Admin Sign In | Bangladesh Executive Chamber' },
      { property: 'og:description', content: 'Secure sign in for the BEC content administration panel.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: '/admin' });
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Signed in');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success('Account created. You can sign in now.');
        setMode('signin');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#08735d] font-extrabold text-white">
            BEC
          </div>
          <h1 className="text-2xl font-extrabold text-[#14202d]">
            {mode === 'signin' ? 'Admin Sign In' : 'Create Admin Account'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Bangladesh Executive Chamber control panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#08735d]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#08735d]"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-[#08735d] py-2.5 font-semibold text-white transition hover:bg-[#065c4a] disabled:opacity-60"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-5 w-full text-sm text-gray-500 hover:text-[#08735d]"
        >
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
