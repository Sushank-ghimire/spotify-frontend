import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";
import { MadeForYouSection } from "../../components/Export";
import { useMusicStore } from "../../stores/useMusicStore";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/made-for-you/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { fetchMadeForYouSongs } = useMusicStore();
  useEffect(() => {
    fetchMadeForYouSongs();
  }, [fetchMadeForYouSongs]);
  return (
    <MainLayout>
      <div className="h-[calc(100vh-93px)] flex flex-col p-3 rounded-md mt-2 bg-zinc-900 overflow-y-auto">
        <div className="space-y-8">
          <h1 className="text-lg font-bold md:ml-2 md:text-2xl flex justify-between items-center">
            Made For You
          </h1>{" "}
          <MadeForYouSection />
        </div>
      </div>
    </MainLayout>
  );
}
