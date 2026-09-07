import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useFeed } from '../../context/FeedContext';
import { useAuth } from '../../context/AuthContext';
import { Image, Upload, MapPin, Sparkles, Smile } from 'lucide-react';
import Avatar from '../ui/Avatar';

const SAMPLE_POST_IMAGES = [
  {
    label: 'Tokyo Streets',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1080&auto=format&fit=crop&q=80',
  },
  {
    label: 'Mountain Lake',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&auto=format&fit=crop&q=80',
  },
  {
    label: 'Minimal Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1080&auto=format&fit=crop&q=80',
  },
  {
    label: 'Sunset Beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80',
  },
  {
    label: 'Coffee & Laptop',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&auto=format&fit=crop&q=80',
  },
  {
    label: 'Aesthetic Desert',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1080&auto=format&fit=crop&q=80',
  },
];

export default function CreatePostModal() {
  const { isCreatePostOpen, setIsCreatePostOpen, createPost } = useFeed();
  const { currentUser } = useAuth();

  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState('');

  const handleClose = () => {
    setIsCreatePostOpen(false);
    setImageUrl('');
    setCaption('');
    setLocation('');
    setPreview('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (url) => {
    setPreview(url);
    setImageUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl) return;
    createPost({
      image: imageUrl,
      caption,
      location,
    });
    handleClose();
  };

  const addEmoji = (emoji) => {
    setCaption(prev => prev + emoji);
  };

  return (
    <Modal
      isOpen={isCreatePostOpen}
      onClose={handleClose}
      title="Create new post"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col gap-4">
        {/* User preview header */}
        <div className="flex items-center gap-3">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.username}
            size="sm"
          />
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {currentUser?.username}
          </span>
        </div>

        {/* Media Preview Box */}
        <div className="relative w-full aspect-square max-h-72 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
          {preview ? (
            <img
              src={preview}
              alt="Post preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2.5 text-zinc-400 p-4 text-center">
              <Image className="w-12 h-12 stroke-[1.2px]" />
              <p className="text-sm font-medium">Select a photo to share</p>
              <p className="text-xs text-zinc-500">Upload a file or choose one of the sample images below</p>
            </div>
          )}
        </div>

        {/* Choose sample image or upload */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Sample Photos
          </label>
          <div className="grid grid-cols-6 gap-1.5 mb-3">
            {SAMPLE_POST_IMAGES.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleSelectSample(sample.url)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  preview === sample.url
                    ? 'border-insta-blue scale-95'
                    : 'border-transparent hover:opacity-80'
                }`}
                title={sample.label}
              >
                <img
                  src={sample.url}
                  alt={sample.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-medium cursor-pointer transition-colors border border-zinc-200 dark:border-zinc-700">
              <Upload className="w-4 h-4" />
              <span>Upload from device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <span className="text-xs text-zinc-400">or</span>

            <input
              type="url"
              placeholder="Paste Image URL"
              value={imageUrl.startsWith('data:') ? '' : imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setPreview(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue"
            />
          </div>
        </div>

        {/* Location Input */}
        <div>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Add location (e.g. San Francisco, California)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue"
            />
          </div>
        </div>

        {/* Caption Input */}
        <div>
          <textarea
            rows={3}
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue resize-none"
          />
          {/* Quick emoji picks */}
          <div className="flex items-center gap-1.5 mt-1.5">
            {['✨', '🔥', '📸', '🚀', '🌴', '☕️', '❤️'].map((em) => (
              <button
                key={em}
                type="button"
                onClick={() => addEmoji(em)}
                className="text-base p-1 hover:scale-125 transition-transform"
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!imageUrl}
            className="px-6 py-2 rounded-xl bg-insta-blue hover:bg-insta-blue-hover text-white font-semibold text-sm shadow-md shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Share Post
          </button>
        </div>
      </form>
    </Modal>
  );
}

