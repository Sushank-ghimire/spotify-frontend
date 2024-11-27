import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { ChatStore, MessageTypes } from "../types/useMessages.types";
import { io } from "socket.io-client";

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  isLoading: false,
  users: null,
  error: null,
  socket: socket,
  isConnected: false,
  messages: [],
  onlineUsers: new Set<string>(),
  userActivities: new Map<string, string>(),

  selectedUser: null,

  getUsers: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/users/getUsers");
      set({ users: data.users });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while fetching error" });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId: string) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();
      socket.emit("user_connected", userId);
      socket.on("user_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: MessageTypes) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("send_message", (message: MessageTypes) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("updateActivity", ({ userId, activity }) => {
        set((state) => {
          const newActivity = new Map(state.userActivities);
          newActivity.set(userId, activity);
          return { userActivities: newActivity };
        });
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    if (!get().isConnected) return;
    socket.disconnect();
    set({ isConnected: false });
  },

  sendMessage: async (senderId, receiverId, content) => {
    const socket = get().socket();
    if (!socket) return;
    socket.emit("message", { senderId, receiverId, content });
  },

  fetchMessages: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await axiosInstance.get(`/users/messages/${userId}`);
      if (data) {
        set({ messages: data });
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      }
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedUser: (user) => {
    if (user) {
      set({ selectedUser: user });
    }
    set({ selectedUser: null });
  },
}));
