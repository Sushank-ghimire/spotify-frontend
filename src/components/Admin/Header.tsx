import { UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <nav className="flex md:px-8 justify-between items-center w-full h-fit p-2 md:p-4">
      <div className="flex gap-3 items-center">
        <Link to="/">
          <img className="md:size-10 size-6" src="./spotify.png" alt="Logo" />
        </Link>
        <div className="flex flex-col text-zinc-400">
          <h1 className="xl:text-2xl md:text-lg truncate font-bold text-white">
            Admin Music Manager
          </h1>
          <p className="text-sm">Manage your musics</p>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};

export default Header;
