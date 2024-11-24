import { Library, Trash2 } from "lucide-react";
import { useMusicStore } from "../../stores/useMusicStore";
import AddAlbumDialogue from "./AddAlbumDialogue";
import { useEffect } from "react";
import { Album as AlbumType } from "../../types/useMusicStoreTypes";
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

const Album = () => {
  const { fetchAlbums, albums, deleteAlbum } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <div className="flex justify-normal items-center w-[99vw] md:w-[90vw] mx-auto rounded p-3 bg-zinc-900 flex-col gap-4 mt-3">
      <div className="flex w-full justify-between gap-2 items-center">
        <div className="flex flex-col items-center justify-netween">
          <div className="flex gap-2 items-center">
            <Library className="size-6 text-green-600" />
            <h1 className="text-lg text-white font-medium">Albums Library</h1>
          </div>
          <p className="text-zinc-400 md:pl-8">manage your albums collection</p>
        </div>
        <AddAlbumDialogue />
      </div>
      {/* Music Table Place Here */}
      <div className="flex flex-col gap-3 w-full p-4">
        {/* Table Header */}
        <div className="grid mx-auto grid-cols-4 w-full items-center font-bold">
          <div className="w-full min-w-1/4 flex-grow text-center">Title</div>
          <div className="w-full min-w-1/4 flex-grow text-center">Artist</div>
          <div className="w-full min-w-1/4 flex-grow text-center">Songs</div>
          <div className="w-full min-w-1/4 flex-grow text-center">Action</div>
        </div>

        {/* Albums List  */}
        <div className="flex flex-col">
          {albums.map((album) => (
            <ShowAlbums album={album} deleteAlbum={deleteAlbum} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;

interface PropTypes {
  album: AlbumType;
  deleteAlbum: (albumId: string) => void;
}

const ShowAlbums = ({ album, deleteAlbum }: PropTypes) => {
  return (
    <div className="grid mx-auto last:border-b hover:bg-white/5 py-3 p-2 transition-all grid-cols-4 cursor-pointer w-full items-center border-t border-zinc-800">
      <div className="flex w-full gap-3 items-center justify-center">
        <img
          className="size-8 rounded-md object-cover"
          src={album.imageUrl}
          alt={album.title}
        />
        <p className="w-1/3 text-left truncate">{album.title}</p>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="text-left w-1/2 font-medium">{album.artist}</p>
      </div>
      <div className="flex w-full gap-1 items-center justify-center">
        {album.songs?.length}
      </div>
      <div className="flex w-full items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="text-red-500 hover:text-red-400 transition-all rounded-md size-6 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you really wanted to delete this album ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                album and this songs data from the servers and database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteAlbum(album._id);
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
