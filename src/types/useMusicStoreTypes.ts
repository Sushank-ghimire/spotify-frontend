export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  createdAt?: string;
  updatedAt?: string;
  songs?: string[];
}

export interface Song {
  _id: string;
  albumId: string | null;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MusicStore {
  albums: Album[];
  songs: Song[];
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  isLoading: boolean;
  currentAlbum: Album | null;
  error: string | null | unknown;
  albumSongs?: null | Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}
