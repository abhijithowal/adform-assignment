import { INITIAL_CAMPAIGNS } from "../constants/app.constants";
import type { Campaign } from "../types";
import campaignsReducer, { addCampaigns } from "./campaign.slice";
import { describe, it, expect } from "vitest";

describe("campaigns reducer", () => {
  const initialState = {
    list: INITIAL_CAMPAIGNS,
    filteredList: INITIAL_CAMPAIGNS,
    filters: {
      startDate: "",
      endDate: "",
      search: "",
    },
  };

  it("check initial state", () => {
    expect(campaignsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle addCampaigns", () => {
    const newCampaign: Campaign = {
      id: 1,
      name: "Test Campaign",
      startDate: "9/19/2017",
      endDate: "3/9/2018",
      budget: 1000,
      userId: 1,
    };
    const actual = campaignsReducer(initialState, addCampaigns([newCampaign]));
    expect(actual.list.length).toEqual(INITIAL_CAMPAIGNS.length + 1);
    expect(actual.list[0].name).toEqual("Test Campaign");
  });
});
