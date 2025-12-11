// src/types.ts

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
}

export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  userId: number;
}

export interface UsersState {
  data: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
