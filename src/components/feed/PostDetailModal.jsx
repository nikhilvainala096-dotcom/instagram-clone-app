import React, { useState } from 'react';
import { useFeed } from '../../context/FeedContext';
import { useAuth } from '../../context/AuthContext';
import { formatTimeAgo, formatNumber } from '../../utils/helpers';
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Trash2,
  MapPin,
} from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function PostDetailModal() {
  const {
    activePostDetail,
    closePostDetail,
    toggleLikePost,
    addComment,
    toggleLikeComment,
    deleteComment,
    toggleSavePost,
    showToast,
  } = useFeed();
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!activePostDetail) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(activePostDetail.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard! 🔗', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Background click */}
      <div
        className="fixed inset-0"
        onClick={closePostDetail}
        aria-hidden="true"
      />

      {/* Close button top right */}
      <button
        onClick={closePostDetail}
        className="hidden md:flex absolute top-6 right-6 p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-20"
        title="Close (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl h-[90vh] max-h-[720px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Media Image */}
        <div className="w-full md:w-[58%] h-72 md:h-full bg-black flex items-center justify-center relative overflow-hidden">
          <img
            src={activePostDetail.image}
            alt={activePostDetail.caption || 'Post detail'}
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        {/* Right Side: Details & Comments */}
        <div className="w-full md:w-[42%] flex-1 flex flex-col justify-between bg-white dark:bg-zinc-950">
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Avatar
                src={activePostDetail.user.avatar}
                alt={activePostDetail.user.username}
                size="sm"
                isVerified={activePostDetail.user.isVerified}
              />
              <div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {activePostDetail.user.username}
                </span>
                {activePostDetail.location && (
                  <p className="text-[11px] text-zinc-400 flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{activePostDetail.location}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={closePostDetail}
              className="md:hidden p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Comments Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {/* Caption as first comment item */}
            {activePostDetail.caption && (
              <div className="flex items-start gap-3">
                <Avatar
                  src={activePostDetail.user.avatar}
                  alt={activePostDetail.user.username}
                  size="xs"
                />
                <div className="flex-1">
                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    <span className="font-semibold mr-1.5 text-zinc-900 dark:text-zinc-100">
                      {activePostDetail.user.username}
                    </span>
                    {activePostDetail.caption}
                  </p>
                  <span className="text-[10px] text-zinc-400 block mt-1">
                    {formatTimeAgo(activePostDetail.timestamp)}
                  </span>
                </div>
              </div>
            )}

            {/* Comments List */}
            {activePostDetail.comments?.length > 0 ? (
              activePostDetail.comments.map((comment) => {
                const isCommentAuthor = currentUser?.id === comment.user.id;

                return (
                  <div key={comment.id} className="flex items-start gap-3 group">
                    <Avatar
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      size="xs"
                    />
                    <div className="flex-1">
                      <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                        <span className="font-semibold mr-1.5 text-zinc-900 dark:text-zinc-100">
                          {comment.user.username}
                        </span>
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-400">
                        <span>{formatTimeAgo(comment.timestamp)}</span>
                        {comment.likesCount > 0 && (
                          <span>{comment.likesCount} likes</span>
                        )}
                        {isCommentAuthor && (
                          <button
                            onClick={() =>
                              deleteComment(activePostDetail.id, comment.id)
                            }
                            className="text-rose-400 hover:text-rose-500 font-medium flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        toggleLikeComment(activePostDetail.id, comment.id)
                      }
                      className="p-1 text-zinc-400 hover:text-rose-500 transition-colors"
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
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-zinc-400">
                No comments yet. Be the first to comment! 💭
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(activePostDetail.id)}
                  className="transition-transform active:scale-125"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      activePostDetail.isLiked
                        ? 'text-rose-500 fill-rose-500 stroke-rose-500'
                        : 'text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 stroke-[1.8px]'
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 transition-transform active:scale-110"
                >
                  <Send className="w-6 h-6 stroke-[1.8px]" />
                </button>
              </div>

              <button
                onClick={() => toggleSavePost(activePostDetail.id)}
                className="transition-transform active:scale-110"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    activePostDetail.isSaved
                      ? 'text-zinc-900 dark:text-zinc-100 fill-zinc-900 dark:fill-zinc-100'
                      : 'text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 stroke-[1.8px]'
                  }`}
                />
              </button>
            </div>

            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-0.5">
              {formatNumber(activePostDetail.likesCount)} likes
            </p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2.5">
              {formatTimeAgo(activePostDetail.timestamp)}
            </p>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-850">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 text-xs bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="text-xs font-semibold text-insta-blue hover:text-insta-blue-hover disabled:opacity-40 transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

