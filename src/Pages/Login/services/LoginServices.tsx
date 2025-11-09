import APIClient from "../../../services/ApiClients";

import type { LoginResponseModel } from "../models/LoginModel";

export const LoginServices = new APIClient<LoginResponseModel>('/user/login/')