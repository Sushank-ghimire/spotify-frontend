export interface User {
  clerkId: string;
  createdAt: string;
  email: string;
  profileUrl: string;
  updatedAt: string;
  userFullName: string;
  _id: string;
}

export interface MessageTypes {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface ChatStore {
  users: User[] | null;
  getUsers: () => Promise<void>;
  isLoading: boolean;
  error: null | unknown | string;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  messages: MessageTypes[];
  userActivities: Map<string, string>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (
    senderId: string,
    receiverId: string,
    content: string
  ) => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}
