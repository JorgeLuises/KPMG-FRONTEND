//Types de usuario
export type NuevoUsuario = {
    email: string;
    password: string;
    nombre: string;
    repitePassword: string;
}
export type LoginUsuario = Omit<NuevoUsuario, 'nombre' | 'repitePassword'>

//Types de errores de la API
export type ErrorDeCampo = {
    type: "field";
    value: string;
    msg: string;
    path: string;
    location: string;
}
export type ErrorGenerico = {
    msg: string;
}
export type ErrorAPI = ErrorDeCampo | ErrorGenerico;

//Types de respuesta efectiva de API
export type RespuestaAPI = {
    errores: ErrorAPI[];
    usuario?: { email?: string }
}

//Types de empleados
export type Empleado = {
    educacion: string;
    anioUnion: number;
    edad: number;
    genero: string;
    benched: boolean;
    experiencia: number;
    departamento: string;
    nombreCiudad: string;
    idPago: string;
    nombreEmpleado: string;
    idEmpleado: string;
}
export type Empleados = {
    data: Empleado[];
}

//Types de filtrado de tabla
export type Filtros = {
    nombreEmpleado: string[];
    anioUnion: string[];
    educacion: string[];
    edad: string[];
    genero: string[];
    benched: string[];
    experiencia: string[];
    departamento: string[];
    nombreCiudad: string[];
    idPago: string[];
};