import { useAuth } from "../context/AuthContext";

export default function Spinner() {
    const { loading } = useAuth();
    
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
                {/* Spinner principal */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>

                {/* Texto de carga */}
                <div className="text-center">
                    <p className="text-gray-700 font-medium text-lg">Cargando...</p>
                    <p className="text-gray-500 text-sm mt-1">Por favor espera</p>
                </div>

                {/* Barra de progreso animada (opcional) */}
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
