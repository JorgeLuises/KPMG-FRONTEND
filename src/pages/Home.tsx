import { useState, useEffect } from "react";
import axios from 'axios';
import { Menu } from "lucide-react";
import SideBar from "../components/SideBar";
import TablaEmpleados from "../components/TablaEmpleados";
import Spinner from "../components/Spinner";
import type { Empleados } from "../types";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [empleados, setEmpleados] = useState<Empleados>({ data: [] });
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const mostrarEmpleados = async () => {
      try {
        setIsLoading(true);
        const respuesta = await axios.get('http://localhost:3000/empleados/empleados', {
          withCredentials: true
        });

        // Asegurarse de que tiene la propiedad 'data'
        if (respuesta.data && Array.isArray(respuesta.data.data)) {
          setEmpleados(respuesta.data);
        } else if (Array.isArray(respuesta.data)) {
          // Si la API devuelve directamente el array
          setEmpleados({ data: respuesta.data });
        }
      } catch (error) {
        console.error('Error al cargar empleados:', error);
        setEmpleados({ data: [] });
      } finally {
        setIsLoading(false);
      }
    }

    mostrarEmpleados();
  }, [])

  return (
    <>
      <div className="min-h-screen">
        {/* Sidebar Component */}
        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content Area */}
        <div className="relative">
          {/* Header con botón de menú */}
          <header className="bg-blue-400 shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center px-6 py-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 mr-4"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Aplicación KPMG</h1>
            </div>
          </header>

          {/* Espacio para el contenido de la página */}
          <main className="p-8">
            <h1 className="font-bold text-4xl mb-5">Interfaz de control de empleados</h1>
            {isLoading ? <Spinner /> : <TablaEmpleados empleados={empleados} />}
          </main>
        </div>
      </div>
    </>
  );
}
