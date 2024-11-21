const SongsGridSkeleton = () => {
  return new Array(6).map((_, index) => (
    <div
      key={index}
      className="h-16 w-16 bg-zinc-700 animate-pulse rounded-md"
    />
  ));
};

export default SongsGridSkeleton;
