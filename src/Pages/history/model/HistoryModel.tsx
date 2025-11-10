export interface GameHistoryModel {
  id?: number; // optional when posting new history
  level: "easy" | "medium" | "hard";
  score: number;
  time_taken: number;
  date_played?: string; // ISO datetime, optional for POST (auto-added by backend)
}
