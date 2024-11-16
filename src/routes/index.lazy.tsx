import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../layouts/MainLayout";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <MainLayout>
      <div>Home Page Layout Route is here.</div>
    </MainLayout>
  );
}
