import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Song, useMusicStore } from "../../../stores/useMusicStore";
import Loader from "../../../components/Loader";
import { Button, ScrollArea } from "../../../components/Export";
import { Clock, Play } from "lucide-react";

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
  const { fetchAlbumById, isLoading, currentAlbum } = useMusicStore();

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
        <div className="min-h-[calc(100vh-300px)] w-full">
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
                    className="h-14 w-14 rounded-full bg-green-400 hover:bg-green-500/80 hover:scale-105 group transition-all"
                    size={"icon"}
                  >
                    <Play className="h-7 group-hover:scale-110 transition-all group-hover:font-bold w-7 rounded text-black" />
                  </Button>
                </div>
                {/* Songs Table Section */}
                <div className="bg-black/20 backdrop-blur">
                  {/* Table Header */}
                  <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
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
                      {currentAlbum.songs?.map((songs, index) => (
                        <DisplaySongs
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

const DisplaySongs = ({ songs, index }: { songs: Song; index: number }) => {
  return (
    <div
      key={songs._id}
      className="cursor-pointer grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 w-full hover:bg-white/5 rounded-md group"
    >
      <div className="flex items-center justify-center">
        <span className="group-hover:hidden">{index + 1}</span>
        <Play className="h-4 hidden group-hover:block w-4 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <img src={songs.imageUrl} alt={songs.title} />
        <div>
          <span className="font-medium text-white">{songs.title}</span>
          <span>{songs.artist}</span>
        </div>
      </div>
      <div className="flex items-center">{songs.createdAt?.split("T")[0]}</div>
      <div className="flex items-center">{songs.duration}</div>
    </div>
  );
};
