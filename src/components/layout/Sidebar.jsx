import React from 'react';
import {
  Home,
  Compass,
  PlusSquare,
  Bookmark,
  User,
  LogOut,
  Moon,
  Sun,
  Camera,
  Heart,
  Instagram
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../ui/Avatar';

export default function Sidebar({ currentView, setCurrentView }) {
  const { currentUser, logout } = useAuth();
  const { setIsCreatePostOpen, setIsCreateStoryOpen } = useFeed();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => setCurrentView('home'),
      active: currentView === 'home',
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      action: () => setCurrentView('explore'),
      active: currentView === 'explore',
    },
    {
      id: 'create',
      label: 'Create Post',
      icon: PlusSquare,
      action: () => setIsCreatePostOpen(true),
      highlight: true,
    },
    {
      id: 'story',
      label: 'Add Story',
      icon: Camera,
      action: () => setIsCreateStoryOpen(true),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      action: () => setCurrentView('profile'),
      active: currentView === 'profile',
      customIcon: (
        <Avatar
          src={currentUser?.avatar}
          alt={currentUser?.username}
          size="xs"
          className="border border-zinc-300 dark:border-zinc-700"
        />
      ),
    },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen z-30 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-3 py-6 transition-all duration-300 w-16 xl:w-60">
      <div className="flex flex-col gap-8">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView('home')}
          className="cursor-pointer px-2 flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
            <Instagram className="w-5 h-5" />
          </div>
          <span className="hidden xl:inline-block font-cursive text-3xl font-bold tracking-wide bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            instaaaaa
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'font-bold bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white'
                }`}
                title={item.label}
              >
                {item.customIcon ? (
                  item.customIcon
                ) : (
                  <Icon
                    className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'stroke-[2.5px] text-insta-pink'
                        : 'stroke-[1.8px]'
                    }`}
                  />
                )}
                <span className="hidden xl:inline-block truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls: theme switch & logout */}
      <div className="flex flex-col gap-1 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500 shrink-0" />
          )}
          <span className="hidden xl:inline-block">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          title="Log Out"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden xl:inline-block">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

