import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Smile
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { formatTimeAgo, formatNumber } from '../../utils/helpers';
import Avatar from '../ui/Avatar';

export default function PostCard({ post }) {
  const { currentUser } = useAuth();
  const {
    toggleLikePost,
    addComment,
    toggleLikeComment,
    toggleSavePost,
    openPostDetail,
    showToast,
  } = useFeed();

  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showFullCaption, setShowFullCaption] = useState(false);
  const lastTapRef = useRef(0);
  const commentInputRef = useRef(null);

  // Double tap to like
  const handleImageTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (!post.isLiked) {
        toggleLikePost(post.id);
      }
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
    lastTapRef.current = now;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard! 🔗', 'info');
    } else {
      showToast('Sharing post...', 'info');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
  };

  const isAuthor = currentUser?.id === post.user.id;

  return (
    <article className="w-full bg-white dark:bg-black border-y md:border border-zinc-200 dark:border-zinc-800 md:rounded-2xl overflow-hidden mb-4 shadow-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={post.user.avatar}
            alt={post.user.username}
            size="sm"
            isVerified={post.user.isVerified}
          />
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-semibold hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">
                {post.user.username}
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatTimeAgo(post.timestamp)}
              </span>
            </div>
            {post.location && (
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-0.5 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => openPostDetail(post)}
          className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Media Image Container with Double Tap Heart */}
      <div
        className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-900 cursor-pointer select-none overflow-hidden"
        onClick={handleImageTap}
      >
        <img
          src={post.image}
          alt={post.caption || 'Post media'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.01]"
          loading="lazy"
        />

        {/* Double-tap Floating Heart Burst */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Heart className="w-28 h-28 text-white fill-rose-500 stroke-rose-500 filter drop-shadow-2xl animate-heart-burst" />
          </div>
        )}
      </div>

      {/* Post Actions Bar */}
      <div className="px-3.5 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-4">
            {/* Like button */}
            <button
              onClick={() => toggleLikePost(post.id)}
              className="transition-transform active:scale-125 focus:outline-none"
              aria-label={post.isLiked ? 'Unlike' : 'Like'}
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  post.isLiked
                    ? 'text-rose-500 fill-rose-500 stroke-rose-500'
                    : 'text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 stroke-[1.8px]'
                }`}
              />
            </button>

            {/* Comment button */}
            <button
              onClick={() => {
                if (commentInputRef.current) {
                  commentInputRef.current.focus();
                } else {
                  openPostDetail(post);
                }
              }}
              className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 transition-colors active:scale-110"
              aria-label="Comment"
            >
              <MessageCircle className="w-6 h-6 stroke-[1.8px]" />
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleShare}
              className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 transition-colors active:scale-110"
              aria-label="Share"
            >
              <Send className="w-6 h-6 stroke-[1.8px]" />
            </button>
          </div>

          {/* Bookmark / Save button */}
          <button
            onClick={() => toggleSavePost(post.id)}
            className="transition-transform active:scale-110"
            aria-label={post.isSaved ? 'Unsave' : 'Save'}
          >
            <Bookmark
              className={`w-6 h-6 transition-colors ${
                post.isSaved
                  ? 'text-zinc-900 dark:text-zinc-100 fill-zinc-900 dark:fill-zinc-100'
                  : 'text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 stroke-[1.8px]'
              }`}
            />
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
          {formatNumber(post.likesCount)} {post.likesCount === 1 ? 'like' : 'likes'}
        </p>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm text-zinc-900 dark:text-zinc-100 mb-1 leading-snug">
            <span className="font-semibold mr-2">{post.user.username}</span>
            <span>
              {showFullCaption || post.caption.length <= 90
                ? post.caption
                : `${post.caption.slice(0, 90)}...`}
            </span>
            {post.caption.length > 90 && !showFullCaption && (
              <button
                onClick={() => setShowFullCaption(true)}
                className="text-zinc-400 text-xs ml-1 hover:underline font-medium"
              >
                more
              </button>
            )}
          </div>
        )}

        {/* Comments preview */}
        {post.comments && post.comments.length > 0 && (
          <div className="mt-1">
            {post.comments.length > 2 && (
              <button
                onClick={() => openPostDetail(post)}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:underline block mb-1"
              >
                View all {post.comments.length} comments
              </button>
            )}

            <div className="space-y-1">
              {post.comments.slice(-2).map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center justify-between text-xs group"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold mr-1.5 text-zinc-900 dark:text-zinc-200">
                      {comment.user.username}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {comment.text}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleLikeComment(post.id, comment.id)}
                    className="shrink-0 p-0.5 text-zinc-400 hover:text-rose-500"
                    aria-label="Like comment"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        comment.isLiked
                          ? 'text-rose-500 fill-rose-500'
                          : 'stroke-[2px]'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inline Add Comment Form */}
      <form
        onSubmit={handleAddComment}
        className="flex items-center px-3.5 py-2.5 border-t border-zinc-100 dark:border-zinc-800/80 gap-2"
      >
        <input
          ref={commentInputRef}
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="flex-1 text-xs bg-transparent placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 focus:outline-none"
        />

        {commentInput.trim() && (
          <button
            type="submit"
            className="text-xs font-semibold text-insta-blue hover:text-insta-blue-hover transition-colors"
          >
            Post
          </button>
        )}
      </form>
    </article>
  );
}

