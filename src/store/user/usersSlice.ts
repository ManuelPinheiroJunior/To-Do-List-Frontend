import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      action.payload;
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editUserRequest: (state, action: PayloadAction<{ id: number; data: Partial<User> }>) => {
      state.loading = true;
      action.payload;
    },
    editUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
    },
    editUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;