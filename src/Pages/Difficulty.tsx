import { useNavigate } from "react-router-dom";

export default function Difficulty() {
  const navigate = useNavigate();

  const selectDifficulty = (difficulty: string, time: number) => {
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("timeLimit", time.toString());
    navigate("/main");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-violet-500 via-purple to-pink- 500 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,1),transparent)] animate-pulse"></div>
      </div>

      {/* Glowing title */}
      <h1 className="text-6xl md:text-7xl font-black mb-20 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl shadow-red-500/50 animate-pulse text-center z-10 relative">
        Select Difficulty 💥
      </h1>

      {/* Difficulty buttons */}
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center z-10">
        
        {/* Easy */}
        <button
          onClick={() => selectDifficulty("easy", 40)}
          className="flex-1 p-8 text-2xl font-bold rounded-3xl bg-green-500/20 hover:bg-green-500/40 border-4 border-green-400/50 hover:border-green-400 backdrop-blur-xl shadow-2xl shadow-green-500/30 hover:shadow-3xl hover:shadow-green-500/50 hover:scale-105 transform transition-all duration-300 group"
        >
          <div className="text-center">
            <span className="text-5xl mb-4 block animate-bounce">🩷</span>
            <div className="text-4xl mb-2">Easy</div>
            <div className="text-xl opacity-80">40 seconds</div>
          </div>
        </button>

        {/* Medium */}
        <button
          onClick={() => selectDifficulty("medium", 20)}
          className="flex-1 p-8 text-2xl font-bold rounded-3xl bg-yellow-500/20 hover:bg-yellow-500/40 border-4 border-yellow-400/50 hover:border-yellow-400 backdrop-blur-xl shadow-2xl shadow-yellow-500/30 hover:shadow-3xl hover:shadow-yellow-500/50 hover:scale-105 transform transition-all duration-300 group"
        >
          <div className="text-center">
            <span className="text-5xl mb-4 block animate-bounce">💛</span>
            <div className="text-4xl mb-2">Medium</div>
            <div className="text-xl opacity-80">20 seconds</div>
          </div>
        </button>

        {/* Hard */}
        <button
          onClick={() => selectDifficulty("hard", 7)}
          className="flex-1 p-8 text-2xl font-bold rounded-3xl bg-red-500/20 hover:bg-red-500/20 border-4 border-red-400/50 hover:border-red-400 backdrop-blur-xl shadow-2xl shadow-red-500/30 hover:shadow-3xl hover:shadow-red-500/30 hover:scale-105 transform transition-all duration-300 group"
        >
          <div className="text-center">
            <span className="text-5xl mb-4 block animate-bounce">💔</span>
            <div className="text-4xl mb-2">Hard</div>
            <div className="text-xl opacity-80">7 seconds</div>
          </div>
        </button>

      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="mt-16 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-2xl text-white font-bold border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
      >
        ← Back to Menu
      </button>
    </div>
  );
}