import type { Empleado } from "../types";

export type accionesEmpleados =
    { type: 'abrirformulario', payload: { value: boolean } } |
    { type: 'abrirWarning', payload: { value: boolean, idEmpleado: Empleado['idEmpleado'], nombreEmpleado: Empleado['nombreEmpleado'] } } |
    { type: 'cerrarModal', payload: { value: boolean } } |
    { type: 'eliminarEmpleado', payload: { idEmpleado: Empleado['idEmpleado'] } }

export type state = {
    formulario: boolean;
    warning: boolean;
    cerrar: boolean;
    idEmpleado: string;
    nombreEmpleado: string;
    mensajeAPI?: string;
}

export const initialState: state = {
    formulario: false,
    warning: false,
    cerrar: false,
    idEmpleado: '',
    nombreEmpleado: ''
}

export const empleadosReducer = (estado: state = initialState, actions: accionesEmpleados) => {
    switch (actions.type) {
        case 'abrirformulario':
            return {
                ...estado,
                formulario: true,
                cerrar: false
            }

        case 'abrirWarning':
            return {
                ...estado,
                warning: true,
                cerrar: false,
                idEmpleado: actions.payload.idEmpleado,
                nombreEmpleado: actions.payload.nombreEmpleado
            }

        case 'cerrarModal':
            return {
                ...estado,
                formulario: false,
                warning: false,
                cerrar: true,
                idEmpleado: '',
                nombreEmpleado: ''
            }

        default:
            return estado;
    }
}