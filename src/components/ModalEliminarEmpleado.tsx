import axios from 'axios';
import { AlertTriangle, X } from "lucide-react";
import type { Empleado } from '../types';
import type { accionesEmpleados } from '../reducers/empleadosReducer';

type ModalEliminarProps = {
    dispatch: React.ActionDispatch<[actions: accionesEmpleados]>;
    titulo: string;
    idEmpleado: string;
    nombreEmpleado: string;
    mensaje: string;
}

export default function ModalEliminarEmpleado({ dispatch, titulo, idEmpleado, nombreEmpleado, mensaje }: ModalEliminarProps) {
    const eliminarEmpleado = async (id : Empleado['idEmpleado']) => {
        try {
            const respuesta = await axios.delete(`http://localhost:3000/empleados/eliminarEmpleado/${id}`, {
                withCredentials: true
            });
            sessionStorage.setItem('toastAfterReload', JSON.stringify({type: 'success', text: respuesta.data.mensaje}))
            window.location.reload();
        } catch (error: any) {
            if (error.respuesta?.data?.mensaje) {
                sessionStorage.setItem('toastAfterReload', JSON.stringify({type: 'success', text: error.respuesta.data.mensaje}))
                window.location.reload();
                return error.respuesta.data.mensaje;
            } else {
                return 'Error al eliminar el empleado.';
            }
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800">{titulo}</h2>
                        </div>
                        <button
                            onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true } })}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-slate-600 mb-4">{mensaje}</p>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-500 mb-1">Empleado:</p>
                            <p className="font-semibold text-slate-800">{nombreEmpleado}</p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm text-amber-800">
                                <span className="font-semibold">Advertencia:</span> Esta acción no se puede deshacer. ¿Estás seguro de querer borrar la información?
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 p-6 pt-0">
                        <button
                            onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true } })}
                            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                            No, Cancelar
                        </button>
                        <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                            onClick={() => eliminarEmpleado(idEmpleado)}
                        >
                            Sí, Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
