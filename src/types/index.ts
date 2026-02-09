export type NuevoUsuario = {
    email : string;
    password : string;
    nombre : string;
    repitePassword : string;
}
export type LoginUsuario = Omit<NuevoUsuario, 'nombre' | 'repitePassword'>

export type ErrorDeCampo = {
    type : "field";
    value : string;
    msg : string;
    path : string;
    location : string;
}

export type ErrorGenerico = {
    msg : string;
}

export type ErrorAPI = ErrorDeCampo | ErrorGenerico;

export type RespuestaAPI = {
    errores : ErrorAPI[];
    usuario ?: { email ?: string}
}

export type Empleado = {
    educacion : string;
    anioUnion : number;
    edad : number;
    genero : string;
    benched : boolean;
    experiencia : number;
    idDepartamento : string;
    idCiudad : string;
    idPago : string;
    nombreEmpleado : string;
    idEmpleado : string;
}

export type Empleados = {
    data : Empleado[];
}