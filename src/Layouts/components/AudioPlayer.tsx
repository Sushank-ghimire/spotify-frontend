import { useEffect, useRef } from "react";
import { useMusicPlayer } from "../../stores/useMusicPlayer";

const AudioPlayer = () => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const previousSongRef = useRef<null | string>(null);

  const { currentSong, isPlaying, playNext } = useMusicPlayer();

  // Handles Song play/pause Logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // Handles Song ends Logic
  useEffect(() => {
    const handleAudioEnd = () => {
      playNext();
    };
    const audio = audioRef.current;
    audio?.addEventListener("ended", handleAudioEnd);
    return () => {
      audio?.removeEventListener("ended", handleAudioEnd);
    };
  }, [playNext]);

  // Handle Song Changes
  useEffect(() => {
    const audio = audioRef.current;

    // Check the song is previous or new
    const isSongChanged = previousSongRef?.current !== currentSong?.audioUrl;
    if (isSongChanged && audio) {
      audio.src = currentSong?.audioUrl as string;

      // Reseting the playback positions
      audio.currentTime = 0;
      previousSongRef.current = currentSong?.audioUrl as string;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
