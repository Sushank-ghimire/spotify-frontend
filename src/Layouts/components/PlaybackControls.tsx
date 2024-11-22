import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "../../stores/useMusicPlayer";

const PlaybackControls = () => {
  const { currentSong, playNext, isPlaying, playPrevious, togglePlay } =
    useMusicPlayer();

  const [sound, setSound] = useState(75);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      useMusicPlayer.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  return (
    <div className="w-full bottom-0 bg-zinc-900/75 flex flex-row items-center justify-around"></div>
  );
};

export default PlaybackControls;
