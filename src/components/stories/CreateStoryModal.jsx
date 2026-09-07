import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useFeed } from '../../context/FeedContext';
import { Camera, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';

const PRESET_STORIES = [
  {
    label: 'Golden Hour',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Cyber City',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Matcha Coffee',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Beach Sunset',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
];

export default function CreateStoryModal() {
  const { isCreateStoryOpen, setIsCreateStoryOpen, createStory } = useFeed();
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState('');

  const handleClose = () => {
    setIsCreateStoryOpen(false);
    setMediaUrl('');
    setCaption('');
    setPreview('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setMediaUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url) => {
    setPreview(url);
    setMediaUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaUrl) return;
    createStory({ mediaUrl, caption });
    handleClose();
  };

  return (
    <Modal
      isOpen={isCreateStoryOpen}
      onClose={handleClose}
      title="Add to Your Story"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
        {/* Preview Area */}
        <div className="relative w-full h-64 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
          {preview ? (
            <img
              src={preview}
              alt="Story Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <Camera className="w-10 h-10 stroke-[1.5px]" />
              <p className="text-xs">Select or upload a photo for your story</p>
            </div>
          )}

          {caption && preview && (
            <div className="absolute bottom-4 inset-x-4">
              <span className="bg-black/70 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full inline-block">
                {caption}
              </span>
            </div>
          )}
        </div>

        {/* Upload or Preset Selection */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Choose Photo
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESET_STORIES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset.url)}
                className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  preview === preset.url
                    ? 'border-insta-pink scale-95'
                    : 'border-transparent hover:opacity-80'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center py-0.5 truncate">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-medium cursor-pointer transition-colors border border-zinc-200 dark:border-zinc-700">
              <Upload className="w-4 h-4" />
              <span>Upload Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <span className="text-xs text-zinc-400">or</span>

            <input
              type="url"
              placeholder="Paste Image URL"
              value={mediaUrl.startsWith('data:') ? '' : mediaUrl}
              onChange={(e) => {
                setMediaUrl(e.target.value);
                setPreview(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue"
            />
          </div>
        </div>

        {/* Caption */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
            Story Caption (Optional)
          </label>
          <input
            type="text"
            placeholder="Add stickers or text vibes..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-insta-blue"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!mediaUrl}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 text-white font-semibold text-sm shadow-md shadow-rose-500/20 disabled:opacity-50 hover:opacity-95 transition-opacity"
          >
            Share to Story
          </button>
        </div>
      </form>
    </Modal>
  );
}

