
import React, { useState } from 'react';
import type { User } from '../types';
import { ArrowLeftIcon, UserGroupIcon } from './Icons';

interface ContactsViewProps {
    allUsers: User[];
    onStartGroup: (members: User[]) => void;
    onBack: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ allUsers, onStartGroup, onBack }) => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const toggleUserSelection = (user: User) => {
        setSelectedUsers(prev => 
            prev.find(u => u.id === user.id)
                ? prev.filter(u => u.id !== user.id)
                : [...prev, user]
        );
    };

    const handleNext = () => {
        if (selectedUsers.length > 0) {
            onStartGroup(selectedUsers);
        } else {
            alert("Please select at least one contact to start a group chat.");
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-wa-bg-dark">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h2 className="text-lg font-semibold">Select Contacts</h2>
                <p className="text-sm text-gray-500">{selectedUsers.length} selected</p>
            </div>
            <div className="flex-grow overflow-y-auto">
                {allUsers.map(user => {
                    const isSelected = !!selectedUsers.find(u => u.id === user.id);
                    return (
                        <div key={user.id} onClick={() => toggleUserSelection(user)} className="flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                            <input type="checkbox" checked={isSelected} readOnly className="mr-4 h-5 w-5 rounded text-wa-light-teal focus:ring-wa-light-teal" />
                            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedUsers.length > 0 && (
                <div className="p-4 flex-shrink-0">
                    <button onClick={handleNext} className="w-full bg-wa-light-teal text-white py-3 rounded-md hover:bg-wa-dark-teal">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
