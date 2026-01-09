import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function AdminProtectedRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
