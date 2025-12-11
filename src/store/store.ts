import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./campaign.slice";
import userReducer from "./user.slice";
import themeReducer from "./theme.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    campaigns: campaignReducer,
    appTheme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
