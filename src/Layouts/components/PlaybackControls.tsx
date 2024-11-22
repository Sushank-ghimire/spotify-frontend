import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "../../stores/useMusicPlayer";
import { Button, Slider } from "../../components/Export";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";
import { calculateDuration } from "../../routes/album/$albumId/index.lazy";

const PlaybackControls = () => {
  const { currentSong, playNext, isPlaying, playPrevious, togglePlay } =
    useMusicPlayer();

  const [muted, setMuted] = useState(false);

  const [sound, setSound] = useState(50);
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

  const muteSong = () => {
    if (muted) {
      // Unmute
      setSound(50); // Update state for UI
      if (audioRef.current) audioRef.current.volume = 0.5; // Set volume directly
      setMuted(false);
    } else {
      // Mute
      setSound(0); // Update state for UI
      if (audioRef.current) audioRef.current.volume = 0; // Set volume directly
      setMuted(true);
    }
  };

  const handleSeek = (duration: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = duration[0];
    }
  };

  return (
    <footer className="w-full border-t bottom-0 bg-zinc-900 border-zinc-800 flex flex-row items-center justify-around absolute mx-auto h-[70px]">
      <div className="flex justify-between items-center min-w-[85%] max-w-full h-full mx-auto">
        {/* Current Playing SongData */}
        <div className="sm:flex hidden max-w-[33%] min-w-[180px] gap-4 items-center">
          {currentSong !== null && (
            <>
              <img
                className="w-14 h-14 object-cover rounded-md"
                src={currentSong.imageUrl}
                alt={currentSong.title}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium cursor-pointer hover:underline transition-all">
                  {currentSong.title}
                </div>
                <div className="text-sm truncate text-zinc-400 cursor-pointer hover:underline transition-all">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size={"icon"}
              className="bg-white hover:bg-white/80 h-8 w-8 transition-all rounded-full"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              onClick={togglePlay}
              size={"icon"}
              variant={"ghost"}
              className="text-zinc-400 hidden sm:inline-flex hover:text-white"
            >
              <Repeat className="size-5" />
            </Button>
          </div>
          <div className="hidden sm:flex w-full gap-2 items-center">
            <div className="text-xs text-zinc-400">
              {calculateDuration(Math.floor(currentTime))}
            </div>
            <Slider
              className="w-full hover:cursor-grab active:cursor-grabbing"
              step={1}
              value={[currentTime]}
              max={duration || 100}
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">
              {calculateDuration(Math.round(duration))}
            </div>
          </div>
        </div>
        {/* volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={muteSong}
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume1 className="h-4 w-4" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Slider
                value={muted ? [0] : [sound]}
                max={100}
                step={1}
                className="w-24 hover:cursor-grab active:cursor-grabbing"
                onValueChange={(value) => {
                  setMuted(false);
                  setSound(value[0]);
                  if (audioRef?.current) {
                    audioRef.current.volume = value[0] / 100;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
