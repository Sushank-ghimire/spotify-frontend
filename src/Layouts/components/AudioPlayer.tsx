import { useEffect, useRef } from "react";
import { useMusicPlayer } from "../../stores/useMusicPlayer";

const AudioPlayer = () => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const previousSongRef = useRef<null | string>(null);

  const { currentSong, isPlaying } = useMusicPlayer();

  // Handles Song play/pause Logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // Handles Song Change Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong?.audioUrl as string;
    }
  }, [currentSong]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
