import { createLazyFileRoute, Link } from "@tanstack/react-router";
import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/Topbar";
import { useMusicStore } from "../stores/useMusicStore";
import { useEffect } from "react";
import {
  FeaturedSection,
  MadeForYouSection,
  ScrollArea,
} from "../components/Export";
import TrendingSection from "../components/home/TrendingSection";
import { useMusicPlayer } from "../stores/useMusicPlayer";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const {
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  const { initializeQueue } = useMusicPlayer();

  // To fetch all the songs
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      featuredSongs.length > 0 &&
      trendingSongs.length > 0 &&
      madeForYouSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...trendingSongs, ...madeForYouSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md mt-2 overflow-y-scroll">
        <Topbar />
        <ScrollArea className="h-[calc(100vh-160px)] p-2 overflow-y-scroll">
          <div className="w-full p-2 flex flex-col gap-4 h-auto">
            <h1 className="text-lg flex justify-between items-center font-bold md:text-2xl">
              Good Afternoon
            </h1>
            <FeaturedSection />
          </div>
          <div className="space-y-8">
            <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center">
              Made For You
              <span className="text-sm hover:text-zinc-400 transition-all text-zinc-600 capitalize cursor-pointer">
                <Link to="/made-for-you">show all</Link>
              </span>
            </h1>
            <MadeForYouSection />
          </div>
          <div className="space-y-8">
            <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center mt-4">
              Trending
              <span className="text-sm hover:text-zinc-400 transition-all text-zinc-600 capitalize cursor-pointer">
                <Link to="/trending">show all</Link>
              </span>
            </h1>
            <TrendingSection />
          </div>
        </ScrollArea>
      </div>
    </MainLayout>
  );
}
