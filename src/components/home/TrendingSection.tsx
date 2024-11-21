import { useMusicStore } from "../../stores/useMusicStore";
import DisplaySongs from "./DisplaySongs";

const TrendingSection = () => {
  const { trendingSongs } = useMusicStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center place-items-center lg:grid-cols-3 gap-4 mb-8">
      {trendingSongs.map((trending) => (
        <DisplaySongs songs={trending} key={trending._id} />
      ))}
    </div>
  );
};

export default TrendingSection;
