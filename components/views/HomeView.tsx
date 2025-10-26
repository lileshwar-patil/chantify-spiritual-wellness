
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ChantCounter from '../ChantCounter';
import DiscoverFeed from '../DiscoverFeed';

const MantraOfTheDay: React.FC = () => (
  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg mb-8">
    <h2 className="font-bold text-xl mb-2">Mantra of the Day</h2>
    <p className="text-3xl font-serif italic">"Om Namah Shivaya"</p>
    <p className="mt-2 text-purple-200">"I bow to the supreme reality, the inner Self."</p>
  </div>
);

const HomeView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
      
      <MantraOfTheDay />

      <ChantCounter />

      <DiscoverFeed />
    </div>
  );
};

export default HomeView;