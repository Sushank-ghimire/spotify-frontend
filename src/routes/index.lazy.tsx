import { createLazyFileRoute } from "@tanstack/react-router";
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

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs } =
    useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrendingSongs]);
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md mt-2 overflow-y-scroll">
        <Topbar />
        <ScrollArea className="h-[calc(100vh-165px)] p-2 overflow-y-scroll">
          <div className="w-full p-2 flex flex-col gap-4 h-auto">
            <h1 className="text-lg flex justify-between items-center font-bold md:ml-2 md:text-2xl">
              Good Afternoon
            </h1>
            <FeaturedSection />
          </div>
          <div className="space-y-8">
            <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center">
              Made For You
              <span className="text-sm hover:text-zinc-400 transition-all text-zinc-600 capitalize cursor-pointer">
                show all
              </span>
            </h1>
            <MadeForYouSection />
          </div>
          <div className="space-y-8">
            <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center mt-4">
              Trending
              <span className="text-sm hover:text-zinc-400 transition-all text-zinc-600 capitalize cursor-pointer">
                show all
              </span>
            </h1>
            <TrendingSection />
          </div>
        </ScrollArea>
      </div>
    </MainLayout>
  );
}
