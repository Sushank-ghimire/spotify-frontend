import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "../../components/Export";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "../../lib/axios";

export const Route = createLazyFileRoute("/auth-callback/")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  const syncAttempted = useRef(false);

  const { isLoaded, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      try {
        syncAttempted.current = true;
        if (!user || !isLoaded || syncAttempted.current) return;
        await axiosInstance.post("api/v1/users/register", {
          clerkId: user?.id,
          profileUrl: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress,
          userFullName: user?.fullName,
        });
      } catch (error) {
        console.log("Error in auth callback : ", error);
      } finally {
        navigate({ to: "/" });
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-8 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-400 text-md">Redirecting..</p>
        </CardContent>
      </Card>
    </div>
  );
}
