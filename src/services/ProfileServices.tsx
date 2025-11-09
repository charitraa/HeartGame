import APIClient from "./ApiClients";

import type { ProfileModel } from "../model/ProfileModel";

export const ProfileServices = new APIClient<ProfileModel>('/user/me/')