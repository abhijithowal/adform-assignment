import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { addCampaigns } from "./store/campaign.slice";
import type { Campaign } from "./types";

declare global {
  interface Window {
    store: typeof store;
    addCampaigns: (campaigns: Campaign[]) => void;
  }
}

window.store = store;
window.addCampaigns = (campaigns) => {
  store.dispatch(addCampaigns(campaigns));
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
