import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return <>Admin Dashboard</>;
}
