import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";
import TrendingSection from "../../components/home/TrendingSection";
import { useMusicStore } from "../../stores/useMusicStore";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/trending/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { fetchTrendingSongs } = useMusicStore();
  useEffect(() => {
    fetchTrendingSongs();
  }, []);
  return (
    <MainLayout>
      <div className="h-[calc(100vh-93px)] overflow-y-scroll p-3 rounded-md mt-2 bg-zinc-900">
        <div className="space-y-8">
          <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center">
            Trending
          </h1>{" "}
          <TrendingSection />
        </div>
      </div>
    </MainLayout>
  );
}
