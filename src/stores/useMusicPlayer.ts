import { useChatStore } from "./useChatStore";
import { create } from "zustand";
import { MusicPlayer } from "../types/useMusicPlayerTypes";

export const useMusicPlayer = create<MusicPlayer>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  currentIndex: -1,
  queue: [],
  setCurrentSong: (song) => {
    if (!song) return;
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("updateActivity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAlbum: (songs, startIndex) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("updateActivity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  togglePlay: () => {
    const whileStartPlay = !get().isPlaying;
    set({
      isPlaying: whileStartPlay,
    });
  },
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("updateActivity", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }
      set({
        currentIndex: nextIndex,
        currentSong: nextSong,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("updateActivity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const previousSongIndex = currentIndex - 1;
    if (previousSongIndex < queue.length && previousSongIndex >= 0) {
      const currentSong = queue[currentIndex];
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("updateActivity", {
          userId: socket.auth.userId,
          activity: `Playing ${currentSong.title} by ${currentSong.artist}`,
        });
      }
      set({
        currentIndex: previousSongIndex,
        currentSong: currentSong,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("updateActivity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
}));
