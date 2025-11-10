// src/pages/heart-game/services/LeaderBoardServices.ts
import APIClient from "../../../services/ApiClients";
import type { LeaderboardModel } from "../model/LeaderBoardModel";

// ✅ make sure endpoint matches backend route
export const LeaderBoardServices = new APIClient<LeaderboardModel[]>("/game/leaderboard");
