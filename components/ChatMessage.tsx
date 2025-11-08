
import React from 'react';
import type { Message } from '../types';
import { CheckIcon, CheckCheckIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
  isGroup: boolean;
}

const MessageStatus: React.FC<{ status: 'sent' | 'delivered' | 'read' }> = ({ status }) => {
  const iconClass = "w-4 h-4 ml-1";
  if (status === 'read') {
    return <CheckCheckIcon className={`${iconClass} text-blue-500`} />;
  }
  if (status === 'delivered') {
    return <CheckCheckIcon className={iconClass} />;
  }
  return <CheckIcon className={iconClass} />;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isGroup }) => {
  const isSelf = message.senderId === 'self';
  
  return (
    <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-lg shadow-sm ${
          isSelf 
            ? 'bg-wa-message-green dark:bg-wa-message-green-dark' 
            : 'bg-white dark:bg-wa-bg-panel-dark'
        }`}
      >
        {isGroup && !isSelf && message.senderName && (
            <p className="text-xs font-semibold text-wa-light-teal mb-1">{message.senderName}</p>
        )}
        <p className="text-sm">{message.text}</p>
        <div className="flex justify-end items-center mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mr-1">{message.timestamp}</p>
          {isSelf && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};
