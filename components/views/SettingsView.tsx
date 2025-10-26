
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Settings</h1>
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon</h2>
        <p className="text-gray-600">
          This section will allow you to customize your app experience, manage notifications, and update your profile information. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
