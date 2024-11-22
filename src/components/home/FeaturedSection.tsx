import { useMusicStore } from "../../stores/useMusicStore";
import { FeaturedGridSkeleton, PlayButton } from "../Export";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  if (isLoading) {
    return <FeaturedGridSkeleton />;
  }
  if (error) {
    return (
      <p className="text-red-600 text-lg text-center font-bold">
        Error occured : Refresh to resolve the error.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center place-items-center lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((songs) => (
        <div
          className="cursor-pointer flex items-center bg-zinc-800/50 rounded-md overflow-hidden w-full hover:bg-zinc-700/50 group transition-all relative"
          key={songs._id}
        >
          <img
            className="rounded-sm sm:w-20 h-16 w-16 flex-shrink-0 object-cover sm:h-20"
            src={songs.imageUrl}
            alt={songs.title}
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{songs.title}</p>
            <p className="text-zinc-400 text-sm truncate">{songs.artist}</p>
          </div>
          <PlayButton song={songs} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
