import { X } from 'lucide-react';

type SideBarProps = {
    isOpen: boolean;
    onClose: () => void
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
    return (
        <>
            {/* Overlay oscuro */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header del Sidebar */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Menú</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                        aria-label="Cerrar menú"
                    >
                        <X className="w-6 h-6 text-slate-300" />
                    </button>
                </div>

                {/* Links de navegación */}
                <nav className="flex-1 p-6 space-y-2">
                    <a
                        href="/home"
                        className="flex items-center px-4 py-3 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                        Control de empleados
                    </a>

                    <a
                        href="#"
                        className="flex items-center px-4 py-3 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                        Dashboard
                    </a>

                    <a
                        href="#"
                        className="flex items-center px-4 py-3 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                        Proyectos
                    </a>

                    <a
                        href="#"
                        className="flex items-center px-4 py-3 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                        Finanzas
                    </a>
                </nav>

                {/* Botón de cerrar sesión */}
                <div className="p-6 border-t border-slate-700">
                    <button
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}
