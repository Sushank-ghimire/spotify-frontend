import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AdminStore } from "../types/useAdminStoreTypes";

export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,
  isLoading: null,
  error: null,
  fetchAdmin: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/admin/check");
      if (data.isAdmin) {
        set({ isAdmin: true });
      } else set({ isAdmin: false });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while checking admin" });
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
