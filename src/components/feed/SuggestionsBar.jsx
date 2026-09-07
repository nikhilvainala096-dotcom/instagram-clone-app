import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import Avatar from '../ui/Avatar';

export default function SuggestionsBar({ onGoToProfile }) {
  const { currentUser, registeredUsers, switchDemoUser } = useAuth();
  const { showToast } = useFeed();
  const [followingMap, setFollowingMap] = useState({});
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  // Suggestions: exclude current user
  const suggestions = registeredUsers.filter(u => u.id !== currentUser?.id).slice(0, 5);

  const toggleFollow = (userId, username) => {
    setFollowingMap(prev => {
      const isFollowing = !!prev[userId];
      const nextState = !isFollowing;
      showToast(nextState ? `Followed @${username}` : `Unfollowed @${username}`, 'info');
      return { ...prev, [userId]: nextState };
    });
  };

  return (
    <aside className="hidden lg:block w-80 shrink-0 pt-4 pl-6 select-none">
      {/* Current User Card */}
      <div className="flex items-center justify-between mb-6">
        <div
          onClick={onGoToProfile}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.username}
            size="md"
            isVerified={currentUser?.isVerified}
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-insta-pink transition-colors">
              {currentUser?.username}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {currentUser?.fullName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSwitchModal(prev => !prev)}
          className="text-xs font-semibold text-insta-blue hover:text-insta-blue-hover transition-colors"
        >
          Switch
        </button>
      </div>

      {/* Switch Account Quick Popover */}
      {showSwitchModal && (
        <div className="mb-6 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
            Switch to Account
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {registeredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  switchDemoUser(user.id);
                  setShowSwitchModal(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                  user.id === currentUser?.id
                    ? 'bg-insta-blue/10 text-insta-blue font-semibold'
                    : 'hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="truncate">@{user.username}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Suggested for you
          </span>
          <button
            onClick={() => showToast('Showing all suggested accounts')}
            className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 hover:text-zinc-500 transition-colors"
          >
            See All
          </button>
        </div>

        <div className="space-y-3">
          {suggestions.map((user) => {
            const isFollowing = !!followingMap[user.id];

            return (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    size="sm"
                    isVerified={user.isVerified}
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate hover:underline cursor-pointer">
                      {user.username}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {user.fullName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(user.id, user.username)}
                  className={`text-xs font-semibold transition-colors shrink-0 ml-2 ${
                    isFollowing
                      ? 'text-zinc-500 dark:text-zinc-400 hover:text-rose-500'
                      : 'text-insta-blue hover:text-insta-blue-hover'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meta Footer */}
      <footer className="text-[11px] text-zinc-400 dark:text-zinc-500 space-y-3">
        <nav className="flex flex-wrap gap-x-2 gap-y-1">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language'].map((item) => (
            <span key={item} className="hover:underline cursor-pointer">
              {item}
            </span>
          ))}
        </nav>
        <p>© 2026 INSTAAAAA FROM NIKHIL PAINALA</p>
      </footer>
    </aside>
  );
}

