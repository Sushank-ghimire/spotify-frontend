import { Song } from "../../stores/useMusicStore";

type Props = {
  songs: Song;
};

const DisplaySongs = ({ songs }: Props) => {
  return (
    <div
      className="cursor-pointer flex items-center bg-zinc-800/50 rounded-md overflow-hidden w-full flex-col hover:bg-zinc-700/50 group transition-all relative pb-3 p-4"
      key={songs._id}
    >
      <div className="overflow-hidden">
        <img
          className="group-hover:scale-105 aspect-square transition-all duration-200 rounded-sm"
          src={songs.imageUrl}
          alt={songs.title}
        />
      </div>
      <div className="flex w-full justify-between text-left mt-3">
        <div className="">
          <p className="text-lg text-zinc-300 truncate">{songs.title}</p>
          <p className="text-sm text-zinc-400 truncate">{songs.artist}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DisplaySongs;
