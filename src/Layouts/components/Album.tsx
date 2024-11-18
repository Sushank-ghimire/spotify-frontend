interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
}

const Album = ({ album }: { album: Album }) => {
  return (
    <>
      {/* Album Image */}
      <img
        src={album.imageUrl}
        alt={album.title}
        className="h-12 w-12 rounded-md object-cover"
      />

      {/* Album Details */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-md font-semibold truncate">{album.title}</span>
        <span className="text-sm text-gray-600 truncate">Artists {album.artist}</span>
      </div>
    </>
  );
};

export default Album;
