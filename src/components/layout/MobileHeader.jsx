import React from 'react';
import { Instagram, Sun, Moon, LogOut, PlusSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';

export default function MobileHeader({ onLogoClick }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { setIsCreateStoryOpen } = useFeed();

  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div
        onClick={onLogoClick}
        className="flex items-center gap-2 cursor-pointer active:opacity-75 transition-opacity"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white shadow-sm">
          <Instagram className="w-4 h-4" />
        </div>
        <span className="font-cursive text-2xl font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          instaaaaa
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500" />
          )}
        </button>

        <button
          onClick={logout}
          className="p-1.5 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          aria-label="Log Out"
          title="Log Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

