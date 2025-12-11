import { Campaign } from "./types";

declare global {
  interface Window {
    AddCampaigns: (campaigns: Campaign[]) => void;
  }
}
