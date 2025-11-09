import { useNavigate } from "react-router-dom";
import { useState } from "react";

const IMAGES = [
  "https://i.imgur.com/5kR8j2m.png",
  "https://i.imgur.com/9pL2mNx.png",
  "https://i.imgur.com/fG7kPqR.png",
  "https://i.imgur.com/xM4vR8t.png",
  "https://i.imgur.com/QwE3tYs.png",
];
const ANSWERS = [3, 5, 2, 7, 4];

export default function Game() {
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("How many hearts?");
  const [score, setScore] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const player = { name: "Yyyyy", email: "y@gmail.com", totalGames: 14, totalScore: 1100, avg: 78.57 };
  const history = [
    { id: 1, answer: 8, correct: 9, score: 0, status: "Wrong" },
    { id: 2, answer: 5, correct: 5, score: 10, status: "Correct" },
  ];
  const leaderboard = [
    { rank: 1, name: "Alex", score: 2500 },
    { rank: 2, name: "Yyyyy", score: 1100 },
    { rank: 3, name: "Sam", score: 980 },
  ];

  const check = () => {
    const correct = ANSWERS[imgIndex];
    if (parseInt(answer) === correct) {
      setMsg("CORRECT! +10");
      setScore((s) => s + 10);
      setTimeout(() => {
        setImgIndex((i) => (i + 1) % 5);
        setMsg("Next one!");
        setAnswer("");
      }, 1000);
    } else {
      setMsg(`Wrong! It's ${correct}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col px-10 py-6">

      {/* Top section */}
      <div className="flex justify-between items-center mb-10">
        {/* Left: Game Title */}
        <h1 className="text-6xl font-black text-purple-800 tracking-wide drop-shadow-lg">
          Heart Game Challenge
        </h1>

        {/* Right: Profile & Logout */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg"
          >
            Logout
          </button>

          {/* Profile popup */}
          {showProfile && (
            <div
              className="absolute top-16 right-0 w-96 bg-white rounded-xl shadow-xl p-6 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{player.name}</h2>
              <p>Email: {player.email}</p>
              <p>Total Games: {player.totalGames}</p>
              <p>Total Score: {player.totalScore}</p>
              <h3 className="mt-4 font-bold text-lg">History</h3>
              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                {history.map((h) => (
                  <div key={h.id} className="flex justify-between p-2 bg-gray-100 rounded-lg">
                    <span>{h.status}</span>
                    <span>{h.score} pts</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg w-full"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-10">
        {/* Left: Game Box */}
        <div className="w-1/2 bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
          <div className="flex justify-center mb-6 w-full">
            {/* Bigger image */}
            <img
              src={IMAGES[imgIndex]}
              alt="hearts"
              className="rounded-lg shadow-xl object-contain w-[550px] h-[400px]"
            />
          </div>

          <p className="text-2xl text-center font-bold text-purple-700 mb-3">{msg}</p>

          {/* Smaller input */}
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter number..."
            className="w-48 p-3 text-2xl text-center border-2 border-purple-300 rounded-lg mb-3 focus:ring-4 focus:ring-purple-300 outline-none"
          />

          {/* Smaller button */}
          <button
            onClick={check}
            className="w-48 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xl font-bold rounded-2xl shadow-lg transition hover:scale-105"
          >
            Submit
          </button>
        </div>

        {/* Right: Leaderboard */}
        <div className="w-1/2 bg-white rounded-3xl shadow-2xl p-6 flex flex-col">
          <h3 className="text-3xl font-bold text-purple-700 mb-4 text-center">Leaderboard</h3>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {leaderboard.map((p) => (
              <div
                key={p.rank}
                className={`p-4 rounded-lg flex justify-between items-center ${
                  p.rank === 2 ? "bg-purple-100 border-2 border-purple-400" : "bg-gray-50"
                }`}
              >
                <span className="font-bold">{p.name}</span>
                <span className="font-bold text-purple-700">{p.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
