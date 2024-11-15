import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/album/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Album Route is here.</div>;
}
