/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ScoreModel } from "../model/ScoreModel";
import { ScoreServices } from "../services/ScoreServices";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import { SCORE_CACHE_KEY, HISTORY_CACHE_KEY, LEADERBOARD_CACHE_KEY } from "../../../constants";

const useScore = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ScoreModel, Error, ScoreModel>({
    mutationFn: (data: ScoreModel) => ScoreServices.post(data),
    onSuccess: (savedScore: ScoreModel) => {
      console.log("useScore - saved score:", savedScore);

      showToast(`You scored ${savedScore.score}!`, "success");

      // Invalidate/refetch related caches
      queryClient.invalidateQueries({ queryKey: [SCORE_CACHE_KEY] });
      queryClient.refetchQueries({ queryKey: [HISTORY_CACHE_KEY] });
      queryClient.refetchQueries({ queryKey: [LEADERBOARD_CACHE_KEY] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || err.message || "Score request failed!";
      showToast(msg, "error");
    },
  });
};

export default useScore;