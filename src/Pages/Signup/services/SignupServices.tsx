import APIClient from "../../../services/ApiClients";

import type { SignupResponseModel } from "../models/SignupModel";

export const SignupServices = new APIClient<SignupResponseModel>('/user/create/')