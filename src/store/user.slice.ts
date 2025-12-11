import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return (await response.json()) as User[];
});

interface UsersState {
  list: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UsersState = {
  list: [],
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default usersSlice.reducer;
