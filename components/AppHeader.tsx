import React from 'react';
import { ArrowLeftIcon, UserIcon, QrCodeIcon, MoreVerticalIcon } from './Icons';

interface AppHeaderProps {
  currentView: 'main' | 'settings' | 'profile' | 'account' | 'qr' | 'contacts' | 'groupCreation';
  activeTab: 'chats' | 'updates' | 'calls' | 'tools';
  onNavigate: (view: 'main' | 'settings' | 'profile' | 'account' | 'qr') => void;
  isMobileView: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ currentView, activeTab, onNavigate, isMobileView }) => {
  const getTitle = () => {
    if (currentView !== 'main') {
      switch(currentView) {
        case 'settings': return 'Settings';
        case 'profile': return 'Profile';
        case 'account': return 'Account';
        case 'qr': return 'QR Hub';
        case 'contacts': return 'Select Contacts';
        case 'groupCreation': return 'New Group';
        default: return 'ChatsApp';
      }
    }
    if (isMobileView) {
       switch(activeTab) {
        case 'updates': return 'Updates';
        case 'calls': return 'Calls';
        case 'tools': return 'Tools';
        default: return 'ChatsApp';
       }
    }
    return 'ChatsApp';
  };
  
  const handleBack = () => {
    if (currentView === 'profile') onNavigate('settings');
    else if (currentView === 'groupCreation') onNavigate('contacts' as any); // hack to get to contacts
    else onNavigate('main');
  }

  return (
    <header className="bg-wa-light-teal text-white p-3 flex justify-between items-center shadow-md flex-shrink-0 z-20">
      <div className="flex items-center">
        {currentView !== 'main' && (
          <button onClick={handleBack} className="mr-4 p-1 rounded-full hover:bg-white/25 transition-transform transform hover:scale-110">
             <ArrowLeftIcon className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>
      
      {currentView === 'main' && (
        <div className="flex items-center space-x-2">
          <button onClick={() => onNavigate('account')} className="p-2 rounded-full hover:bg-white/25 focus:outline-none transition-transform transform hover:scale-110" aria-label="Account">
            <UserIcon className="w-6 h-6" />
          </button>
          <button onClick={() => onNavigate('qr')} className="p-2 rounded-full hover:bg-white/25 focus:outline-none transition-transform transform hover:scale-110" aria-label="Open QR Hub">
            <QrCodeIcon className="w-6 h-6" />
          </button>
          <button onClick={() => onNavigate('settings')} className="p-2 rounded-full hover:bg-white/25 focus:outline-none transition-transform transform hover:scale-110" aria-label="Settings">
            <MoreVerticalIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </header>
  );
};
