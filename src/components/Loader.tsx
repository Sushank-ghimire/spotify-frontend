import { Loader as LoadingIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-[calc(100vh-300px)] w-full flex justify-center items-center">
      <LoadingIcon className="text-emerald-500 animate-spin size-4 md:size-6" />
    </div>
  );
};

export default Loader;
