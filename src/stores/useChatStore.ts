import { create } from "zustand";

interface ChatStore {
  users: any[] | null;
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
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while fetching error" });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
