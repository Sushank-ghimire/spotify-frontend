import { Link } from "@tanstack/react-router";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { PlaylistSkeleton } from "../../components/Export";

const LeftSideBar = () => {
  const { isSignedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-2 text-lg">
      {/* Nav Section */}
      <nav className="flex flex-col gap-2 rounded-t-lg bg-zinc-900 p-4 w-full h-auto">
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white bg-zinc-900",
            })
          )}
          to="/"
        >
          <HomeIcon className="md:mr-2 size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        {isSignedIn ? (
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white bg-zinc-900",
              })
            )}
            to="/chat"
          >
            <MessageCircleIcon className="md:mr-2 size-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        ) : null}
      </nav>

      {/* Library Section */}
      <section className="flex flex-1 rounded-b-lg flex-col gap-2 p-4 bg-zinc-900 h-full">
        <div className="flex justify-center flex-col mb-4 items-center md:mr-2">
          <div className="flex items-center justify-start w-full">
            <Library className="size-6 md:mr-2" />
            <span className="hidden md:inline justify-end">Playlists</span>
          </div>
        </div>
        {isLoading ? (
          <PlaylistSkeleton />
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]"></ScrollArea>
        )}
      </section>
    </div>
  );
};

export default LeftSideBar;
