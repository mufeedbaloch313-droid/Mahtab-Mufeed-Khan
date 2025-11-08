
import React from 'react';
import { VideoIcon, QrCodeIcon, SettingsIcon, UserGroupIcon } from './Icons';

interface ToolsViewProps {
  onNavigate: (view: 'qr' | 'settings') => void;
}

const ToolButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-wa-bg-panel-dark rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="text-wa-light-teal mb-2">{icon}</div>
        <span className="text-sm font-medium text-center">{label}</span>
    </button>
);


export const ToolsView: React.FC<ToolsViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow p-4 bg-wa-bg-light dark:bg-wa-bg-dark">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <ToolButton icon={<VideoIcon className="w-8 h-8"/>} label="Create Meeting" onClick={() => alert('Create Meeting clicked')} />
            <ToolButton icon={<QrCodeIcon className="w-8 h-8"/>} label="Scan QR" onClick={() => onNavigate('qr')} />
            <ToolButton icon={<QrCodeIcon className="w-8 h-8"/>} label="My QR" onClick={() => onNavigate('qr')} />
            <ToolButton icon={<SettingsIcon className="w-8 h-8"/>} label="App Settings" onClick={() => onNavigate('settings')} />
            <ToolButton icon={<UserGroupIcon className="w-8 h-8"/>} label="Invite a Friend" onClick={() => alert('Invite a friend clicked')} />
        </div>
    </div>
  );
};
