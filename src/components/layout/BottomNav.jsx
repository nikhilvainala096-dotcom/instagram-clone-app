import React from 'react';
import { Home, Compass, PlusSquare, Bookmark, User, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import Avatar from '../ui/Avatar';

export default function BottomNav({ currentView, setCurrentView }) {
  const { currentUser } = useAuth();
  const { setIsCreatePostOpen, setIsCreateStoryOpen } = useFeed();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-around safe-area-bottom">
      <button
        onClick={() => setCurrentView('home')}
        className={`p-2 transition-transform active:scale-90 ${
          currentView === 'home' ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
        }`}
        aria-label="Home"
      >
        <Home className={`w-6 h-6 ${currentView === 'home' ? 'stroke-[2.5px] text-insta-pink' : 'stroke-[1.8px]'}`} />
      </button>

      <button
        onClick={() => setCurrentView('explore')}
        className={`p-2 transition-transform active:scale-90 ${
          currentView === 'explore' ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
        }`}
        aria-label="Explore"
      >
        <Compass className={`w-6 h-6 ${currentView === 'explore' ? 'stroke-[2.5px] text-insta-pink' : 'stroke-[1.8px]'}`} />
      </button>

      <button
        onClick={() => setIsCreatePostOpen(true)}
        className="p-1.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 rounded-xl text-white shadow-md active:scale-95 transition-transform"
        aria-label="Create Post"
      >
        <PlusSquare className="w-6 h-6 stroke-[2px]" />
      </button>

      <button
        onClick={() => setIsCreateStoryOpen(true)}
        className="p-2 text-zinc-500 dark:text-zinc-400 active:scale-90 transition-transform"
        aria-label="Add Story"
      >
        <Camera className="w-6 h-6 stroke-[1.8px]" />
      </button>

      <button
        onClick={() => setCurrentView('profile')}
        className={`p-1 transition-transform active:scale-90 ${
          currentView === 'profile' ? 'ring-2 ring-insta-pink rounded-full' : ''
        }`}
        aria-label="Profile"
      >
        <Avatar
          src={currentUser?.avatar}
          alt={currentUser?.username}
          size="xs"
        />
      </button>
    </nav>
  );
}

