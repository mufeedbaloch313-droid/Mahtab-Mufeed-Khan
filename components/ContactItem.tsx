
import React from 'react';
import type { Chat } from '../types';

interface ContactItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({ chat, isActive, onClick }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer ${
        isActive ? 'bg-gray-200 dark:bg-wa-bg-dark' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold truncate">{chat.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{lastMessage?.timestamp}</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {lastMessage?.senderName && `${lastMessage.senderName}: `}{lastMessage?.text}
        </p>
      </div>
    </div>
  );
};
