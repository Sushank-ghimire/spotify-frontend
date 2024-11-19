import { useEffect } from "react";
import { useChatStore } from "../../stores/useChatStore";
import Loader from "../../components/Loader";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Export";

const ActivityBar = () => {
  const { users, getUsers, isLoading } = useChatStore();

  const { isSignedIn, user } = useUser();

  const isPlaying = true;

  if (!isSignedIn) {
    return <LoginPrompt />;
  }

  useEffect(() => {
    if (isSignedIn) {
      getUsers();
    }
  }, [getUsers, user]);
  return (
    <div className="min-h-[calc(100vh-100px)] mt-2 rounded-md flex flex-col bg-zinc-900 gap-4 p-2">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : null}
      <div className="flex p-4 flex-col border-b border-zinc-800 text-left">
        <div className="flex items-center flex-col gap-2">
          <Users className="size-5 shrink-0" />
          <h1>What's they are listining to</h1>
        </div>
      </div>

      <ScrollArea className="h-full w-full overflow-y-scroll">
        <div className="flex-1">
          <div className="flex flex-col gap-4 space-y-2">
            {users &&
              users.map((user) => (
                <DisplayUsers user={user} isPlaying={isPlaying} />
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityBar;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);

const DisplayUsers = ({
  user,
  isPlaying,
}: {
  user: any;
  isPlaying: boolean;
}) => {
  return (
    <div
      key={user._id}
      className="flex flex-col p-4 cursor-pointer items-center justify-center hover:bg-zinc-800/50 transition-all rounded-md"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="size-10 border border-zinc-800">
            <AvatarImage src={user.imageUrl} alt={user.fullName} />
            <AvatarFallback>{user?.fullName.split(" ")[0]}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute bottom-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-zinc-500`}
            aria-hidden="true"
          />
          <div className="flex min-w-0">
            <div className="flex items-center">
              <span className="font-medium text-sm text-white">
                {user.fullName}
              </span>
              {isPlaying ? (
                <Music className="size-3.5 text-emerald-500 shrink-0" />
              ) : null}
            </div>
            {isPlaying ? (
              <div className="mt-2">
                <div className="mt-1 text-sm font-medium truncate text-white">
                  Cardigan
                </div>
                <div className="text-xs text-zinc-400 truncate">
                  By taylor swift
                </div>
              </div>
            ) : (
              <div className="text-xs text-zinc-400 truncate mt-1">Idle</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
