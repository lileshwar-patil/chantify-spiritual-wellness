
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfileView: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full mb-4 shadow-lg border-4 border-white"
                />
                <h2 className="text-2xl font-bold text-purple-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-8 bg-purple-100 p-6 rounded-xl w-full">
                    <p className="text-lg font-semibold text-purple-600">Total Mantras Chanted</p>
                    <p className="text-5xl font-bold text-purple-900 mt-2">{user.chantCount.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
