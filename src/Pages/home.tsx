import { useNavigate } from "react-router-dom";
import videoBg from "../assets/1.mp4"; // background video

export default function Home() {
  const navigate = useNavigate();

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

      {/* DARK OVERLAY TO ENHANCE TEXT */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center">
        {/* ✨ SOFT TITLE */}
        <h1
          className="text-7xl md:text-8xl lg:text-[150px] font-extrabold mb-14 tracking-widest"
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

        {/* 💖 BUTTON - Elegant & Futuristic */}
        <button
          onClick={() => navigate("/difficulty")}
          className="px-16 py-6 bg-pink-500/80 hover:bg-pink-400 text-white text-3xl font-semibold rounded-full shadow-[0_0_30px_rgba(255,182,193,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] transition-all duration-300 border border-white/30 hover:scale-105"
        >
          START 
        </button>
      </div>
    </div>
  );
}
