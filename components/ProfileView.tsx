import React from 'react';
import type { User } from '../types';
import { EditIcon, CameraIcon } from './Icons';

interface ProfileViewProps {
    user: User;
    onNavigateBack: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
    return (
        <div className="flex-grow bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col items-center">
            {/* Profile Picture Section */}
            <div className="relative my-8">
                <img src={user.avatarUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover shadow-lg" />
                <button className="absolute bottom-2 right-2 bg-wa-light-teal text-white p-3 rounded-full hover:bg-wa-dark-teal focus:outline-none focus:ring-2 focus:ring-white">
                    <CameraIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Profile Details */}
            <div className="w-full">
                <div className="bg-white dark:bg-wa-bg-panel-dark p-4">
                    <p className="text-sm text-wa-light-teal dark:text-wa-light-teal">Name</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-lg">{user.name}</p>
                        <button className="text-wa-icon-light dark:text-wa-icon-dark p-2">
                           <EditIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="text-center p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        This is not your username or pin. This name will be visible to your ChatsApp contacts.
                    </p>
                </div>

                <div className="bg-white dark:bg-wa-bg-panel-dark p-4 mt-2">
                    <p className="text-sm text-wa-light-teal dark:text-wa-light-teal">About</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-lg">{user.status}</p>
                         <button className="text-wa-icon-light dark:text-wa-icon-dark p-2">
                           <EditIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};