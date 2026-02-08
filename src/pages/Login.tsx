import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import Spinner from "../components/Spinner";

export default function Login() {
  const { auth, loading } = useAuth();

  if (loading) return <Spinner />;

  if (auth) return <Navigate to="/home" replace />;

  return <LoginForm />;
}
