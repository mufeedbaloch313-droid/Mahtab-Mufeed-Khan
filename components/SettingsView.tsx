
import React from 'react';
import type { User } from '../types';
import { KeyIcon, LockIcon, ChatBubbleIcon, BellIcon, DataUsageIcon, HelpIcon, UserIcon, StarIcon } from './Icons';

interface SettingsViewProps {
  user: User;
  onNavigate: (view: 'main' | 'settings' | 'profile') => void;
  onLogout: () => void;
}

const SettingsItem: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; onClick?: () => void; isLogout?: boolean }> = ({ icon, title, subtitle, onClick, isLogout }) => (
  <li 
    onClick={onClick}
    className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-wa-bg-dark cursor-pointer ${isLogout ? 'text-red-500' : ''}`}
  >
    <div className={`mr-6 ${isLogout ? 'text-red-500' : 'text-wa-icon-light dark:text-wa-icon-dark'}`}>{icon}</div>
    <div className="flex-grow">
      <h3 className="text-base">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  </li>
);

const Toggle: React.FC = () => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-wa-light-teal"></div>
    </label>
);

const SettingsCategory: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mt-4">
        <h2 className="px-4 py-2 text-sm font-semibold text-wa-light-teal">{title.toUpperCase()}</h2>
        <ul className="bg-white dark:bg-wa-bg-panel-dark divide-y divide-gray-200 dark:divide-gray-700">
            {children}
        </ul>
    </div>
);

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="flex-grow bg-wa-bg-light dark:bg-wa-bg-dark overflow-y-auto pb-8">
       {/* Profile Section */}
      <div 
        className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-wa-bg-dark cursor-pointer bg-white dark:bg-wa-bg-panel-dark"
        onClick={() => onNavigate('profile')}
      >
        <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.status}</p>
        </div>
      </div>
      
      <SettingsCategory title="General">
        <SettingsItem icon={<UserIcon className="w-6 h-6" />} title="Profile" subtitle="Edit name, about, photo" onClick={() => onNavigate('profile')} />
        <SettingsItem icon={<StarIcon className="w-6 h-6" />} title="Starred Messages" />
      </SettingsCategory>
      
      <SettingsCategory title="Security & Data">
        <SettingsItem icon={<KeyIcon className="w-6 h-6" />} title="Account" subtitle="Security notifications, change number" />
        <SettingsItem icon={<LockIcon className="w-6 h-6" />} title="Privacy" subtitle="Last seen, block list" />
        <SettingsItem icon={<DataUsageIcon className="w-6 h-6" />} title="Storage and data" subtitle="Media auto-download" />
      </SettingsCategory>

      <SettingsCategory title="App Settings">
        <SettingsItem icon={<BellIcon className="w-6 h-6" />} title="Notifications" subtitle="Mute, tone, vibration" />
        <SettingsItem icon={<ChatBubbleIcon className="w-6 h-6" />} title="Chats" subtitle="Theme, wallpaper" />
      </SettingsCategory>

      <SettingsCategory title="Support & Actions">
        <SettingsItem icon={<HelpIcon className="w-6 h-6" />} title="Help" subtitle="FAQ, contact support" />
        <SettingsItem icon={<LockIcon className="w-6 h-6" />} isLogout title="Logout" onClick={onLogout} />
      </SettingsCategory>
    </div>
  );
};
