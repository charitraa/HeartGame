import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/page/Login";
import Signup from "./Pages/Signup/pages/Signup";
import Home from "./Pages/home";
import Difficulty from "./Pages/Difficulty";
import Mainpage from "./Pages/Mainpage";
import  ProtectedRoute  from "./Routes/ProtectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/difficulty"
        element={
          <ProtectedRoute>
            <Difficulty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
