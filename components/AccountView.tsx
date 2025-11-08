import React, { useState } from 'react';
import type { User } from '../types';
import { EditIcon, CameraIcon } from './Icons';

interface AccountViewProps {
  isLoggedIn: boolean;
  user: User;
  onLogin: () => void;
  onLogout: () => void;
}

const LoggedOutView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual login logic
    alert('Logging in...');
    onLogin();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual signup logic
    alert('Signing up...');
    onLogin(); // Log in user after signup for this demo
  };

  return (
    <div className="w-full max-w-md p-4 md:p-8">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('login')}
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'login' ? 'border-b-2 border-wa-light-teal text-wa-light-teal' : 'text-gray-500'}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'signup' ? 'border-b-2 border-wa-light-teal text-wa-light-teal' : 'text-gray-500'}`}
        >
          Sign Up
        </button>
      </div>
      <div className="pt-8">
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input type="email" placeholder="Email" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <input type="password" placeholder="Password" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <button type="submit" className="w-full bg-wa-light-teal text-white py-2 rounded-md hover:bg-wa-dark-teal">Login</button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">or</p>
            <button type="button" onClick={() => alert("Login with Google clicked")} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login with Google</button>
            <button type="button" onClick={() => alert("Biometric unlock clicked")} className="w-full border border-wa-light-teal text-wa-light-teal py-2 rounded-md hover:bg-wa-light-teal/10">Use Biometrics</button>
            <a href="#" className="block text-center text-sm text-wa-light-teal hover:underline mt-2">Forgot password?</a>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <input type="text" placeholder="Username" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <input type="email" placeholder="Email" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <input type="password" placeholder="Password" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <input type="password" placeholder="Confirm Password" required className="w-full bg-white dark:bg-wa-bg-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wa-light-teal" />
            <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Profile Picture (optional)</label>
                <input type="file" accept="image/*" className="w-full text-sm mt-1" />
            </div>
            <button type="submit" className="w-full bg-wa-light-teal text-white py-2 rounded-md hover:bg-wa-dark-teal">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

const LoggedInView: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <div className="w-full">
        <div className="flex flex-col items-center">
            <div className="relative my-8">
                <img src={user.avatarUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover shadow-lg" />
                <button className="absolute bottom-2 right-2 bg-wa-light-teal text-white p-3 rounded-full hover:bg-wa-dark-teal focus:outline-none focus:ring-2 focus:ring-white">
                    <CameraIcon className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="bg-white dark:bg-wa-bg-panel-dark p-4">
            <p className="text-sm text-wa-light-teal dark:text-wa-light-teal">Name</p>
            <div className="flex justify-between items-center mt-1">
                <p className="text-lg">{user.name}</p>
                <button className="text-wa-icon-light dark:text-wa-icon-dark p-2">
                   <EditIcon className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="bg-white dark:bg-wa-bg-panel-dark p-4 mt-2">
            <p className="text-sm text-wa-light-teal dark:text-wa-light-teal">About</p>
            <div className="flex justify-between items-center mt-1">
                <p className="text-lg">{user.status}</p>
                 <button className="text-wa-icon-light dark:text-wa-icon-dark p-2">
                   <EditIcon className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="mt-8 px-4 space-y-2">
            <button onClick={() => alert("Change Password clicked")} className="w-full text-left bg-white dark:bg-wa-bg-panel-dark p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Change Password
            </button>
            <button onClick={onLogout} className="w-full text-left bg-white dark:bg-wa-bg-panel-dark p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Logout
            </button>
            <button onClick={() => alert("Delete Account clicked")} className="w-full text-left bg-white dark:bg-wa-bg-panel-dark p-4 rounded-md text-red-500 hover:bg-red-500/10">
                Delete Account
            </button>
        </div>
    </div>
  );
};


export const AccountView: React.FC<AccountViewProps> = ({ isLoggedIn, user, onLogin, onLogout }) => {
  return (
    <div className="flex-grow bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col items-center overflow-y-auto">
      {isLoggedIn ? (
        <LoggedInView user={user} onLogout={onLogout} />
      ) : (
        <LoggedOutView onLogin={onLogin} />
      )}
    </div>
  );
};
