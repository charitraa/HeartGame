import APIClient from "../../../services/ApiClients";

import type { ScoreModel } from "../model/ScoreModel";

export const ScoreServices = new APIClient<ScoreModel>('/game/score/')