import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAdminStore } from "../stores/useAdmin";
import { useChatStore } from "../stores/useChatStore";

const updateApiToken = async (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initSocket, disconnectSocket } = useChatStore();
  const { getToken, userId } = useAuth();

  const { fetchAdmin } = useAdminStore();

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuthConfig = async () => {
      try {
        const token = await getToken();
        if (token) {
          await fetchAdmin();
          // Initialize socket here
          if (userId) {
            initSocket(userId);
          }
        }
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        throw Error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    initAuthConfig();

    return () => disconnectSocket();
  }, [getToken, userId, initSocket, fetchAdmin, disconnectSocket]);

  if (loading) {
    return (
      <div className="h-screen bg-black w-screen flex justify-center items-center">
        <Loader className="size-8 text-emerald-800 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
