import { Users2 } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore";
import { useEffect } from "react";
import { User } from "../../types/useMessages.types";


const Users = () => {
  const { getUsers, users } = useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="flex justify-between w-[99vw] md:w-[90vw] mx-auto rounded p-3 bg-zinc-900 flex-col gap-4 mt-3">
      <h1 className="flex gap-3 text-xl md:text-2xl items-center font-bold">
        All users <Users2 className="text-green-500" />
      </h1>

      <div className="flex flex-col gap-3 w-full p-4">
        {/* Table Header */}
        <div className="grid mx-auto grid-cols-3 w-full items-center font-bold">
          <div className="w-full min-w-1/3 flex-grow text-center">
            Full Name
          </div>
          <div className="w-full min-w-1/3 flex-grow text-center">Email</div>
          <div className="w-full min-w-1/3 flex-grow text-center">
            CreatedAt
          </div>
        </div>

        {/* Users List  */}
        <div className="flex flex-col">
          {users &&
            users.map((user) => <MapUsers user={user} key={user._id} />)}
        </div>
      </div>
    </section>
  );
};

export default Users;

type PropTypes = {
  user: User;
};

const MapUsers = ({ user }: PropTypes) => {
  return (
    <div className="grid mx-auto last:border-b hover:bg-white/5 py-3 p-2 transition-all grid-cols-3 cursor-pointer w-full items-center border-t border-zinc-800">
      <div className="flex w-full gap-3 items-center justify-center">
        <img
          className="size-8 rounded-md object-cover"
          src={user.profileUrl}
          alt={user.userFullName}
        />
        <p className="w-1/3 text-left truncate">{user.userFullName}</p>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="text-left w-1/2 font-medium">{user.email}</p>
      </div>
      <div className="flex w-full gap-1 items-center truncate justify-center">
        {user.createdAt.split("T")[0]}
      </div>
    </div>
  );
};
