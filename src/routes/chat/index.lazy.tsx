import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../layouts/MainLayout";
import { useUser } from "@clerk/clerk-react";
import SignedOutAuthButton from "../../components/SignedOutAuthButton";
import { useChatStore } from "../../stores/useChatStore";
import { useEffect } from "react";
import FriendsList from "../../components/chat/component";
import MessageInput from "../../components/chat/MessageInput";
import { Avatar, AvatarImage, ScrollArea } from "../../components/Export";
import ChatHeader from "../../components/chat/ChatHeader";

export const Route = createLazyFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn, user } = useUser();

  const { selectedUser, sendMessage, getUsers, fetchMessages, messages } =
    useChatStore();

  useEffect(() => {
    if (user) getUsers();
  }, [getUsers, sendMessage, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  if (!isSignedIn) {
    return (
      <MainLayout>
        <div className="bg-zinc-900 h-[calc(100vh-137px)] rounded-md mt-2 w-full flex justify-center items-center">
          <SignedOutAuthButton />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <main className="h-[calc(100vh-93px)] bg-zinc-900 rounded-md mt-2 p-2 overflow-y-scroll">
        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
          <FriendsList />

          {/* Chat Messages */}
          <div className="flex flex-col h-full">
            {selectedUser ? (
              <>
                <ChatHeader />

                {/* Messages */}
                <ScrollArea className="h-[calc(100vh-340px)]">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-start gap-3 ${
                          message.senderId === user?.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.senderId === user?.id
                                ? user.imageUrl
                                : selectedUser.profileUrl
                            }
                          />
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}
												`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {message.createdAt.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <MessageInput />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
