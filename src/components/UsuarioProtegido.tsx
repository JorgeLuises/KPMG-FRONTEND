import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UsuarioProtegido() {
    const { auth, loading } = useAuth();

    if(loading) return <p>Cargando..</p>;

    return auth ? <Outlet /> : <Navigate to="/home" replace />;
}
