import { Music, Plus, Trash2 } from "lucide-react";
import { Button } from "../Export";
import { Song } from "../../types/useMusicStoreTypes";
import { useAdminStore } from "../../stores/useAdmin";
import { useEffect } from "react";

const Songs = () => {
  const { fetchAllSongs, allSongs } = useAdminStore();
  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);
  return (
    <div className="flex justify-normal items-center w-[99vw] md:w-[90vw] mx-auto rounded p-3 bg-zinc-900 flex-col gap-4 mt-3">
      <div className="flex w-full justify-between gap-2 items-center">
        <div className="flex flex-col items-center justify-netween">
          <div className="flex gap-2 items-center">
            <Music className="size-4 text-green-600" />
            <h1 className="text-lg text-white font-medium">Songs Library</h1>
          </div>
          <p className="text-zinc-400 md:pl-8">manage your music tracks</p>
        </div>
        <Button className="text-white">
          <Plus className="font-bold" /> Add songs
        </Button>
      </div>
      {/* Music Table Place Here */}
      <div className="flex flex-col gap-3 w-full p-4">
        {/* Table Header */}
        <div className="grid mx-auto grid-cols-4 w-full items-center font-bold">
          <div className="w-full min-w-1/4 flex-grow text-center">Title</div>
          <div className="w-full min-w-1/4 flex-grow text-center">Artist</div>
          <div className="w-full min-w-1/4 flex-grow text-center">
            Released Date
          </div>
          <div className="w-full min-w-1/4 flex-grow text-center">Action</div>
        </div>

        {/* Song List  */}
        <div className="flex flex-col gap-4">
          {allSongs.length > 0 &&
            allSongs.map((songs) => (
              <DisplayFlexSongs song={songs} key={songs._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Songs;

type SongProps = {
  song: Song;
};

const DisplayFlexSongs = ({ song }: SongProps) => {
  return (
    <div className="grid mx-auto grid-cols-4 w-full items-center">
      <div className="flex w-full gap-3 items-center justify-center">
        <img
          className="size-8 rounded-md object-cover"
          src={song.imageUrl}
          alt={song.title}
        />
        <p className="w-1/3 text-left truncate">{song.title}</p>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="text-left w-1/2 font-medium">{song.artist}</p>
      </div>
      <div className="flex w-full items-center justify-center">
        {song.createdAt?.split("T")[0]}
      </div>
      <div className="flex w-full items-center justify-center">
        <Trash2 className="text-red-500 hover:text-red-400 transition-all rounded-md size-6 cursor-pointer" />
      </div>
    </div>
  );
};
