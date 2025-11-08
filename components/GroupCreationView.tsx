
import React, { useState } from 'react';
import type { User } from '../types';
import { CameraIcon } from './Icons';

interface GroupCreationViewProps {
    members: User[];
    onCreate: (name: string, avatar: string) => void;
    onBack: () => void;
}

export const GroupCreationView: React.FC<GroupCreationViewProps> = ({ members, onCreate, onBack }) => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (groupName.trim()) {
            onCreate(groupName, ''); // Avatar URL is placeholder for now
        } else {
            alert('Please enter a group name.');
        }
    };
    
    return (
        <div className="w-full h-full flex flex-col bg-wa-bg-light dark:bg-wa-bg-dark">
            <div className="flex-grow p-6 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                       <CameraIcon className="w-12 h-12 text-gray-500"/>
                    </div>
                     <button className="absolute bottom-2 right-2 bg-wa-light-teal text-white p-3 rounded-full hover:bg-wa-dark-teal">
                        <CameraIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Group Name"
                        className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-wa-light-teal"
                    />
                    <button type="submit" className="w-full mt-6 bg-wa-light-teal text-white py-3 rounded-md hover:bg-wa-dark-teal">
                        Create Group
                    </button>
                </form>

                <div className="mt-8 w-full max-w-sm">
                    <h3 className="font-semibold mb-2">{members.length} Participants</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {members.map(user => (
                            <div key={user.id} className="flex flex-col items-center text-center">
                                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
                                <p className="text-xs mt-1 truncate">{user.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
