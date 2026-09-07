import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import Toast from '../ui/Toast';
import CreatePostModal from '../feed/CreatePostModal';
import CreateStoryModal from '../stories/CreateStoryModal';
import StoryViewerModal from '../stories/StoryViewerModal';
import PostDetailModal from '../feed/PostDetailModal';

export default function Layout({ currentView, setCurrentView, children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-16 xl:pl-60">
        {/* Mobile Top Header */}
        <MobileHeader onLogoClick={() => setCurrentView('home')} />

        {/* View Content */}
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>

      {/* Overlays / Modals */}
      <Toast />
      <CreatePostModal />
      <CreateStoryModal />
      <StoryViewerModal />
      <PostDetailModal />
    </div>
  );
}

