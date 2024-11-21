import { useMusicStore } from "../../stores/useMusicStore";
import { SongsGridSkeleton } from "../Export";
import DisplaySongs from "./DisplaySongs";

const MadeForYouSection = () => {
  const { isLoading, madeForYouSongs } = useMusicStore();
  if (isLoading) {
    return <SongsGridSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center place-items-center lg:grid-cols-3 gap-4 mb-8">
      {madeForYouSongs.map((forYou) => (
        <DisplaySongs songs={forYou} key={forYou._id} />
      ))}
    </div>
  );
};

export default MadeForYouSection;
