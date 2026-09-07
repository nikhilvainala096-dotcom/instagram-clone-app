import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { Camera } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useFeed();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    website: '',
    avatar: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        website: currentUser.website || '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    showToast('Profile updated successfully! ✨', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
        {/* Avatar edit */}
        <div className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-850 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Avatar src={formData.avatar} alt="Current profile photo" size="lg" />
          <div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              {currentUser?.username}
            </span>
            <label className="text-xs font-semibold text-insta-blue hover:text-insta-blue-hover cursor-pointer mt-1 inline-block">
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-insta-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-insta-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Website
          </label>
          <input
            type="text"
            name="website"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-insta-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Bio
          </label>
          <textarea
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-insta-blue resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-insta-blue hover:bg-insta-blue-hover text-white font-semibold text-sm shadow-md shadow-sky-500/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

