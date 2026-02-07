import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verificarUsuario = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/usuario/verificacion');
                setAuth(data);
                console.log(data);
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };
        verificarUsuario();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);