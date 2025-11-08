
import React, { useState } from 'react';
import { SendIcon, PaperclipIcon, MicIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };
  
  return (
    <div className="p-4 bg-wa-bg-light dark:bg-wa-bg-panel-dark flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <PaperclipIcon className="w-6 h-6 text-wa-icon-light dark:text-wa-icon-dark" />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="flex-grow bg-white dark:bg-wa-bg-dark rounded-full px-4 py-2 focus:outline-none"
        />
        {text ? (
          <button type="submit" className="bg-wa-light-teal text-white p-2 rounded-full">
            <SendIcon className="w-6 h-6" />
          </button>
        ) : (
          <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <MicIcon className="w-6 h-6 text-wa-icon-light dark:text-wa-icon-dark" />
          </button>
        )}
      </form>
    </div>
  );
};
