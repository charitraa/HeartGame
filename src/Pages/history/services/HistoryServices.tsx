// src/pages/heart-game/services/HistoryServices.ts
import APIClient from "../../../services/ApiClients";
import type { GameHistoryModel } from "../model/HistoryModel";

// ✅ Use array because GET returns list of histories
export const HistoryServices = new APIClient<GameHistoryModel[]>("/game/history/");
