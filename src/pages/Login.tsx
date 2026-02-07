import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(auth) navigate('/home')
  }, [auth, navigate])
  
  return < LoginForm/>;
}
