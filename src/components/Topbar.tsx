import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";
import SignedOutAuthButton from "./SignedOutAuthButton";
import { useAdminStore } from "../stores/useAdmin";

const Topbar = () => {
  const { isAdmin, isLoading } = useAdminStore();

  isLoading && null;

  return (
    <div className="flex justify-between items-center p-4 backdrop-blur-md bg-zinc-900/75 sticky top-0 rounded">
      <div className="flex justify-center gap-2 items-center text-lg cursor-pointer">
        <img src="/spotify.png" className="h-8" alt="" />
        <span className="hidden md:block">Spotify</span>
      </div>
      <div className="flex justify-center gap-4">
        {isAdmin && (
          <Link
            className="gap-2 flex justify-center md:justify-between bg-black border p-2 rounded text-sm items-center hover:bg-zinc-800 transition-all"
            to="/admin"
          >
            <LayoutDashboardIcon className="size-5 mr-2" />{" "}
            <span className="hidden md:block">Admin Dashboard</span>
          </Link>
        )}
        <SignedOut>
          <SignedOutAuthButton />
        </SignedOut>

        <SignedIn>
          <UserButton
            userProfileMode="modal"
            appearance={{
              elements: {
                formButtonPrimary: "dark:bg-zinc-900 text-sm",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
