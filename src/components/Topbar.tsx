import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";
import SignedOutAuthButton from "./SignedOutAuthButton";
import { useAdminStore } from "../stores/useAdmin";

const Topbar = () => {
  const { isAdmin, isLoading } = useAdminStore();

  isLoading && null;

  return (
    <div className="flex justify-between items-center p-4 backdrop-blur-md bg-zinc-900/75 sticky top-0 mt-2 rounded">
      <div className="flex justify-center gap-2">
        <img src="/spotify.png" className="h-8" alt="" />
      </div>
      <div className="flex justify-center gap-4">
        {isAdmin && (
          <Link
            className="gap-2 flex justify-between bg-black border p-2 rounded text-sm items-center"
            to="/admin"
          >
            <LayoutDashboardIcon className="size-5 mr-2" /> Admin Dashboard
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
