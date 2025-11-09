import { Link } from "react-router-dom";
import { useState } from "react";
import heartPanel from "../../../assets/a.png";  // your image
import useLogin from "../hooks/useSignup"; // import your mutation hook
import type { SignupModel } from "../models/SignupModel";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  // Use your mutation hook
  const { mutate: signup, isPending } = useLogin();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const userData: SignupModel = {
      username,
      full_name: fullname, // you can replace this if you have a separate full_name input
      password,
      confirm_password: password, // using same password here for simplicity
    };

    signup(userData); // triggers your mutation
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex w-full max-w-4xl h-[580px] bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT = FORM */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-gradient-to-b from-pink-100 to-purple-100">
          <h1 className="text-4xl font-bold text-purple-800 mb-8">Join the Heart Game</h1>
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              placeholder="Username"
              required
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="full Name"
              required
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-5 py-3 bg-white/80 border border-purple-300 rounded-xl text-purple-900 placeholder-purple-500 focus:ring-4 focus:ring-pink-300 focus:outline-none transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-xl font-bold text-white text-lg transition shadow-md disabled:opacity-60"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-center text-purple-700">
            Already playing? <Link to="/login" className="underline hover:text-purple-900">Login</Link>
          </p>
        </div>

        {/* RIGHT = IMAGE */}
        <div className="w-1/2 relative bg-gradient-to-b from-purple-200 to-pink-200 flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src={heartPanel}
              alt="hearts"
              className="absolute inset-2 w-full h-full object-cover drop-shadow-2xl"
            />
            <p className="text-2xl font-semibold text-purple-800">Count the Hearts!</p>
            <p className="text-purple-600 mt-2">Fun & Simple Game</p>
          </div>
        </div>
      </div>
    </div>
  );
}
