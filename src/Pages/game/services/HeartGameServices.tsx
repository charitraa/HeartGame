// services/HeartGameService.ts
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HeartQuestion } from "../model/QuestionModel";

class HeartGameService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://marcconrad.com/uob/heart/api.php",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch heart question
  async fetchQuestion(): Promise<HeartQuestion> {
    try {
      const response = await this.api.get<HeartQuestion>("");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch question:", error);
      throw error;
    }
  }
}

export const heartGameService = new HeartGameService();
