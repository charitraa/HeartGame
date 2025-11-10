import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import useLogout from '../../../hooks/useLogout';
import { heartGameService } from "../services/GameServies";
import type { HeartQuestion } from "../model/QuestionModel";

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

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const player = {
    name: "Yyyyy",
    email: "y@gmail.com",
    totalGames: 14,
    totalScore: 1100,
    avg: 78.57,
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  // Set time limit by level
  useEffect(() => {
    switch (level) {
      case "easy": setTimeLimit(15); break;
      case "medium": setTimeLimit(10); break;
      case "hard": setTimeLimit(5); break;
      default: setTimeLimit(30);
    }
  }, [level]);

  // Load a question and start the timer
  const loadQuestion = useCallback(() => {
    heartGameService.fetchQuestion()
      .then(q => {
        setQuestion(q);
        setAnswer("");
        setMsg("How many hearts are there?");
        setTimeLeft(timeLimit);

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setMsg(`Time's up! Correct answer: ${q.solution}`);
              // Load next question after 1s
              setTimeout(() => loadQuestion(), 1000);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch(() => setMsg("Failed to load question"));
  }, [timeLimit]);

  useEffect(() => {
    if (timeLimit > 0) {
      loadQuestion();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLimit, loadQuestion]);

  const calculateScore = (timeLeft: number) => {
    let scoreMultiplier = 0;

    // Calculate score multiplier based on level
    switch (level) {
      case "easy":
        scoreMultiplier = 5;
        break;
      case "medium":
        scoreMultiplier = 10;
        break;
      case "hard":
        scoreMultiplier = 15;
        break;
      default:
        scoreMultiplier = 5;
    }

    return timeLeft * scoreMultiplier;
  };

  const checkAnswer = () => {
    if (!question) return;

    const numericAnswer = parseInt(answer);
    if (!isNaN(numericAnswer) && numericAnswer === question.solution) {
      // Calculate score based on remaining time
      const earnedScore = calculateScore(timeLeft);
      setMsg(`CORRECT! +${earnedScore}`);
      setScore(prev => prev + earnedScore);
    } else {
      setMsg(`Wrong! Correct answer: ${question.solution}`);
    }

    if (timerRef.current) clearInterval(timerRef.current);

    // Load next question after 1s
    setTimeout(loadQuestion, 1000);
  };

  const leaderboard = [
    { name: "Alex", score: 2500, level: "easy" },
    { name: "Yyyyy", score: 1100, level: "easy" },
    { name: "Sam", score: 980, level: "medium" },
    { name: "Mia", score: 870, level: "medium" },
    { name: "Leo", score: 650, level: "hard" },
  ];

  const sortedLeaderboard = leaderboard
    .filter((p) => p.level === level)
    .sort((a, b) => b.score - a.score);

  if (!question) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col px-10 py-6">
      {/* Top section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black text-purple-800 tracking-wide drop-shadow-lg">
          Heart Game Challenge
        </h1>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg"
          >
            Logout
          </button>

          {showProfile && (
            <div
              className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2">{player.name}</h2>
              <p>Email: {player.email}</p>
              <p>Total Games: {player.totalGames}</p>
              <p>Total Score: {player.totalScore}</p>
              <button
                className="mt-3 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg w-full"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Game + Leaderboard flex container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Game Box */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
          <div className="flex justify-center mb-4 w-full">
            <img
              src={question.question}
              alt="hearts"
              className="rounded-lg shadow-xl object-contain w-full max-w-[500px] h-[350px]"
            />
          </div>

          <p className="text-2xl text-center font-bold text-purple-700 mb-3">{msg}</p>

          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter number..."
            className="w-40 p-2 text-xl text-center border-2 border-purple-300 rounded-lg mb-3 focus:ring-2 focus:ring-purple-300 outline-none"
          />

          <button
            onClick={checkAnswer}
            className="w-40 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-lg font-bold rounded-xl shadow-lg transition hover:scale-105"
          >
            Submit
          </button>

          <p className="mt-4 text-lg font-semibold">Score: {score}</p>
          <p className="mt-1 text-gray-600">Time left: {timeLeft}s</p>
        </div>

        {/* Leaderboard */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-6 flex flex-col">
          <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Leaderboard - {level}
          </h3>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {sortedLeaderboard.map((p, index) => {
              const isCurrent = p.name === player.name;
              const hearts = Math.min(10, Math.floor(p.score / 100));
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex justify-between items-center ${isCurrent ? "bg-purple-100 border-2 border-purple-400" : "bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold w-5">{index + 1}.</span>
                    <span className="font-semibold">{p.name}</span>
                    <div className="flex ml-2">
                      {Array.from({ length: hearts }).map((_, i) => (
                        <span key={i} className="text-red-500 text-lg">
                          ❤️
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-bold text-purple-700">{p.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
