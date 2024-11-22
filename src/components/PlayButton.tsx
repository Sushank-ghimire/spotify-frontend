import { Pause, Play } from "lucide-react";
import { Song } from "../types/useMusicStoreTypes";
import { useMusicPlayer } from "../stores/useMusicPlayer";

interface PropTypes {
  song: Song;
}

const PlayButton = ({ song }: PropTypes) => {
  const { setCurrentSong, currentSong, isPlaying, togglePlay } =
    useMusicPlayer();
  const isCurrentSong = song._id === currentSong?._id;
  const playSong = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };
  return (
    <button
      onClick={playSong}
      className="absolute p-3 cursor-pointer group-hover:bottom-2 -bottom-[50%] right-2 transition-all rounded-md bg-green-500"
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-4 font-bold text-black" />
      ) : (
        <Play className="size-4 font-bold text-black" />
      )}
    </button>
  );
};

export default PlayButton;
