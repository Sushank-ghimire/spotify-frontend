import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => {
    const navigate = useNavigate();
    return (
      <div className="flex h-screen w-screen md:text-3xl text-xl justify-center items-center flex-col gap-3">
        <p className="font-bold capitalize">404 | Page Not found</p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-2 py-3 px-4 hover:scale-95 transition-all border-zinc-400 bg-zinc-500/75 text-lg rounded-lg"
        >
          Go back to Homepage
        </button>
      </div>
    );
  },
});
