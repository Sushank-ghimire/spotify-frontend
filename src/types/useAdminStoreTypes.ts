import { Song } from "./useMusicStoreTypes";

type UniqueArtist = {
  count: number;
};

export type DataStats = {
  totalAlbums: number;
  totalSongs: number;
  totalUsers: number;
  uniqueArtists: UniqueArtist[];
};

export interface AdminStore {
  isAdmin: boolean | null;
  isLoading: boolean | null;
  allSongs: Song[];
  statsData: DataStats | null;
  error: unknown | null | string;
  fetchAdmin: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAllSongs: () => Promise<void>;
}
