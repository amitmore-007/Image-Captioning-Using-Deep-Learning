import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/get-started" />;
};

export default ProtectedRoute;
