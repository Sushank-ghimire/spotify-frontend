import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";
import Topbar from "../../components/Topbar";

export const Route = createFileRoute("/album/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Topbar />
      <div>Album Route is here.</div>
    </MainLayout>
  );
}
