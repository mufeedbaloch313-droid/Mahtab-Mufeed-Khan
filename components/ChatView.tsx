
import React, { useEffect, useRef } from 'react';
import type { Chat, User } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ArrowLeftIcon, MoreVerticalIcon, PhoneIcon, VideoIcon, UserGroupIcon } from './Icons';

interface ChatViewProps {
  chat: Chat;
  onSendMessage: (text: string) => void;
  onBack: () => void;
  isMobileView: boolean;
  members: User[];
}

export const ChatView: React.FC<ChatViewProps> = ({ chat, onSendMessage, onBack, isMobileView, members }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const getStatusText = () => {
    if (chat.type === 'group') {
      return chat.members?.map(m => m.name).join(', ') || 'Group members';
    }
    return chat.userStatus;
  }
  
  return (
    <div className="flex flex-col flex-grow bg-wa-bg-light dark:bg-wa-bg-dark h-full">
      {/* Chat Header */}
      <header 
        className="bg-white dark:bg-wa-bg-panel-dark p-3 flex items-center shadow-sm flex-shrink-0 z-10 border-b border-gray-200 dark:border-gray-700"
        onClick={chat.type === 'group' ? () => alert(`Opening group info for ${chat.name}`) : undefined}
      >
        {isMobileView && (
          <button onClick={onBack} className="mr-2 p-1 rounded-full text-wa-icon-light dark:text-wa-icon-dark hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        )}
        <img src={chat.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-grow">
          <h2 className="font-semibold text-gray-800 dark:text-white">{chat.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{getStatusText()}</p>
        </div>
        <div className="flex items-center space-x-2 text-wa-icon-light dark:text-wa-icon-dark">
            <button onClick={() => alert('Starting voice call...')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PhoneIcon className="w-5 h-5"/>
            </button>
            <button onClick={() => alert('Starting video call...')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <VideoIcon className="w-6 h-6"/>
            </button>
             <button onClick={() => alert('Creating a meeting...')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <UserGroupIcon className="w-6 h-6"/>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <MoreVerticalIcon className="w-6 h-6"/>
            </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-wa-bg-light dark:bg-wa-bg-dark" style={{ backgroundImage: `url('/bg-chat-tile-light.png')` }}>
        <div className="space-y-2">
          {chat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} isGroup={chat.type === 'group'} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
