import { Users2 } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore";
import { useEffect } from "react";
import { User } from "../../types/useMessages.types";

const dummyUsers: User[] = [
  {
    clerkId: "user_2okW0wFURfQBqQPw5TSES3uYzu0",
    createdAt: "2024-11-15T12:50:00.628Z",
    email: "ghimire@gmail.com",
    profileUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yb2tXMHpBQkxxbkdybDJ0Y2Q2NE84VHRQakcifQ",
    updatedAt: "2024-11-15T12:50:00.628Z",
    userFullName: "Sushank Ghimire",
    _id: "673743784abb80740d29c091"
  },
  {
    clerkId: "user_3klV5x1FZTj8t7n2RsW9x5u4QyT9",
    createdAt: "2024-11-14T09:20:15.234Z",
    email: "janedoe@example.com",
    profileUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zY3ZnN0pTeTlXU05NYzJlSkEyOG5ReTI0Mm9y0s9V24Q",
    updatedAt: "2024-11-14T09:20:15.234Z",
    userFullName: "Jane Doe",
    _id: "983743784abb80740d19c123"
  },
  {
    clerkId: "user_XYZ4sQkL2XZ6Tp1n1Y8L5f7T2D6v",
    createdAt: "2024-11-12T15:40:00.115Z",
    email: "alexsmith@example.com",
    profileUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18wZXZyM2dlW2VybWxjVUthxld9g8RteOIZ",
    updatedAt: "2024-11-12T15:40:00.115Z",
    userFullName: "Alex Smith",
    _id: "783263847abb007b084f4b212"
  },
  {
    clerkId: "user_HJ2eT9vFgKtrfY7h3Y8b4X6hJ9X8",
    createdAt: "2024-11-13T11:30:40.507Z",
    email: "michaelscott@example.com",
    profileUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWpOaG9HQYltGtyVmC3DLj7FdfHiZiGau2",
    updatedAt: "2024-11-13T11:30:40.507Z",
    userFullName: "Michael Scott",
    _id: "983746524abb80740d29c093"
  }
];


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
