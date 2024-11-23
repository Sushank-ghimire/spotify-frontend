import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminStore } from "../../stores/useAdmin";
import { useEffect } from "react";
import { AdminTabs, DashboardStats, Header } from "../../components/Export";

export const Route = createLazyFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { isAdmin, fetchAdmin } = useAdminStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdmin, fetchAdmin]);
  if (!isAdmin) return null;
  return (
    <div className="min-h-screen flex flex-col gap-4 w-screen bg-indigo-800/5">
      <Header />
      <DashboardStats />
      <AdminTabs />
    </div>
  );
}
