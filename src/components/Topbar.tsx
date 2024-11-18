import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";
import SignedOutAuthButton from "./SignedOutAuthButton";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const Topbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        // const { data } = await axiosInstance.get("/admin/check");
        if (isAdmin) {
          setIsAdmin(true);
        }
        return;
      } catch (error) {
        console.log("error occured in topbar component : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkIsAdmin();
  }, [isLoading, isAdmin]);

  isLoading && null;

  return (
    <div className="flex justify-between items-center p-4 backdrop-blur-md bg-zinc-900/75 sticky top-0 mt-2 rounded">
      <div className="flex justify-center gap-2">Spotify</div>
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
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
