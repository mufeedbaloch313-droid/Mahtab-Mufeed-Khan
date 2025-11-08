

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { AppHeader } from './components/AppHeader';
import { SettingsView } from './components/SettingsView';
import { ProfileView } from './components/ProfileView';
import { AccountView } from './components/AccountView';
import { QRView } from './components/QRView';
import { BottomNavBar } from './components/BottomNavBar';
import { UpdatesView } from './components/UpdatesView';
import { CallsView } from './components/CallsView';
import { ToolsView } from './components/ToolsView';
import { ContactsView } from './components/ContactsView';
import { GroupCreationView } from './components/GroupCreationView';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ChatBubbleIcon } from './components/Icons';
import type { Chat, User, Message } from './types';

type View = 'main' | 'settings' | 'profile' | 'account' | 'qr' | 'contacts' | 'groupCreation';
type Tab = 'chats' | 'updates' | 'calls' | 'tools';

const App: React.FC = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [currentView, setCurrentView] = useState<View>('main');
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groupCreateMembers, setGroupCreateMembers] = useState<User[]>([]);

  const currentUser: User = { 
    id: 'self', 
    name: 'You', 
    avatarUrl: 'https://picsum.photos/seed/self/200',
    status: 'Available'
  };

  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  // Mock data generation
  useEffect(() => {
    const users: User[] = [
      { id: '1', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/alice/200', status: 'online' },
      { id: '2', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/bob/200', status: 'offline' },
      { id: '3', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/charlie/200', status: 'typing...' },
      { id: '4', name: 'Diana', avatarUrl: 'https://picsum.photos/seed/diana/200', status: 'online' },
      { id: '5', name: 'Eve', avatarUrl: 'https://picsum.photos/seed/eve/200', status: 'offline' },
    ];
    setAllUsers([currentUser, ...users]);

    const mockChats: Chat[] = [
      { id: 'chat1', type: 'private', name: users[0].name, avatarUrl: users[0].avatarUrl, userStatus: users[0].status, messages: [
        { id: 'm1', text: 'Hey, how are you?', timestamp: '10:40 AM', senderId: 'self', status: 'read' },
        { id: 'm2', text: 'I am good, thanks! How about you?', timestamp: '10:41 AM', senderId: '1', status: 'read' },
      ]},
      { id: 'chat2', type: 'private', name: users[1].name, avatarUrl: users[1].avatarUrl, userStatus: users[1].status, messages: [
        { id: 'm4', text: 'Can you send me the report?', timestamp: 'Yesterday', senderId: '2', status: 'read' },
      ]},
      { id: 'chat3', type: 'group', name: 'Design Team', avatarUrl: 'https://picsum.photos/seed/design/200', members: [currentUser, users[0], users[2]], messages: [
        { id: 'm6', text: 'Team, please check the latest mockups.', timestamp: '9:00 AM', senderId: '1', senderName: 'Alice', status: 'read' },
        { id: 'm7', text: 'Looks awesome!', timestamp: '9:05 AM', senderId: 'self', status: 'sent' },
      ]},
      { id: 'chat4', type: 'private', name: users[2].name, avatarUrl: users[2].avatarUrl, userStatus: users[2].status, messages: [
        { id: 'm8', text: 'Hey, are you free for a call?', timestamp: '11:00 AM', senderId: '3', status: 'delivered' }
      ]},
    ];
    setChats(mockChats);
    if (!isMobileView) setActiveChat(mockChats[0]);
  }, [isMobileView]);
  
  const handleSendMessage = (text: string) => {
    if (!activeChat) return;
    const sender = activeChat.type === 'group' ? allUsers.find(u => u.id === 'self') : undefined;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'self',
      status: 'sent',
      senderName: sender?.name,
    };
    const updatedChats = chats.map(chat => 
      chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
    );
    setChats(updatedChats);
  };
  
  const handleSelectChat = (chat: Chat) => setActiveChat(chat);
  const handleBackToSidebar = () => setActiveChat(null);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('main');
  };
  
  const handleScanUser = (userId: string) => {
    const chatExists = chats.find(c => c.type === 'private' && c.id.includes(userId));
    if (chatExists) {
        setActiveChat(chatExists);
        setCurrentView('main');
        setActiveTab('chats');
    } else alert(`User with ID ${userId} not found.`);
  };

  const handleNavigate = (view: View) => {
    if (view === 'main') setActiveChat(null);
    setCurrentView(view);
  };

  const handleStartGroupCreation = (members: User[]) => {
    setGroupCreateMembers(members);
    setCurrentView('groupCreation');
  };

  const handleCreateGroup = (name: string, avatar: string) => {
    const newGroupChat: Chat = {
      id: `chat${Date.now()}`,
      type: 'group',
      name: name,
      avatarUrl: avatar || 'https://picsum.photos/seed/newgroup/200',
      members: [currentUser, ...groupCreateMembers],
      messages: [{
        id: `m${Date.now()}`,
        text: 'Group created!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: 'system',
        status: 'read',
      }],
    };
    setChats([newGroupChat, ...chats]);
    setActiveChat(newGroupChat);
    setCurrentView('main');
    setActiveTab('chats');
  };

  const renderActiveTabView = () => {
    switch (activeTab) {
      case 'updates': return <UpdatesView />;
      case 'calls': return <CallsView />;
      case 'tools': return <ToolsView onNavigate={handleNavigate} />;
      case 'chats':
      default:
        return <Sidebar chats={chats} activeChat={activeChat} onSelectChat={handleSelectChat} onNewGroup={() => handleNavigate('contacts')} />;
    }
  };

  const renderMainInterface = () => (
    <>
      {isMobileView ? (
        <>
          {activeChat ? (
            <ChatView chat={activeChat} onSendMessage={handleSendMessage} onBack={handleBackToSidebar} isMobileView={isMobileView} members={allUsers} />
          ) : (
            <div className="w-full h-full flex flex-col">
              {renderActiveTabView()}
            </div>
          )}
        </>
      ) : (
        <>
          <Sidebar chats={chats} activeChat={activeChat} onSelectChat={handleSelectChat} onNewGroup={() => handleNavigate('contacts')} />
          {activeChat ? (
              <ChatView chat={activeChat} onSendMessage={handleSendMessage} onBack={handleBackToSidebar} isMobileView={isMobileView} members={allUsers} />
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center bg-wa-bg-light dark:bg-wa-bg-dark text-center p-4">
              <ChatBubbleIcon className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-2xl font-light text-gray-700 dark:text-gray-300">Welcome to ChatsApp</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Select a chat from the left panel to start messaging, or create a new one.</p>
              <button 
                onClick={() => handleNavigate('contacts')} 
                className="mt-6 bg-wa-light-teal text-white py-2 px-6 rounded-full hover:bg-wa-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wa-light-teal transition-colors duration-200"
              >
                Start New Chat
              </button>
            </div>
          )}
        </>
      )}
      {isMobileView && !activeChat && activeTab === 'chats' && <FloatingActionButton onClick={() => handleNavigate('contacts')}/>}
    </>
  );

  const renderOverlayView = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsView user={currentUser} onNavigate={(view) => setCurrentView(view as View)} onLogout={handleLogout} />;
      case 'profile':
        return <ProfileView user={currentUser} onNavigateBack={() => setCurrentView('settings')} />;
      case 'account':
        return <AccountView isLoggedIn={isLoggedIn} user={currentUser} onLogin={handleLogin} onLogout={handleLogout} />;
      case 'qr':
        return <QRView user={currentUser} onScanUser={handleScanUser} />;
      case 'contacts':
        return <ContactsView allUsers={allUsers.filter(u => u.id !== 'self')} onStartGroup={handleStartGroupCreation} onBack={() => setCurrentView('main')} />;
      case 'groupCreation':
        return <GroupCreationView members={groupCreateMembers} onCreate={handleCreateGroup} onBack={() => setCurrentView('contacts')} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-wa-bg-light h-screen w-screen text-wa-text-light flex flex-col antialiased overflow-hidden">
      <AppHeader 
        currentView={currentView}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        isMobileView={isMobileView}
      />
      <main className="flex-grow flex overflow-hidden">
        {currentView === 'main' ? renderMainInterface() : renderOverlayView()}
      </main>
      {isMobileView && currentView === 'main' && !activeChat && <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default App;
