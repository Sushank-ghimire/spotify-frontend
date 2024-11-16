import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";

export const Route = createLazyFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>This is chat page layout</div>
    </MainLayout>
  );
}
