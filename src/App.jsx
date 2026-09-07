import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Layout from './components/layout/Layout';
import Feed from './components/feed/Feed';
import ExploreView from './components/explore/ExploreView';
import ProfileView from './components/profile/ProfileView';

export default function App() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'explore' | 'profile'

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'home' && (
        <Feed onGoToProfile={() => setCurrentView('profile')} />
      )}
      {currentView === 'explore' && <ExploreView />}
      {currentView === 'profile' && <ProfileView />}
    </Layout>
  );
}

