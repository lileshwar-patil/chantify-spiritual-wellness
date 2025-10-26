
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

type Page = 'home' | 'horoscope' | 'ai-assistant' | 'profile' | 'settings';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 h-full bg-gradient-to-b from-white to-purple-50 w-4/5 max-w-sm z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-8">
            <img 
              src={user?.avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-purple-300"
            />
            <div>
              <p className="font-bold text-lg text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.isGuest ? 'Start your journey' : user?.email}</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-2">
            <DrawerItem icon="👤" text="Profile" onClick={() => onNavigate('profile')} />
            <DrawerItem icon="⚙️" text="Settings" onClick={() => onNavigate('settings')} />
            <DrawerItem icon="🔮" text="Daily Horoscope" onClick={() => onNavigate('horoscope')} />
            <DrawerItem icon="✨" text="AI Assistant" onClick={() => onNavigate('ai-assistant')} isComingSoon />
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
           {user?.isGuest ? (
             <button 
                onClick={logout}
                className="w-full text-left flex items-center space-x-3 p-3 rounded-lg text-green-700 hover:bg-green-100 transition-colors duration-200"
              >
                <span className="text-xl">🚀</span>
                <span className="font-semibold">Login / Sign Up</span>
              </button>
           ) : (
            <button 
              onClick={logout}
              className="w-full text-left flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200"
            >
              <span className="text-xl">🚪</span>
              <span className="font-semibold">Logout</span>
            </button>
           )}
        </div>
      </div>
    </>
  );
};

interface DrawerItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  isComingSoon?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, text, onClick, isComingSoon }) => (
  <button 
    onClick={onClick}
    className="w-full text-left flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-purple-200 transition-colors duration-200"
  >
    <span className="text-xl">{icon}</span>
    <span className="font-semibold">{text}</span>
    {isComingSoon && <span className="text-xs bg-purple-500 text-white font-semibold rounded-full px-2 py-0.5 ml-auto">SOON</span>}
  </button>
);


export default Drawer;