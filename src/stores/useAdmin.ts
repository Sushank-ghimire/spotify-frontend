import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AdminStore } from "../types/useAdminStoreTypes";

export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,
  isLoading: null,
  statsData: null,
  error: null,
  allSongs: [],
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
  fetchStats: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/stats/totalStats");
      set({ statsData: data });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while checking admin" });
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAllSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/songs/");
      set({ allSongs: data.songs || [] });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while checking admin" });
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  addAlbum: async () => {
    try {
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while checking admin" });
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
