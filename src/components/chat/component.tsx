import { useChatStore } from "../../stores/useChatStore";
import { User } from "../../types/useMessages.types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ScrollArea,
  UsersListSkeleton,
} from "../Export";


interface ListUserProps {
  user: User | null;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  onlineUsers: Set<string>;
}

const ListUsers = ({
  user,
  setSelectedUser,
  selectedUser,
  onlineUsers,
}: ListUserProps) => {
  if (!user) return null;
  return (
    <div
      key={user._id}
      onClick={() => setSelectedUser(user)}
      className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        selectedUser?.clerkId === user.clerkId
          ? "bg-zinc-800"
          : "hover:bg-zinc-800/50"
      }`}
    >
      <div className="relative">
        <Avatar className="size-8 md:size-12">
          <AvatarImage src={user.profileUrl} />
          <AvatarFallback>{user.userFullName.split(" ")[0]}</AvatarFallback>
        </Avatar>

        {/* online indicator */}
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}
        />
      </div>
      <div className="flex-1 min-w-0 lg:block hidden">
        <span className="font-medium truncate">{user.userFullName}</span>
      </div>
    </div>
  );
};

const FriendsList = () => {
  const { users, isLoading, selectedUser, setSelectedUser, onlineUsers } =
    useChatStore();
  if (!users) return null;
  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-2">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <ListUsers
                  onlineUsers={onlineUsers}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  user={user}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FriendsList;
