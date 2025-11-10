/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutServices } from "../services/LogoutServices";
import { useContext } from "react";
import { AppContext } from "../context/ContextApp";
import { LOGIN_CACHE_KEY } from "../constants";

const useLogout = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useLogout must be used within AppContext provider");
  }

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => LogoutServices.post(),
    onSuccess: (data: any) => {
      queryClient.removeQueries({ queryKey: [LOGIN_CACHE_KEY] });
      queryClient.clear();
      showToast(data?.message || "Logout successful!", "success");
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message || error.message || "Logout failed!";
      showToast(errorMsg, "error");
    },
  });
};

export default useLogout;
