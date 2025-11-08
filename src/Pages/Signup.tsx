import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heartPanel from "../assets/a.png";  // ← your AI heart image (or remove if not needed)

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === email)) return alert("Email already used");
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Done! Now log in →");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* ONE CLEAN BOX - 50/50 */}
      <div className="flex w-full max-w-4xl h-[580px] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* LEFT = FORM (50%) - Playful & Professional */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-gradient-to-b from-pink-100 to-purple-100">
          <h1 className="text-4xl font-bold text-purple-800 mb-8">
            Join the Heart Game 
            
          </h1>
          <form onSubmit={handleSignup} className="space-y-5">
            <input 
              placeholder="Username" 
              required 
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-xl font-bold text-white text-lg transition shadow-md">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-purple-700">
            Already playing? <Link to="/login" className="underline hover:text-purple-900">Login</Link>
          </p>
        </div>

        {/* RIGHT = IMAGE (50%) - Simple Playful Hearts */}
        <div className="w-1/2 relative bg-gradient-to-b from-purple-200 to-pink-200 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-6">
               
            </div>
            <img 
            src={heartPanel} 
            alt="hearts" 
            className="absolute inset-2 w-full h-full object-cover drop-shadow-2xl" 
          />
            <p className="text-2xl font-semibold text-purple-800">Count the Hearts!</p>
            <p className="text-purple-600 mt-2">Fun & Simple Game</p>
          </div>
          {/* Optional: <img src={heartPanel} alt="hearts" className="absolute inset-0 w-full h-full object-cover opacity-30" /> */}
        </div>
      </div>
    </div>
  );
}