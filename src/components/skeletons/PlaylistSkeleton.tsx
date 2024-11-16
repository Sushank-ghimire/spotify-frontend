const PlaylistSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div
      key={index}
      className="w-full p-2 rounded-lg flex gap-2 justify-between"
    >
      <div className="animate-pulse h-12 w-12 rounded bg-zinc-400" />
      <div className="md:flex space-y-2 flex-col w-3/4 min-w-0 hidden">
        <div className="h-[14px] animate-pulse rounded w-2/3 bg-zinc-400" />
        <div className="h-[10px] animate-pulse rounded w-1/2  bg-zinc-400" />
      </div>
    </div>
  ));
};

export default PlaylistSkeleton;
