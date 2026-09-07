import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function SignupForm({ onSwitchToLogin }) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email address is required');
      return;
    }

    setLoading(true);
    const res = await signup(formData);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Failed to sign up');
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-center text-zinc-500 dark:text-zinc-400 mb-4">
        Sign up to see photos and videos from your friends.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <div>
          <input
            type="email"
            name="email"
            placeholder="Mobile Number or Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
          By signing up, you agree to our Terms, Privacy Policy, and Cookies Policy.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 hover:opacity-95 text-white font-semibold text-sm transition-all duration-150 shadow-md shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-insta-blue hover:text-insta-blue-hover font-semibold hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

