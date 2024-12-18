import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { MusicStore, Album, Song } from "../types/useMusicStoreTypes";
import toast from "react-hot-toast";

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

  deleteAlbum: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/album/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
        toast.error(error.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (songId: string) => {
    if (!songId) return;
    try {
      await axiosInstance.delete(`/admin/songs/${songId}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== songId),
      }));
      toast.success("Song deleted successfully.");
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message || "Error while checking admin" });
      set({ error: error });
      toast.error("Failed to delete the song.");
    }
  },
}));
