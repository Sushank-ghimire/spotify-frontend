import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminStore } from "../../stores/useAdmin";
import { useEffect } from "react";

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
    <div className="min-h-screen w-screen bg-zinc-900">
      
    </div>
  );
}
