import { SignUp } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sign-up/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen w-screen flex justify-center items-center">
      <SignUp path="/sign-up" />
    </main>
  );
}
