
export interface AuthState {
  token: string | null;
  userId: number | null;
  loading: boolean;
  error: string | null;
}