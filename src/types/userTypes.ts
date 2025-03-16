export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  role: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
