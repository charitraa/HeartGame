import { useNavigate } from "react-router-dom";
import videoBg from "../../assets/1.mp4"; // background video
import useLogout from "../../hooks/useLogout"; // adjust path as needed

export default function Home() {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout(); // useLogout hook

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // After successful logout → redirect to login
        navigate("/login");
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🎥 FULLSCREEN VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center flex flex-col items-center space-y-8">
        {/* ✨ TITLE */}
        <h1
          className="text-7xl md:text-8xl lg:text-[150px] font-extrabold mb-10 tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(to bottom, #ffb6c1, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 20px rgba(255,192,203,0.6), 0 0 60px rgba(255,255,255,0.6)",
          }}
        >
          HEART GAME
        </h1>

        {/* 💖 BUTTONS IN COLUMN */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={() => navigate("/difficulty")}
            className="px-16 py-6 bg-pink-500/80 hover:bg-pink-400 text-white text-3xl font-semibold rounded-full 
                       shadow-[0_0_30px_rgba(255,182,193,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] 
                       transition-all duration-300 border border-white/30 hover:scale-105"
          >
            START
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-16 py-6 bg-purple-500/80 hover:bg-purple-400 text-white text-3xl font-semibold rounded-full 
                       shadow-[0_0_30px_rgba(186,85,211,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] 
                       transition-all duration-300 border border-white/30 hover:scale-105"
          >
            HISTORY
          </button>

          <button
            onClick={handleLogout}
            disabled={isPending}
            className={`px-16 py-6 text-white text-3xl font-semibold rounded-full border border-white/30 transition-all duration-300 hover:scale-105 
                       ${isPending
                ? "bg-red-400/60 cursor-not-allowed"
                : "bg-red-500/80 hover:bg-red-400 shadow-[0_0_30px_rgba(255,99,71,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]"
              }`}
          >
            {isPending ? "LOGGING OUT..." : "LOGOUT"}
          </button>
        </div>
      </div>
    </div>
  );
}
