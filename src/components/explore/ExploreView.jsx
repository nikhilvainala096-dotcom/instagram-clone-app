import React, { useState } from 'react';
import { EXPLORE_POSTS } from '../../data/mockData';
import { useFeed } from '../../context/FeedContext';
import { Search, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { formatNumber } from '../../utils/helpers';

const CATEGORIES = ['All', 'Architecture', 'Nature', 'Tech', 'Food', 'Design', 'Travel'];

export default function ExploreView() {
  const { openPostDetail } = useFeed();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = EXPLORE_POSTS.filter(post => {
    if (searchTerm) {
      return post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (activeCategory === 'All') return true;
    return post.title?.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleOpenExploreItem = (item) => {
    // Convert explore item into standard post format to open in modal
    const mockPost = {
      id: item.id,
      user: {
        id: 'explore_creator',
        username: 'explore.creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      image: item.image,
      caption: item.title || 'Exploring aesthetics and inspiring moments ✨ #explore #instaaaaa',
      location: 'Explore Discoveries',
      timestamp: new Date().toISOString(),
      likesCount: item.likesCount,
      isLiked: false,
      isSaved: false,
      comments: [
        {
          id: 'exp_c1',
          user: {
            username: 'wanderlust_guru',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          },
          text: 'This composition is breathtaking! 🔥',
          timestamp: new Date().toISOString(),
          likesCount: 5,
        }
      ]
    };

    openPostDetail(mockPost);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Search Input Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search topics, tags, or aesthetic inspiration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue focus:ring-1 focus:ring-insta-blue transition-all"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-4">
        {filteredPosts.map((post, idx) => {
          const isTall = idx % 5 === 0;

          return (
            <div
              key={post.id}
              onClick={() => handleOpenExploreItem(post)}
              className={`group relative overflow-hidden rounded-md sm:rounded-xl cursor-pointer bg-zinc-100 dark:bg-zinc-900 ${
                isTall ? 'sm:row-span-2 aspect-[1/1] sm:aspect-[1/2]' : 'aspect-square'
              }`}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Stats Overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="self-end">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold line-clamp-2 mb-2">{post.title}</p>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-white stroke-none" />
                      <span>{formatNumber(post.likesCount)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

