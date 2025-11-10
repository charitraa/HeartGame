// src/pages/heart-game/hooks/useGetLeaderboard.ts
import { useQuery } from "@tanstack/react-query";
import type { LeaderboardModel } from "../model/LeaderBoardModel";
import { LeaderBoardServices } from "../services/LeaderBoardServices";
import { LEADERBOARD_CACHE_KEY } from "../../../constants";

const useLeaderboard = (level: string) => {
  return useQuery<LeaderboardModel[], Error>({
    queryKey: [LEADERBOARD_CACHE_KEY, level],
    queryFn: async () => {
      // ✅ fetch array of leaderboard entries
      const response = await LeaderBoardServices.get(`${level}/`);
      return response; // must be array like [{ id, username, total_score }]
    },
    staleTime: 30_000, // 30 seconds
  });
};

export default useLeaderboard;
