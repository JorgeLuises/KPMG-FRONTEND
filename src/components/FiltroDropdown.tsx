import { ChevronDown } from "lucide-react";
import type { Filtros } from "../types";

type FiltroDropdownProps = {
    columna: string;
    campo: keyof Filtros;
    valoresUnicos: string[];
    tieneValoresFiltrados: boolean;
    columnaFiltroAbierta: string | null;
    setColumnaFiltroAbierta: (columna: string | null) => void;
    filtrosActivos: Filtros;
    setFiltrosActivos: (filtros: Filtros) => void;
    toggleFiltroColumna: (columna: string) => void;
    toggleValorFiltro: (campo: keyof Filtros, valor: string) => void;
    setPaginaActual: (pagina: number) => void;
};

export default function FiltroDropdown({
    columna,
    campo,
    valoresUnicos,
    tieneValoresFiltrados,
    columnaFiltroAbierta,
    setColumnaFiltroAbierta,
    filtrosActivos,
    setFiltrosActivos,
    toggleFiltroColumna,
    toggleValorFiltro,
    setPaginaActual,
}: FiltroDropdownProps) {
    return (
        <div className="relative inline-block">
            <button
                onClick={() => toggleFiltroColumna(columna)}
                className={`ml-2 p-1 rounded hover:bg-slate-200 transition-colors ${tieneValoresFiltrados ? "bg-blue-100" : ""
                    }`}
            >
                <ChevronDown className="w-4 h-4" />
            </button>

            {columnaFiltroAbierta === columna && (
                <>
                    {/* Overlay para cerrar al hacer clic fuera */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setColumnaFiltroAbierta(null)}
                    />

                    {/* Dropdown de filtros */}
                    <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-300 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                        <div className="p-3 border-b border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm">Filtrar por:</span>
                                {tieneValoresFiltrados && (
                                    <button
                                        onClick={() => {
                                            setFiltrosActivos((prev) => ({ ...prev, [campo]: [] }));
                                            setPaginaActual(1);
                                        }}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-2">
                            {valoresUnicos.map((valor) => (
                                <label
                                    key={valor}
                                    className="flex items-center px-2 py-2 hover:bg-slate-50 rounded cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filtrosActivos[campo].includes(valor)}
                                        onChange={() => toggleValorFiltro(campo, valor)}
                                        className="mr-2 w-4 h-4"
                                    />
                                    <span className="text-sm text-slate-700">{valor}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
