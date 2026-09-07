import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Instagram, Smartphone, Heart, MessageCircle, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl w-full flex items-center justify-center gap-12">
        {/* Desktop Phone Mockup Banner */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-[360px] h-[580px] bg-zinc-900 rounded-[48px] p-3 shadow-2xl border-[6px] border-zinc-800">
          {/* Top speaker & camera */}
          <div className="absolute top-6 w-20 h-4 bg-zinc-950 rounded-full z-20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 mr-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900"></div>
          </div>

          {/* Screen Content Preview */}
          <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-black flex flex-col justify-between p-5">
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-xs">
                  📸
                </div>
                <span className="font-cursive text-xl font-bold text-white">instaaaaa</span>
              </div>
              <p className="text-xs text-zinc-400">
                Connect with friends, share your stories, and explore what is trending today.
              </p>
            </div>

            {/* Simulated mini card */}
            <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 shadow-lg mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="user"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-white">nikhil_p</span>
                <span className="text-[10px] text-zinc-400">• 2m</span>
              </div>
              <div className="h-36 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
                  alt="sample"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-zinc-400 pt-1">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-zinc-400">1,420 likes</span>
              </div>
            </div>

            <div className="pb-4 text-center">
              <span className="text-[11px] text-zinc-500 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Real-time interactive preview
              </span>
            </div>
          </div>
        </div>

        {/* Auth Box Container */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-850 dark:border-zinc-800 shadow-xl">
            {/* Header / Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 text-white shadow-lg shadow-rose-500/25 mb-3">
                <Instagram className="w-8 h-8" />
              </div>
              <h1 className="font-cursive text-4xl font-bold tracking-wide bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                instaaaaa
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                A modern Instagram experience
              </p>
            </div>

            {/* Form */}
            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>

          {/* Quick info */}
          <div className="text-center text-xs text-zinc-400">
            © 2026 instaaaaa from Nikhil Painala
          </div>
        </div>
      </div>
    </div>
  );
}

