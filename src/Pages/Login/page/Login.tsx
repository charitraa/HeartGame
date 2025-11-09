import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heartPanel from "../../../assets/a.png";   // Your image
import useLogin from "../hooks/useLogin"; // Import the hook
import type { LoginModel } from "../models/LoginModel";
import { useMe } from "../../../hooks/useMe";

export default function Login() {
  const [username, setUsername] = useState(""); // using username instead of email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data: currentUser } = useMe();
  const { mutate: login, isPending } = useLogin();
  // If already logged in → redirect
  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [currentUser, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginModel = {
      username,
      password,
    };

    login(payload, {
      onSuccess: () => {
        navigate("/home"); // Navigate to home after successful login
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex w-full max-w-4xl h-[580px] bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT = LOGIN FORM */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-gradient-to-b from-pink-100 to-purple-100">
          <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
            Welcome Back! ❤️
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              placeholder="Username"
              required
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-xl font-bold text-white text-lg transition shadow-md disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-center text-purple-700">
            New player? <Link to="/signup" className="underline hover:text-purple-900">Sign Up</Link>
          </p>
        </div>

        {/* RIGHT = IMAGE */}
        <div className="w-1/2 relative bg-gradient-to-b from-purple-200 to-pink-200">
          <img
            src={heartPanel}
            alt="hearts"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
