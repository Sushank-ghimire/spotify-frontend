import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface User {
  clerkId: string;
  createdAt: string;
  email: string;
  profileUrl: string;
  updatedAt: string;
  userFullName: string;
  _id: string;
}

interface ChatStore {
  users: User[] | null;
  getUsers: () => Promise<void>;
  isLoading: boolean;
  error: null | unknown | string;
}

export const useChatStore = create<ChatStore>((set) => ({
  isLoading: false,
  users: null,
  error: null,
  getUsers: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/users/getUsers");
      console.log("Data : ", data.users);
      set({ users: data.users });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while fetching error" });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
