import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";
import { useUser } from "@clerk/clerk-react";
import SignedOutAuthButton from "../../components/SignedOutAuthButton";

export const Route = createLazyFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return (
      <MainLayout>
        <div className="bg-zinc-900 h-[calc(100vh-137px)] rounded-md mt-2 w-full flex justify-center items-center">
          <SignedOutAuthButton />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="bg-zinc-900 h-full w-full">This is chat page layout</div>
    </MainLayout>
  );
}
