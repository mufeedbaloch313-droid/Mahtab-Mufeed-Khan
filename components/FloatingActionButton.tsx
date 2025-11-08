
import React from 'react';
import { ChatBubbleIcon } from './Icons';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-20 right-5 bg-wa-light-teal text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-wa-dark-teal"
            aria-label="New Chat"
        >
            <ChatBubbleIcon className="w-7 h-7" />
        </button>
    );
};
