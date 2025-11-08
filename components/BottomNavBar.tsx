
import React from 'react';
import { ChatBubbleIcon, StatusIcon, PhoneIcon, ToolsIcon } from './Icons';

type Tab = 'chats' | 'updates' | 'calls' | 'tools';

interface BottomNavBarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-wa-light-teal' : 'text-gray-500 dark:text-gray-400'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <footer className="w-full bg-white dark:bg-wa-bg-panel-dark border-t border-gray-200 dark:border-gray-700 flex justify-around flex-shrink-0">
      <NavItem
        icon={<ChatBubbleIcon className="w-6 h-6" />}
        label="Chats"
        isActive={activeTab === 'chats'}
        onClick={() => setActiveTab('chats')}
      />
      <NavItem
        icon={<StatusIcon className="w-6 h-6" />}
        label="Updates"
        isActive={activeTab === 'updates'}
        onClick={() => setActiveTab('updates')}
      />
      <NavItem
        icon={<PhoneIcon className="w-6 h-6" />}
        label="Calls"
        isActive={activeTab === 'calls'}
        onClick={() => setActiveTab('calls')}
      />
       <NavItem
        icon={<ToolsIcon className="w-6 h-6" />}
        label="Tools"
        isActive={activeTab === 'tools'}
        onClick={() => setActiveTab('tools')}
      />
    </footer>
  );
};
