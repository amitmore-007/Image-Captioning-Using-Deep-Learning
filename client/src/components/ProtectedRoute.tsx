import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/login" />;
}