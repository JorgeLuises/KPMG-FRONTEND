import type { Empleado } from "../types";

export type accionesEmpleados =
    { type: 'abrirformulario', payload: { value: boolean } } |
    { type: 'abrirformularioEdi', payload: { value: boolean, idEmpleado: Empleado['idEmpleado'], empleado: Empleado } } |
    { type: 'abrirWarning', payload: { value: boolean, idEmpleado: Empleado['idEmpleado'], nombreEmpleado: Empleado['nombreEmpleado'] } } |
    { type: 'cerrarModal', payload: { value: boolean } } |
    { type: 'eliminarEmpleado', payload: { idEmpleado: Empleado['idEmpleado'] } }

export type state = {
    formulario: boolean;
    warning: boolean;
    cerrar: boolean;
    idEmpleado: string;
    nombreEmpleado: string;
    empleado?: Empleado;
}

export const initialState: state = {
    formulario: false,
    warning: false,
    cerrar: false,
    idEmpleado: '',
    nombreEmpleado: '',
    empleado: undefined
}

export const empleadosReducer = (estado: state = initialState, actions: accionesEmpleados) => {
    switch (actions.type) {
        case 'abrirformulario':
            return {
                ...estado,
                formulario: true,
                cerrar: false
            }

        case 'abrirformularioEdi':
            return {
                ...estado,
                formulario: true,
                cerrar: false,
                idEmpleado: actions.payload.idEmpleado,
                empleado: actions.payload.empleado
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