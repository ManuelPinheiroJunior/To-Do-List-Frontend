import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: number | null;
  loading: boolean;
  loginError: string | null;
  signUpError: string | null;
  validationErrors: Record<string, string>;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userId: null,
  loading: false,
  loginError: null,
  signUpError: null,
  validationErrors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state: AuthState, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.loginError = null;
      state.signUpError = null; 
       action.payload;
    },
    loginSuccess: (state: AuthState, action: PayloadAction<{ token: string; userId: number }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.loginError = action.payload; 
       action.payload;
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
    },
    signUpValidationFailure: (state, action: PayloadAction<Record<string, string>>) => {
      state.loading = false;
      state.validationErrors = action.payload;
    },
    signUpRequest: (state: AuthState, action: PayloadAction<{ firstName: string; lastName: string; dateOfBirth: string; email: string; password: string; confirmPassword: string }>) => {
      state.loading = true;
      state.signUpError = null; 
      state.loginError = null; 
       action.payload;
    },
    signUpSuccess: (state: AuthState) => {
      state.loading = false;
    },
    signUpFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.signUpError = action.payload; 
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signUpValidationFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} = authSlice.actions;

export default authSlice.reducer;
