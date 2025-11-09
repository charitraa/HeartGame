/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import type { SignupModel, SignupResponseModel } from "../models/SignupModel";
import { SignupServices } from "../services/SignupServices";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useLogin must be used within AppContext provider");
  }

  const { showToast } = appContext;
  const navigate = useNavigate();

  return useMutation<SignupResponseModel, Error, SignupModel>({
    mutationFn: (user: SignupModel) => SignupServices.post(user),
    onSuccess: (data: SignupResponseModel) => {
      if (data?.full_name) {
        showToast("User signup successful!", "success");
        navigate("/login");
      } else {
        showToast("Some error received from server!", "error");
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