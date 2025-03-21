import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "en" | "pt";

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: localStorage.getItem("language") as Language || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "pt" : "en";
      localStorage.setItem("language", state.language);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem("language", state.language);
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;

export default languageSlice.reducer;