import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Song {
  _id: string;
  albumId: string | null;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null | unknown;
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<Album | undefined>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    // Fetching albums data from backend
    set({
      isLoading: true,
    });
    try {
      const { data } = await axiosInstance.get("/album/getAlbums");
      set({ albums: data?.albums });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message || "Error while fetching album" });
      }
      set({ error: error || "Error while fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {},
  fetchAlbumById: async (albumId: string) => {
    try {
      const { data } = await axiosInstance.get(`/album/${albumId}`);
      const album: Album = data.album;
      console.log(data);
      return album;
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message || "Error while fetching album" });
      }
      set({ error: error || "Error while fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
