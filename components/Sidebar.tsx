
import React from 'react';
import type { Chat } from '../types';
import { ContactItem } from './ContactItem';
import { UserGroupIcon } from './Icons';


interface SidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewGroup: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ chats, activeChat, onSelectChat, onNewGroup }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-wa-bg-panel-dark border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0 h-full">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
         <button 
            onClick={onNewGroup}
            className="w-full flex items-center p-3 text-left text-wa-light-teal dark:text-wa-light-teal hover:bg-gray-100 dark:hover:bg-wa-bg-dark rounded-md">
            <UserGroupIcon className="w-6 h-6 mr-4"/>
            <span className="font-semibold">New Group</span>
        </button>
      </div>
       <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-wa-bg-light dark:bg-wa-bg-dark rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {chats.map(chat => (
          <ContactItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onClick={() => onSelectChat(chat)}
          />
        ))}
      </div>
    </div>
  );
};
