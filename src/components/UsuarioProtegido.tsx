import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function UsuarioProtegido() {
    const { auth, loading } = useAuth();

    if(loading) return <Spinner />;

    return auth ? <Outlet /> : <Navigate to="/" replace />;
}
