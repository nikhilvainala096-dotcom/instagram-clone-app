import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POSTS, INITIAL_STORIES } from '../data/mockData';
import { storage, generateId } from '../utils/helpers';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

const FeedContext = createContext();

const STORAGE_KEY_POSTS = 'instaaaaa_feed_posts';
const STORAGE_KEY_STORIES = 'instaaaaa_feed_stories';
const STORAGE_KEY_SAVED = 'instaaaaa_saved_posts';

export function FeedProvider({ children }) {
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState(() => {
    return storage.get(STORAGE_KEY_POSTS, INITIAL_POSTS);
  });

  const [stories, setStories] = useState(() => {
    return storage.get(STORAGE_KEY_STORIES, INITIAL_STORIES);
  });

  const [savedPostIds, setSavedPostIds] = useState(() => {
    return storage.get(STORAGE_KEY_SAVED, ['post_2']);
  });

  const [activeStoryGroup, setActiveStoryGroup] = useState(null);
  const [activeStorySlideIndex, setActiveStorySlideIndex] = useState(0);
  const [activePostDetail, setActivePostDetail] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync with local storage
  useEffect(() => {
    storage.set(STORAGE_KEY_POSTS, posts);
  }, [posts]);

  useEffect(() => {
    storage.set(STORAGE_KEY_STORIES, stories);
  }, [stories]);

  useEffect(() => {
    storage.set(STORAGE_KEY_SAVED, savedPostIds);
  }, [savedPostIds]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3000);
  };

  const toggleLikePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          const likesCount = isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
          
          if (isLiked) {
            // Little celebratory micro-burst
            try {
              confetti({
                particleCount: 24,
                spread: 45,
                origin: { y: 0.7 },
                colors: ['#E1306C', '#FD1D1D', '#F77737']
              });
            } catch (e) {
              // ignore
            }
          }

          const updated = { ...post, isLiked, likesCount };
          if (activePostDetail && activePostDetail.id === postId) {
            setActivePostDetail(updated);
          }
          return updated;
        }
        return post;
      })
    );
  };

  const addComment = (postId, text) => {
    if (!text.trim() || !currentUser) return;

    const newComment = {
      id: `c_${generateId()}`,
      user: currentUser,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = [...(post.comments || []), newComment];
          const updated = { ...post, comments: updatedComments };
          if (activePostDetail && activePostDetail.id === postId) {
            setActivePostDetail(updated);
          }
          return updated;
        }
        return post;
      })
    );

    showToast('Comment posted! 💬', 'success');
  };

  const toggleLikeComment = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = (post.comments || []).map(c => {
            if (c.id === commentId) {
              const isLiked = !c.isLiked;
              return {
                ...c,
                isLiked,
                likesCount: isLiked ? (c.likesCount || 0) + 1 : Math.max(0, (c.likesCount || 0) - 1),
              };
            }
            return c;
          });
          const updated = { ...post, comments: updatedComments };
          if (activePostDetail && activePostDetail.id === postId) {
            setActivePostDetail(updated);
          }
          return updated;
        }
        return post;
      })
    );
  };

  const deleteComment = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = (post.comments || []).filter(c => c.id !== commentId);
          const updated = { ...post, comments: updatedComments };
          if (activePostDetail && activePostDetail.id === postId) {
            setActivePostDetail(updated);
          }
          return updated;
        }
        return post;
      })
    );
    showToast('Comment deleted', 'info');
  };

  const toggleSavePost = (postId) => {
    setSavedPostIds(prev => {
      const exists = prev.includes(postId);
      const updated = exists ? prev.filter(id => id !== postId) : [...prev, postId];
      showToast(exists ? 'Post removed from saved' : 'Post saved to collection! 🔖', 'info');
      return updated;
    });

    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );

    if (activePostDetail && activePostDetail.id === postId) {
      setActivePostDetail(prev => ({ ...prev, isSaved: !prev.isSaved }));
    }
  };

  const createPost = ({ image, caption, location }) => {
    if (!currentUser || !image) return;

    const newPost = {
      id: `post_${generateId()}`,
      user: currentUser,
      image,
      caption: caption || '',
      location: location || '',
      timestamp: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
    };

    setPosts(prev => [newPost, ...prev]);
    setIsCreatePostOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    showToast('Your post was shared! 📸', 'success');
  };

  const createStory = ({ mediaUrl, caption }) => {
    if (!currentUser || !mediaUrl) return;

    const newSlide = {
      id: `slide_${generateId()}`,
      mediaUrl,
      caption: caption || '',
      timestamp: new Date().toISOString(),
    };

    setStories(prevStories => {
      const userStoryGroupIndex = prevStories.findIndex(
        s => s.user.id === currentUser.id
      );

      if (userStoryGroupIndex >= 0) {
        const updatedGroup = {
          ...prevStories[userStoryGroupIndex],
          hasUnseen: true,
          slides: [newSlide, ...prevStories[userStoryGroupIndex].slides],
        };
        const next = [...prevStories];
        next.splice(userStoryGroupIndex, 1);
        return [updatedGroup, ...next];
      } else {
        const newGroup = {
          id: `story_group_${currentUser.id}`,
          user: currentUser,
          hasUnseen: true,
          slides: [newSlide],
        };
        return [newGroup, ...prevStories];
      }
    });

    setIsCreateStoryOpen(false);
    showToast('Story added to your profile! 🌟', 'success');
  };

  const openStory = (storyGroupId, slideIndex = 0) => {
    const group = stories.find(s => s.id === storyGroupId);
    if (group) {
      setActiveStoryGroup(group);
      setActiveStorySlideIndex(slideIndex);
      markStorySeen(storyGroupId);
    }
  };

  const closeStory = () => {
    setActiveStoryGroup(null);
    setActiveStorySlideIndex(0);
  };

  const markStorySeen = (storyGroupId) => {
    setStories(prev =>
      prev.map(s => (s.id === storyGroupId ? { ...s, hasUnseen: false } : s))
    );
  };

  const openPostDetail = (post) => {
    setActivePostDetail(post);
  };

  const closePostDetail = () => {
    setActivePostDetail(null);
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        stories,
        savedPostIds,
        activeStoryGroup,
        activeStorySlideIndex,
        setActiveStorySlideIndex,
        activePostDetail,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isCreateStoryOpen,
        setIsCreateStoryOpen,
        toast,
        showToast,
        toggleLikePost,
        addComment,
        toggleLikeComment,
        deleteComment,
        toggleSavePost,
        createPost,
        createStory,
        openStory,
        closeStory,
        markStorySeen,
        openPostDetail,
        closePostDetail,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => useContext(FeedContext);

