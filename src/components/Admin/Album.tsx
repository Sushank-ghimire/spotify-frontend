import { useMusicStore } from "../../stores/useMusicStore";

const Album = () => {
  const {} = useMusicStore();
  return (
    <section className="flex justify-normal items-center w-[99vw] md:w-[90vw] mx-auto rounded p-3 bg-zinc-900 flex-col gap-4 mt-3"></section>
  );
};

export default Album;
