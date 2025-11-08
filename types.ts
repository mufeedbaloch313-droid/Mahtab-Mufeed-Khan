
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status?: 'online' | 'offline' | 'typing...' | 'Available';
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string; // 'self' for the current user
  status: 'sent' | 'delivered' | 'read';
  senderName?: string; // For group chats
}

export interface Chat {
  id:string;
  type: 'private' | 'group';
  name: string;
  avatarUrl: string;
  messages: Message[];
  members?: User[];
  userStatus?: 'online' | 'offline' | 'typing...' | 'Available';
}
