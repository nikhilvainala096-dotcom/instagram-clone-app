import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { Plus } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function StoriesTray() {
  const { currentUser } = useAuth();
  const { stories, openStory, setIsCreateStoryOpen } = useFeed();

  // Find if current user has an active story
  const myStoryGroup = stories.find(s => s.user.id === currentUser?.id);

  return (
    <div className="w-full bg-white dark:bg-black border-b md:border border-zinc-200 dark:border-zinc-800 md:rounded-2xl py-4 px-3 mb-4 shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        {/* Current User Story / Add Story */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 select-none group">
          <div className="relative">
            {myStoryGroup ? (
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.username}
                size="lg"
                hasStory={true}
                hasUnseenStory={myStoryGroup.hasUnseen}
                onClick={() => openStory(myStoryGroup.id)}
              />
            ) : (
              <div
                onClick={() => setIsCreateStoryOpen(true)}
                className="cursor-pointer"
              >
                <Avatar
                  src={currentUser?.avatar}
                  alt={currentUser?.username}
                  size="lg"
                />
              </div>
            )}

            {/* Plus badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateStoryOpen(true);
              }}
              className="absolute bottom-0 right-0 w-5 h-5 bg-insta-blue hover:bg-insta-blue-hover text-white rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow transition-transform active:scale-90"
              title="Add story"
              aria-label="Add story"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            </button>
          </div>
          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[70px]">
            Your story
          </span>
        </div>

        {/* Other Users' Stories */}
        {stories
          .filter(s => s.user.id !== currentUser?.id)
          .map((storyGroup) => (
            <div
              key={storyGroup.id}
              onClick={() => openStory(storyGroup.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer select-none group"
            >
              <Avatar
                src={storyGroup.user.avatar}
                alt={storyGroup.user.username}
                size="lg"
                hasStory={true}
                hasUnseenStory={storyGroup.hasUnseen}
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[72px] group-hover:text-insta-pink transition-colors">
                {storyGroup.user.username}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

