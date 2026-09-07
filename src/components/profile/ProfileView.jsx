import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import {
  Grid,
  Bookmark,
  UserCheck,
  Settings,
  Heart,
  MessageCircle,
  ExternalLink,
  PlusSquare,
  Sparkles
} from 'lucide-react';
import { formatNumber } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import EditProfileModal from './EditProfileModal';

export default function ProfileView() {
  const { currentUser } = useAuth();
  const { posts, savedPostIds, openPostDetail, stories, openStory, setIsCreatePostOpen, showToast } = useFeed();
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'tagged'
  const [isEditOpen, setIsEditOpen] = useState(false);

  // User posts
  const userPosts = posts.filter(p => p.user.id === currentUser?.id);

  // Saved posts
  const savedPosts = posts.filter(p => savedPostIds.includes(p.id));

  // Current user's story
  const myStoryGroup = stories.find(s => s.user.id === currentUser?.id);

  const displayedPosts = activeTab === 'posts' ? userPosts : savedPosts;

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied! 🔗', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 mb-8 sm:mb-12">
        {/* Profile Avatar */}
        <div className="shrink-0">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.username}
            size="2xl"
            hasStory={!!myStoryGroup}
            hasUnseenStory={myStoryGroup?.hasUnseen}
            onClick={myStoryGroup ? () => openStory(myStoryGroup.id) : undefined}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          {/* Top Line: Username & Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {currentUser?.username}
            </h2>

            <button
              onClick={() => setIsEditOpen(true)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              Edit profile
            </button>

            <button
              onClick={handleShareProfile}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              Share profile
            </button>
          </div>

          {/* Stats Bar (Desktop) */}
          <div className="hidden sm:flex items-center gap-8 mb-4 text-sm">
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {userPosts.length}
              </span>{' '}
              <span className="text-zinc-500">posts</span>
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {formatNumber(currentUser?.followersCount || 1420)}
              </span>{' '}
              <span className="text-zinc-500">followers</span>
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {formatNumber(currentUser?.followingCount || 380)}
              </span>{' '}
              <span className="text-zinc-500">following</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-1 text-sm">
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              {currentUser?.fullName}
            </p>
            {currentUser?.bio && (
              <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
                {currentUser.bio}
              </p>
            )}
            {currentUser?.website && (
              <a
                href={currentUser.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-insta-blue hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{currentUser.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar (Mobile) */}
      <div className="sm:hidden flex items-center justify-around py-3 border-y border-zinc-200 dark:border-zinc-800 mb-4 text-xs text-center">
        <div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            {userPosts.length}
          </p>
          <p className="text-zinc-500">posts</p>
        </div>
        <div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            {formatNumber(currentUser?.followersCount || 1420)}
          </p>
          <p className="text-zinc-500">followers</p>
        </div>
        <div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            {formatNumber(currentUser?.followingCount || 380)}
          </p>
          <p className="text-zinc-500">following</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center justify-center gap-12 border-t border-zinc-200 dark:border-zinc-800 text-xs font-semibold tracking-wider uppercase">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 py-3.5 border-t -mt-px transition-colors ${
            activeTab === 'posts'
              ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100'
              : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Posts</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 py-3.5 border-t -mt-px transition-colors ${
            activeTab === 'saved'
              ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100'
              : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
      </div>

      {/* Posts Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-2">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => openPostDetail(post)}
              className="group relative aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer rounded-sm sm:rounded-lg"
            >
              <img
                src={post.image}
                alt={post.caption || 'User post'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white stroke-none" />
                  <span>{formatNumber(post.likesCount)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>{post.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 mb-4">
            {activeTab === 'posts' ? (
              <Grid className="w-8 h-8 stroke-[1.5px]" />
            ) : (
              <Bookmark className="w-8 h-8 stroke-[1.5px]" />
            )}
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {activeTab === 'posts' ? 'Share Photos' : 'Save Posts'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
            {activeTab === 'posts'
              ? 'When you share photos, they will appear on your profile.'
              : 'Save photos and videos that you want to see again. No one is notified.'}
          </p>
          {activeTab === 'posts' && (
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="text-xs font-semibold text-insta-blue hover:text-insta-blue-hover"
            >
              Share your first photo
            </button>
          )}
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}

