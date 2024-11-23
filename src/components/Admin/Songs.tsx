import { Calendar, Music,Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../Export";
import { Song } from "../../types/useMusicStoreTypes";
import { useAdminStore } from "../../stores/useAdmin";
import { useEffect } from "react";
import { useMusicStore } from "../../stores/useMusicStore";
import AddSongDialogue from "./AddSongAlert";

const Songs = () => {
  const { fetchAllSongs, allSongs } = useAdminStore();
  const { deleteSong } = useMusicStore();
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
        <AddSongDialogue />
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
        <div className="flex flex-col">
          {allSongs.length > 0 &&
            allSongs.map((songs) => (
              <DisplayFlexSongs
                deleteSong={deleteSong}
                song={songs}
                key={songs._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Songs;

type SongProps = {
  song: Song;
  deleteSong: (songId: string) => Promise<void>;
};

const DisplayFlexSongs = ({ song, deleteSong }: SongProps) => {
  return (
    <div className="grid mx-auto last:border-b hover:bg-white/5 py-3 p-2 transition-all grid-cols-4 cursor-pointer w-full items-center border-t border-zinc-800">
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
      <div className="flex w-full gap-1 items-center justify-center">
        <Calendar className="size-4" /> {song.createdAt?.split("T")[0]}
      </div>
      <div className="flex w-full items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="text-red-500 hover:text-red-400 transition-all rounded-md size-6 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you really wanted to delete this song ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                song and this songs data from the servers and database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteSong(song._id);
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
