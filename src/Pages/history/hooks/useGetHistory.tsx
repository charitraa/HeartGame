// src/pages/heart-game/hooks/useGetHistory.ts
import { useQuery } from "@tanstack/react-query";
import { HistoryServices } from "../services/HistoryServices";
import { HISTORY_CACHE_KEY } from "../../../constants";
import type { GameHistoryModel } from "../model/HistoryModel";

export const useGetHistory = () => {
  return useQuery<GameHistoryModel[], Error>({
    queryKey: [HISTORY_CACHE_KEY],
    queryFn: () => HistoryServices.get(),
    staleTime: 30_000, // 1 minute
  });
};
