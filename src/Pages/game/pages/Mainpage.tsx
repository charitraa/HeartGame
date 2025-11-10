/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import useLogout from "../../../hooks/useLogout";
import { heartGameService } from "../services/HeartGameServices";
import type { HeartQuestion } from "../model/QuestionModel";
import useScore from "../hooks/useScore";
import useLeaderboard from "../hooks/useGetLeaderboard";
import type { LeaderboardModel } from "../model/LeaderBoardModel";
import { useMe } from "../../../hooks/useMe";

export default function Game() {
  const navigate = useNavigate();
  const { level } = useParams<{ level: string }>();
  const { mutate: logout } = useLogout();

  const [question, setQuestion] = useState<HeartQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("Loading question...");
  const [timeLimit, setTimeLimit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const { data: user, isLoading, isError } = useMe();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // -----------------------------------------------------------------
  // Hooks
  // -----------------------------------------------------------------
  const { mutate: postScore } = useScore();
  const { data: leaderboard = [], isLoading: isLbading } = useLeaderboard(level!);

  // -----------------------------------------------------------------
  // Time limit per level
  // -----------------------------------------------------------------
  useEffect(() => {
    const limits: Record<string, number> = {
      easy: 15,
      medium: 10,
      hard: 5,
    };
    setTimeLimit(limits[level ?? "easy"] ?? 30);
  }, [level]);

  // -----------------------------------------------------------------
  // Load question & timer
  // -----------------------------------------------------------------
  const loadQuestion = useCallback(() => {
    heartGameService
      .fetchQuestion()
      .then((q) => {
        setQuestion(q);
        setAnswer("");
        setMsg("How many hearts are there?");
        setTimeLeft(timeLimit);

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setMsg(`Time's up! Correct answer: ${q.solution}`);
              setTimeout(loadQuestion, 1000);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch(() => setMsg("Failed to load question"));
  }, [timeLimit]);

  useEffect(() => {
    if (timeLimit > 0) loadQuestion();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLimit, loadQuestion]);

  // -----------------------------------------------------------------
  // Scoring logic
  // -----------------------------------------------------------------
  const calculateScore = (timeLeft: number) => {
    const multiplier = { easy: 5, medium: 10, hard: 15 }[level ?? "easy"] ?? 5;
    return timeLeft * multiplier;
  };

  const checkAnswer = () => {
    if (!question) return;

    const numeric = Number(answer);
    if (!Number.isNaN(numeric) && numeric === question.solution) {
      const earned = calculateScore(timeLeft);
      setScore((s) => s + earned);
      setMsg(`CORRECT! +${earned}`);

      postScore({
        level: level as "easy" | "medium" | "hard",
        score: earned,
        time_taken: timeLimit - timeLeft,
      });
    } else {
      setMsg(`Wrong! Correct answer: ${question.solution}`);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeout(loadQuestion, 1000);
  };

  // -----------------------------------------------------------------
  // Logout
  // -----------------------------------------------------------------
  const handleLogout = () => {
    logout(undefined, { onSuccess: () => navigate("/login") });
  };

  // -----------------------------------------------------------------
  // Helper: Convert score to hearts
  // -----------------------------------------------------------------
  const hearts = (points: number) => Math.min(10, Math.floor(points / 100));

  if (!question) return <p className="p-10 text-center">Loading…</p>;

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col px-4 py-6 md:px-10">
      {/* ---------- Header ---------- */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl md:text-5xl font-black text-purple-800 tracking-tight drop-shadow-md">
          Heart Game Challenge
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowProfile((v) => !v)}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {/* ---- Profile Popover ---- */}
        {showProfile && user && !isLoading && !isError && (
          <div className="absolute top-24 right-4 sm:right-10 w-80 bg-white rounded-2xl shadow-2xl p-5 z-50 animate-fadeIn">
            <h2 className="text-2xl font-bold text-purple-800">{user.full_name}</h2>
            <p className="text-gray-600">Email: {user.username}</p>

            <button
              onClick={() => setShowProfile(false)}
              className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        )}
      </header>

      {/* ---------- Main Flex ---------- */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* ---- Game Card ---- */}
        <section className="flex-1 bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col items-center">
          <img
            src={question.question}
            alt="hearts"
            className="rounded-xl shadow-lg object-contain w-full max-w-lg h-80 md:h-96"
          />

          <p className="mt-6 text-2xl font-bold text-purple-700 text-center">{msg}</p>

          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter number..."
            className="mt-4 w-40 p-2 text-xl text-center border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <button
            onClick={checkAnswer}
            className="mt-4 w-40 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-md transition hover:scale-105"
          >
            Submit
          </button>

          <div className="mt-5 flex flex-col items-center gap-1">
            <p className="text-lg font-semibold">
              Score: <span className="text-purple-700">{score}</span>
            </p>
            <p className="text-gray-600">
              Time left: <span className="font-mono">{timeLeft}s</span>
            </p>
          </div>
        </section>

        {/* ---- Leaderboard Card ---- */}
        <aside className="flex-1 bg-white rounded-3xl shadow-xl p-6 flex flex-col">
          <h3 className="text-2xl font-bold text-purple-700 text-center mb-4">
            Leaderboard – {level?.toUpperCase()}
          </h3>

          {isLbading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Loading…</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">No scores yet! Be the first! 🎉</p>
            </div>
          ) : (
            <div className="space-y-2 flex-1 overflow-y-auto pr-2">
              {leaderboard
                .sort((a: any, b: any) => b.total_score - a.total_score) // ✅ sort by score descending
                .map((entry: LeaderboardModel, idx: number) => {
                  const isMe = entry.username === user?.username;
                  const heartCount = hearts(entry.total_score);
                  return (
                    <div
                      key={entry.id}
                      className={`flex justify-between items-center p-3 rounded-xl transition-all ${isMe
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-sm"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black text-lg w-8 text-right min-w-[2rem]">
                          {idx + 1}.
                        </span>
                        <span className="font-semibold text-gray-800">
                          {entry.username}
                        </span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: heartCount }).map((_, i) => (
                            <span key={i} className="text-red-500 text-xl">
                              ❤️
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="font-bold text-xl text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                        {entry.total_score}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------
   Tiny Tailwind animation for the profile pop-over
-------------------------------------------------------------- */
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  .animate-fadeIn { animation: fadeIn .2s ease-out; }
`;
document.head.appendChild(style);
