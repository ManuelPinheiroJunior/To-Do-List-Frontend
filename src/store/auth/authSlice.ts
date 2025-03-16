import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state: AuthState, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state: AuthState, action: PayloadAction<{ token: string; userId: number }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
    },
    signUpRequest: (state: AuthState, action: PayloadAction<{ firstName: string; lastName: string; dateOfBirth: string, email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state: AuthState) => {
      state.loading = false;
    },
    signUpFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, signUpRequest, signUpSuccess, signUpFailure } = authSlice.actions;
export default authSlice.reducer;
