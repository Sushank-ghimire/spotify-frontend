export interface AdminStore {
  isAdmin: boolean | null;
  isLoading: boolean | null;
  error: unknown | null | string;
  fetchAdmin: () => Promise<void>;
}
