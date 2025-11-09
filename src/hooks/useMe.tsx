import { useQuery } from "@tanstack/react-query";
import { ProfileServices } from "../services/ProfileServices"; // your API call for /user/me
import type { ProfileModel } from "../model/ProfileModel";
import { PROFILE_CACHE_KEY } from "../constants";

export const useMe = () => {
  return useQuery<ProfileModel, Error>({
    queryKey: [PROFILE_CACHE_KEY],
    queryFn: () => ProfileServices.get(), // call /user/me
    staleTime: 5 * 60 * 1000, // 5 min caching
    retry: 1,
  });
};
