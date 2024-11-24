import { useEffect } from "react";
import { useAdminStore } from "../../stores/useAdmin";
import { Album, Music, Users, PlayCircleIcon } from "lucide-react";
import { Button } from "../Export";
import { cn } from "../../lib/utils";

const DashboardStats = () => {
  const { fetchStats, statsData, isLoading } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <section className="w-[90vw] mx-auto gap-4 grid grid-cols-2 md:grid-cols-4 items-center">
      {isLoading ? (
        Array(4).map((_, index) => <StatItemSkeleton key={index} />)
      ) : (
        <>
          <StatItemLayout
            color="green"
            Icon={Album}
            title="Total Albums"
            stat={statsData?.totalAlbums!}
          />
          <StatItemLayout
            Icon={Music}
            title="Total Songs"
            color="indigo"
            stat={statsData?.totalSongs!}
          />
          <StatItemLayout
            color="red"
            Icon={Users}
            title="Total Artists"
            stat={statsData?.uniqueArtists[0].count!}
          />
          <StatItemLayout
            color="blue"
            Icon={PlayCircleIcon}
            title="Total Users"
            stat={statsData?.totalUsers!}
          />
        </>
      )}
    </section>
  );
};

export default DashboardStats;

interface StatItemLayoutProp {
  title: string;
  stat: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const StatItemLayout = ({ title, stat, Icon, color }: StatItemLayoutProp) => {
  const colorClass =
    {
      green: "text-green-600",
      indigo: "text-indigo-600",
      red: "text-red-600",
      blue: "text-blue-600",
      yellow: "text-yellow-600",
    }[color] || "text-gray-600";
  return (
    <div className="w-full px-3 md:py-4 py-3 rounded-md bg-zinc-900 flex justify-start gap-2 md:gap-3 items-center">
      <Button
        variant="ghost"
        className={cn(
          "size-6 font-bold p-4 hover:opacity-80",
          colorClass,
          `hover:${colorClass}`
        )}
      >
        <Icon />{" "}
      </Button>
      {/* Render the passed icon */}
      <div>
        <h1 className="md:font-bold font-normal text-sm md:text-md truncate">{title}</h1>
        <p>{stat}</p>
      </div>
    </div>
  );
};

const StatItemSkeleton = () => {
  return (
    <div className="w-full px-3 py-2 rounded-md bg-zinc-900 flex justify-start gap-2 md:gap-3 items-center">
      {/* Icon Placeholder */}
      <div className="w-6 h-6 rounded-full bg-zinc-700 animate-pulse shrink-0" />
      {/* Text Placeholder */}
      <div className="flex flex-col gap-1 w-full">
        <div className="w-2/3 h-4 bg-zinc-700 rounded-md animate-pulse" />
        <div className="w-1/3 h-3 bg-zinc-700 rounded-md animate-pulse" />
      </div>
    </div>
  );
};
