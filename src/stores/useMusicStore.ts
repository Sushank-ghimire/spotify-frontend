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
  songs?: string[];
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
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  isLoading: boolean;
  currentAlbum: Album | null;
  error: string | null | unknown;
  albumSongs?: null | Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  albumSongs: null,
  isLoading: false,
  error: null,
  currentAlbum: null,
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
      set({ currentAlbum: album });

      // Fetch songs for the album
      const songFetchPromises: Promise<{ data: { song: Song } }>[] =
        album.songs?.map((id) =>
          axiosInstance.get<{ song: Song }>(`/songs/song/${id}`)
        ) || [];

      // Resolve all song fetch requests
      const songsResponses = await Promise.all(songFetchPromises);
      const songs: Song[] = songsResponses.map(
        (response) => response.data.song
      );
      set({ albumSongs: songs });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message || "Error while fetching album" });
      }
      set({ error: error || "Error while fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: data.songs });
    } catch (error) {
      if (error instanceof Error) set({ error: error.message });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: data.songs });
    } catch (error) {
      if (error instanceof Error) set({ error: error.message });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: data.songs });
    } catch (error) {
      if (error instanceof Error) set({ error: error.message });
      else set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
