import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { useMusicStore } from "../../../stores/useMusicStore";
import Loader from "../../../components/Loader";
import { Button, ScrollArea } from "../../../components/Export";
import { Clock, Music, Pause, Play } from "lucide-react";
import { Song } from "../../../types/useMusicStoreTypes";
import { useMusicPlayer } from "../../../stores/useMusicPlayer";

export const Route = createLazyFileRoute("/album/$albumId/")({
  component: RouteComponent,
});

const gradientColors = [
  "bg-gradient-to-b from-indigo-700/80 via-zinc-900/80 to-zinc-900",
  "bg-gradient-to-b from-green-500/80 via-blue-700/80 to-indigo-800",
  "bg-gradient-to-b from-pink-500/80 via-purple-600/80 to-blue-900",
  "bg-gradient-to-b from-orange-400/80 via-red-600/80 to-yellow-700",
  "bg-gradient-to-b from-teal-500/80 via-cyan-600/80 to-indigo-900",
  "bg-gradient-to-b from-red-500/80 via-orange-500/80 to-yellow-500",
  "bg-gradient-to-b from-blue-800/80 via-indigo-600/80 to-purple-800",
  "bg-gradient-to-b from-purple-700/80 via-pink-500/80 to-red-400",
  "bg-gradient-to-b from-yellow-600/80 via-orange-500/80 to-red-500",
  "bg-gradient-to-b from-gray-700/80 via-gray-800/80 to-black",
  "bg-gradient-to-b from-cyan-500/80 via-teal-500/80 to-green-600",
  "bg-gradient-to-b from-lime-500/80 via-green-600/80 to-emerald-700",
  "bg-gradient-to-b from-rose-500/80 via-fuchsia-500/80 to-purple-700",
  "bg-gradient-to-b from-indigo-900/80 via-sky-600/80 to-teal-500",
];

function RouteComponent() {
  const { albumId }: { albumId: string } = Route.useParams();
  const { fetchAlbumById, isLoading, currentAlbum, albumSongs } =
    useMusicStore();

  const { playAlbum, currentSong, isPlaying, togglePlay } = useMusicPlayer();

  const handlePlayAlbum = (index: number) => {
    if (albumSongs) {
      playAlbum(albumSongs, index);
    }
  };

  const handleAlbumPlayToggle = () => {
    const isCurrentAlbumPlaying = albumSongs?.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      handlePlayAlbum(0);
    }
  };

  const [gradient, setGradient] = useState("");

  useEffect(() => {
    // Pick a random gradient from the array
    const randomGradient =
      gradientColors[Math.floor(Math.random() * gradientColors.length)];
    setGradient(randomGradient);
    if (!albumId) return;
    fetchAlbumById(albumId);
  }, [albumId, fetchAlbumById]);
  return (
    <MainLayout>
      {isLoading ? (
        <div className="h-full w-full">
          <Loader />
        </div>
      ) : currentAlbum === null ? (
        "Album not founded"
      ) : (
        <div className="w-full h-[calc(100vh-70px)] pb-4">
          <ScrollArea className="h-full overflow-y-scroll">
            {/* Main Content */}
            <div className="relative min-h-full">
              {/* Bg Gradient */}
              <div
                aria-hidden="true"
                className={`inset-0 absolute rounded-sm pointer-events-none ${gradient}`}
              />

              {/* Content */}
              <div className="z-10 relative">
                <div className="p-6 flex gap-6 pb-8">
                  <img
                    className="w-[240px] h-[240px] shadow-lg rounded-md"
                    src={currentAlbum.imageUrl}
                    alt={currentAlbum.title}
                  />
                  <div className="flex flex-col justify-end">
                    <p className="text-sm font-medium"> Album </p>
                    <h1 className="md:text-7xl text-3xl font-bold my-4">
                      {currentAlbum.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-zinc-100">
                      <span className="font-medium text-white">
                        {currentAlbum.artist}
                      </span>
                      <span>{currentAlbum.songs?.length} songs</span>
                      <span>{currentAlbum.releaseYear}</span>
                    </div>
                  </div>
                </div>
                {/* Songs and Controls */}
                <div className="px-6 pb-4 flex items-center gap-6">
                  {/* Play Button */}
                  <Button
                    onClick={handleAlbumPlayToggle}
                    className="h-14 w-14 rounded-full bg-green-400 hover:bg-green-500/80 hover:scale-105 group transition-all"
                    size={"icon"}
                  >
                    {isPlaying &&
                    albumSongs?.some(
                      (song) => song._id === currentSong?._id
                    ) ? (
                      <Pause className="h-7 group-hover:scale-110 transition-all group-hover:font-bold w-7 rounded text-black" />
                    ) : (
                      <Play className="h-7 group-hover:scale-110 transition-all group-hover:font-bold w-7 rounded text-black" />
                    )}
                  </Button>
                </div>
                {/* Songs Table Section */}
                <div className="bg-black/20 backdrop-blur">
                  {/* Table Header */}
                  <div className="grid mb-2 grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-4 text-sm text-zinc-400 border-b border-white/5">
                    <div>#</div>
                    <div>Title</div>
                    <div>Released Date</div>
                    <div>
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Songs List */}
                  <div className="px-6 ">
                    <div className="space-x-4 space-y-2">
                      {albumSongs !== null &&
                        albumSongs?.map((songs, index) => (
                          <DisplaySongs
                            playAlbumSongs={handlePlayAlbum}
                            key={songs._id}
                            songs={songs}
                            index={index}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </MainLayout>
  );
}

const calculateDuration = (duration: number) => {
  if (duration < 60) {
    return `0:${duration.toString().padStart(2, "0")}`;
  }
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = duration % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const DisplaySongs = ({
  songs,
  index,
  playAlbumSongs,
}: {
  songs: Song;
  index: number;
  playAlbumSongs: (index: number) => void;
}) => {
  const { currentSong, isPlaying } = useMusicPlayer();
  const isCurrentSong = currentSong?._id === songs._id;
  return (
    <div
      onClick={() => playAlbumSongs(index)}
      key={songs._id}
      className="grid grid-cols-[14px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
    >
      <div className="flex items-center justify-between">
        {isCurrentSong && isPlaying ? (
          <div className="text-green-500 size-3 justify-center flex items-center">
            <Music />
          </div>
        ) : (
          <span className="group-hover:hidden flex justify-center items-center text-center w-full">
            {index + 1}
          </span>
        )}
        {!isCurrentSong && (
          <Play className="hidden absolute group-hover:block h-4 w-4 text-white" />
        )}
      </div>
      <div className="flex items-center gap-3">
        <img
          src={songs.imageUrl}
          className="size-10 rounded-sm"
          alt={songs.title}
        />
        <div className="flex gap-2">
          <span className="font-medium text-white truncate">{songs.title}</span>
          <span>{songs.artist}</span>
        </div>
      </div>
      <div className="flex items-center">{songs.createdAt?.split("T")[0]}</div>
      <div className="flex items-center">
        {calculateDuration(songs.duration)}
      </div>
    </div>
  );
};
