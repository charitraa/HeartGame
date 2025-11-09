// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return <div>Loading...</div>; // you can replace with a spinner
  }
  console.log("ProtectedRoute - user:", user);

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
