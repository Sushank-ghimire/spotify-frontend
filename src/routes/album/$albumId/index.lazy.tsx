import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Album, useMusicStore } from "../../../stores/useMusicStore";
import Loader from "../../../components/Loader";

export const Route = createLazyFileRoute("/album/$albumId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { albumId }: { albumId: string } = Route.useParams();
  const [album, setAlbum] = useState<Album[] | undefined>(undefined); // Initialize state with `undefined`
  const { fetchAlbumById, isLoading } = useMusicStore();

  useEffect(() => {
    const fetchData = async () => {
      if (albumId) {
        const albumData = await fetchAlbumById(albumId);
        setAlbum(albumData ? [albumData] : undefined); 
      }
    };
    fetchData();
  }, [albumId]);
  return (
    <MainLayout>
      {isLoading ? (
        <div className="h-full w-full">
          <Loader />
        </div>
      ) : (
        "Album Fetched"
      )}
    </MainLayout>
  );
}
