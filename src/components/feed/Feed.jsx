import React from 'react';
import StoriesTray from '../stories/StoriesTray';
import PostCard from './PostCard';
import SuggestionsBar from './SuggestionsBar';
import { useFeed } from '../../context/FeedContext';
import { Sparkles } from 'lucide-react';

export default function Feed({ onGoToProfile }) {
  const { posts } = useFeed();

  return (
    <div className="max-w-5xl mx-auto px-0 sm:px-4 py-0 sm:py-6 flex justify-center">
      {/* Central Feed Column */}
      <div className="w-full max-w-[630px] shrink-0">
        {/* Stories Tray */}
        <StoriesTray />

        {/* Posts Stream */}
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                No posts in your feed
              </h3>
              <p className="text-xs text-zinc-500">
                Share your first photo or follow more accounts to see updates!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Suggestions Column (Desktop only) */}
      <SuggestionsBar onGoToProfile={onGoToProfile} />
    </div>
  );
}

