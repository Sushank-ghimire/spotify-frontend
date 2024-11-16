import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/Topbar";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <MainLayout>
      <Topbar />
      <div>Home Page Layout Route is here.</div>
    </MainLayout>
  );
}
