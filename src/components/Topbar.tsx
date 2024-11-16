import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";
import SignedOutAuthButton from "./SignedOutAuthButton";

const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex justify-between items-center p-4 backdrop-blur-md bg-zinc-900/75 sticky top-0 mt-2 rounded">
      <div className="flex justify-center gap-2">Spotify</div>
      <div className="flex justify-center gap-4">
        {isAdmin && (
          <Link className="gap-2" to="/admin">
            <LayoutDashboardIcon className="size-8 mr-2" /> Admin Dashboard
          </Link>
        )}
        <SignedOut>
          <SignedOutAuthButton />
        </SignedOut>

        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
