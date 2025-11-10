/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import type { LoginModel, LoginResponseModel } from "../models/LoginModel";
import { LoginServices } from "../services/LoginServices";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";

const useLogin = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useLogin must be used within AppContext provider");
  }

  const { showToast } = appContext;
  // const queryClient = useQueryClient();

  return useMutation<LoginResponseModel, Error, LoginModel>({
    mutationFn: (user: LoginModel) => LoginServices.post(user),
    onSuccess: (data: LoginResponseModel) => {
      if (data?.access) {
        // queryClient.invalidateQueries({ queryKey: [LOGIN_CACHE_KEY] });

        showToast(data.message || "Login successful!", "success");
      } else {
        showToast("No access received from server!", "error");
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message || error.message || "Login failed!";
      showToast(errorMsg, "error");
    },
  });
};

export default useLogin;