
import React from 'react';

const ComingSoonView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-lg">
        <div className="text-6xl mb-4 text-purple-500">
          ✨
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Assistant Coming Soon!</h1>
        <p className="text-gray-600 text-lg">
          We are working on a powerful AI companion to guide you on your spiritual journey. Get ready for personalized insights, mantra suggestions, and guided meditations.
        </p>
        <p className="text-purple-600 font-semibold mt-6">Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default ComingSoonView;
