
import React, { useState, useCallback } from 'react';
// Fix: Import `useAuth` from the correct file `./hooks/useAuth`.
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AuthView from './components/views/AuthView';
import HomeView from './components/views/HomeView';
import HoroscopeView from './components/views/HoroscopeView';
import ComingSoonView from './components/views/ComingSoonView';
import ProfileView from './components/views/ProfileView';
import SettingsView from './components/views/SettingsView';
import Header from './components/layout/Header';
import Drawer from './components/layout/Drawer';

type Page = 'home' | 'horoscope' | 'ai-assistant' | 'profile' | 'settings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setDrawerOpen(false);
  }, []);
  
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'horoscope':
        return <HoroscopeView />;
      case 'ai-assistant':
        return <ComingSoonView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  if (!user) {
    return <AuthView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 text-gray-800">
      <Header onMenuClick={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onNavigate={navigate} />
      <main className="pt-20 p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;