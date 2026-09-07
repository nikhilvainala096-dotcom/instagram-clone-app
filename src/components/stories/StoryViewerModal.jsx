import React, { useState, useEffect, useRef } from 'react';
import { useFeed } from '../../context/FeedContext';
import { formatTimeAgo } from '../../utils/helpers';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import Avatar from '../ui/Avatar';

const SLIDE_DURATION = 5000; // 5 seconds per slide
const UPDATE_INTERVAL = 50; // Update progress every 50ms

export default function StoryViewerModal() {
  const {
    activeStoryGroup,
    activeStorySlideIndex,
    setActiveStorySlideIndex,
    closeStory,
    stories,
    openStory,
    showToast,
  } = useFeed();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [reactions, setReactions] = useState([]); // Floating reaction emojis

  const timerRef = useRef(null);

  const slides = activeStoryGroup?.slides || [];
  const currentSlide = slides[activeStorySlideIndex];

  // Navigate to next slide or next story group
  const handleNext = () => {
    if (!activeStoryGroup) return;

    if (activeStorySlideIndex < slides.length - 1) {
      setActiveStorySlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Find next story group
      const currentIndex = stories.findIndex(s => s.id === activeStoryGroup.id);
      if (currentIndex < stories.length - 1) {
        openStory(stories[currentIndex + 1].id, 0);
        setProgress(0);
      } else {
        closeStory();
      }
    }
  };

  // Navigate to previous slide or previous story group
  const handlePrev = () => {
    if (!activeStoryGroup) return;

    if (activeStorySlideIndex > 0) {
      setActiveStorySlideIndex(prev => prev - 1);
      setProgress(0);
    } else {
      // Find previous story group
      const currentIndex = stories.findIndex(s => s.id === activeStoryGroup.id);
      if (currentIndex > 0) {
        const prevGroup = stories[currentIndex - 1];
        openStory(prevGroup.id, prevGroup.slides.length - 1);
        setProgress(0);
      }
    }
  };

  // Auto-progress timer
  useEffect(() => {
    if (!activeStoryGroup || isPaused) return;

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, UPDATE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeStoryGroup, activeStorySlideIndex, isPaused, stories]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [activeStorySlideIndex, activeStoryGroup?.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!activeStoryGroup) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        closeStory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryGroup, activeStorySlideIndex, stories]);

  if (!activeStoryGroup || !currentSlide) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Reply sent to ${activeStoryGroup.user.username}: "${replyText}" 📩`, 'success');
    setReplyText('');
  };

  const handleQuickReaction = (emoji) => {
    const newReaction = { id: Date.now(), emoji, left: 30 + Math.random() * 40 };
    setReactions(prev => [...prev, newReaction]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 1500);

    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // ignore
    }
    showToast(`Sent ${emoji} reaction!`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none animate-fade-in">
      {/* Close button on desktop */}
      <button
        onClick={closeStory}
        className="hidden md:flex absolute top-6 right-6 p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-20"
        title="Close (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next navigation buttons on desktop */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-white bg-zinc-800/80 hover:bg-zinc-700/80 transition-transform active:scale-90 z-20 shadow-xl"
        title="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-white bg-zinc-800/80 hover:bg-zinc-700/80 transition-transform active:scale-90 z-20 shadow-xl"
        title="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Story Container */}
      <div
        className="relative w-full h-full md:h-[90vh] md:max-h-[800px] md:max-w-[430px] bg-zinc-950 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Top Gradient & Progress bars */}
        <div className="absolute top-0 inset-x-0 z-30 p-3 pt-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 w-full mb-3">
            {slides.map((s, idx) => {
              let fillWidth = 0;
              if (idx < activeStorySlideIndex) fillWidth = 100;
              else if (idx === activeStorySlideIndex) fillWidth = progress;

              return (
                <div
                  key={s.id}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ width: `${fillWidth}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* User Info Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar
                src={activeStoryGroup.user.avatar}
                alt={activeStoryGroup.user.username}
                size="sm"
              />
              <span className="text-sm font-semibold text-white truncate max-w-[150px]">
                {activeStoryGroup.user.username}
              </span>
              <span className="text-xs text-white/70">
                {formatTimeAgo(currentSlide.timestamp)}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeStory();
              }}
              className="md:hidden text-white/80 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Media Background */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
          <img
            src={currentSlide.mediaUrl}
            alt="Story content"
            className="w-full h-full object-cover select-none"
          />

          {/* Tap overlay targets for left / right navigation */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 cursor-pointer z-10"
            onClick={handlePrev}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/3 cursor-pointer z-10"
            onClick={handleNext}
          />

          {/* Story Caption (if any) */}
          {currentSlide.caption && (
            <div className="absolute bottom-24 inset-x-4 z-20">
              <div className="bg-black/60 backdrop-blur-md text-white text-sm px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg inline-block max-w-full">
                {currentSlide.caption}
              </div>
            </div>
          )}

          {/* Floating Emoji Reactions */}
          {reactions.map((r) => (
            <div
              key={r.id}
              className="absolute bottom-20 text-4xl animate-heart-burst pointer-events-none z-30"
              style={{ left: `${r.left}%` }}
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Bottom Interactive Bar */}
        <div
          className="absolute bottom-0 inset-x-0 z-30 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Emoji Reaction Buttons */}
          <div className="flex items-center justify-around py-1">
            {['❤️', '🔥', '👏', '😂', '😮', '🎉'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleQuickReaction(emoji)}
                className="text-2xl hover:scale-125 active:scale-95 transition-transform p-1"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Reply to ${activeStoryGroup.user.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2 text-sm rounded-full bg-white/15 border border-white/25 text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="p-2.5 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

