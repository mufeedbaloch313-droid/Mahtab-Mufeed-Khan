import React, { useState, useRef } from 'react';
import type { User } from '../types';

interface QRViewProps {
  user: User;
  onScanUser: (userId: string) => void;
}

const MyQRTab: React.FC<{ user: User }> = ({ user }) => {
  const inviteLink = `chatapp://invite?uid=${user.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(inviteLink)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ChatsApp Invite',
          text: `Join me on ChatsApp!`,
          url: inviteLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(inviteLink);
      alert('Invite link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 text-center">
      <h2 className="text-xl font-semibold mb-2">My QR Code</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Share this code to invite others to chat.</p>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={qrCodeUrl} alt="My QR Code" width="256" height="256" />
      </div>
      <p className="mt-4 text-xs text-gray-500 break-all">{inviteLink}</p>
      <button 
        onClick={handleShare}
        className="mt-6 w-full max-w-xs bg-wa-light-teal text-white py-3 rounded-md hover:bg-wa-dark-teal"
      >
        Share Invite Link
      </button>
       <button 
        onClick={() => alert("Regenerating invite code...")}
        className="mt-2 w-full max-w-xs border border-wa-light-teal text-wa-light-teal py-3 rounded-md hover:bg-wa-light-teal/10"
      >
        Regenerate Code
      </button>
    </div>
  );
};

const ScanQRTab: React.FC<{ onScanUser: (userId: string) => void }> = ({ onScanUser }) => {
  const [manualCode, setManualCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would use a library like jsQR to decode the image data.
      alert(`Simulating scan from image: ${file.name}. This requires a QR decoding library to implement fully.`);
      // Example: onScanUser('user_from_image');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = manualCode.match(/uid=([^&]+)/);
    if (match && match[1]) {
        if(confirm(`Found user: ${match[1]}. Start chat?`)) {
            onScanUser(match[1]);
        }
    } else {
      alert('Invalid invite code format. Expected format: chatapp://invite?uid=USER_ID');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Scan QR Code</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Scan a code to start a new chat.</p>

        {/* Note: Camera scanning is complex and requires libraries not available in this environment. */}
        <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 aspect-square flex items-center justify-center rounded-lg mb-6">
            <p className="text-gray-500 p-4">Camera view for QR scanning would appear here.</p>
        </div>
        
        <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-xs bg-wa-light-teal text-white py-3 rounded-md hover:bg-wa-dark-teal"
        >
            Upload QR from Library
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 my-4">or</p>

        <form onSubmit={handleManualSubmit} className="w-full max-w-xs space-y-2">
            <input 
                type="text" 
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Paste invite code" 
                className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" 
            />
            <button type="submit" className="w-full border border-wa-light-teal text-wa-light-teal py-3 rounded-md hover:bg-wa-light-teal/10">
                Find User by Code
            </button>
        </form>
    </div>
  );
};


export const QRView: React.FC<QRViewProps> = ({ user, onScanUser }) => {
  const [activeTab, setActiveTab] = useState<'myqr' | 'scan'>('myqr');

  return (
    <div className="flex-grow bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col">
        <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button
            onClick={() => setActiveTab('myqr')}
            className={`flex-1 py-3 text-base font-medium text-center ${activeTab === 'myqr' ? 'border-b-2 border-wa-light-teal text-wa-light-teal' : 'text-gray-500'}`}
            >
            My QR
            </button>
            <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-3 text-base font-medium text-center ${activeTab === 'scan' ? 'border-b-2 border-wa-light-teal text-wa-light-teal' : 'text-gray-500'}`}
            >
            Scan QR
            </button>
        </div>
        <div className="flex-grow overflow-y-auto">
            {activeTab === 'myqr' ? <MyQRTab user={user} /> : <ScanQRTab onScanUser={onScanUser} />}
        </div>
    </div>
  );
};
