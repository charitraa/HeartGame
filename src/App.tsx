import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/home";
import Difficulty from "./Pages/Difficulty";
import Mainpage from "./Pages/Mainpage";
// import Game from "./Pages/Game";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/difficulty" element={<Difficulty />} />
      <Route path="/main" element={<Mainpage />} />
     </Routes>
  );
}
