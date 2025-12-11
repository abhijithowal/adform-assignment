import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CampaignState {
  theme: "light" | "dark";
}

const initialState: CampaignState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "appTheme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const selectTheme = (state: RootState) => state.appTheme.theme;
