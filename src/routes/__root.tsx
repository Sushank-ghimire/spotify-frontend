import { createRootRoute, Outlet } from "@tanstack/react-router";
import NotFoundPage from "../components/NotFound";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: NotFoundPage,
});
