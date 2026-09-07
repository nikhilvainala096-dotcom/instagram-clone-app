import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Sparkles, UserCheck } from 'lucide-react';

export default function LoginForm({ onSwitchToSignup }) {
  const { login, registeredUsers, switchDemoUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) {
      setError('Please enter your username or email');
      return;
    }

    setLoading(true);
    const res = await login(username, password);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-insta-blue hover:bg-insta-blue-hover text-white font-semibold text-sm transition-all duration-150 shadow-md shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      {/* Quick Demo Accounts */}
      <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Quick Demo Accounts (1-Click)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {registeredUsers.slice(0, 4).map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => switchDemoUser(user.id)}
              className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/70 hover:bg-zinc-200/70 dark:bg-zinc-850 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 text-left transition-colors group"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-insta-pink transition-colors">
                  @{user.username}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {user.fullName}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-insta-blue hover:text-insta-blue-hover font-semibold hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

