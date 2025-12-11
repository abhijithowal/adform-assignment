import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Campaign } from "../types";
import type { RootState } from "./store";
import { INITIAL_CAMPAIGNS } from "../constants/app.constants";

interface CampaignState {
  list: Campaign[];
  filteredList: Campaign[];
  filters: {
    startDate: string;
    endDate: string;
    search: string;
  };
}

const initialState: CampaignState = {
  list: INITIAL_CAMPAIGNS,
  filteredList: INITIAL_CAMPAIGNS,
  filters: {
    startDate: "",
    endDate: "",
    search: "",
  },
};

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.list = [...action.payload, ...state.list];
      state.filteredList = [...state.list];
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.list = [action.payload, ...state.list];
      state.filteredList = [...state.list];
    },
    setFilters: (
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
        search: string;
      }>
    ) => {
      state.filters = action.payload;
      let filtered = [...state.list];
      if (state.filters.search) {
        filtered = filtered.filter((campaign) => {
          return campaign.name
            .toLowerCase()
            .includes(state.filters.search.toLowerCase());
        });
      }
      if (state.filters.startDate && state.filters.endDate) {
        const filterStartDate = new Date(state.filters.startDate);
        const filterEndDate = new Date(state.filters.endDate);
        filtered = filtered.filter((campaign) => {
          const campaignStartDate = new Date(campaign.startDate);
          const campaignEndDate = new Date(campaign.endDate);
          if (campaignEndDate < campaignStartDate) {
            return false;
          }
          const startDateInRange =
            campaignStartDate >= filterStartDate &&
            campaignStartDate <= filterEndDate;
          const endDateInRange =
            campaignEndDate >= filterStartDate &&
            campaignEndDate <= filterEndDate;
          return startDateInRange || endDateInRange;
        });
      }
      state.filteredList = filtered;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredList = state.list;
    },
  },
});

export const { addCampaigns, setFilters, resetFilters, addCampaign } =
  campaignSlice.actions;
export default campaignSlice.reducer;
export const selectCampaigns = (state: RootState) => state.campaigns.list;
export const selectFilteredCampaigns = (state: RootState) =>
  state.campaigns.filteredList;
export const selectFilters = (state: RootState) => state.campaigns.filters;
