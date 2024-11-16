import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";

export const Route = createFileRoute("/album/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>Album Route is here.</div>
    </MainLayout>
  );
}
