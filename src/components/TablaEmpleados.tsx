import { useState, useMemo, useReducer } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Empleados, Filtros } from "../types";
import FiltroDropdown from "./FiltroDropdown";
import { initialState, empleadosReducer } from "../reducers/empleadosReducer";
import ModalRegistroEmpleado from "./ModalRegistroEmpleado";
import ModalEliminarEmpleado from "./ModalEliminarEmpleado";

type TablaEmpleadosProps = {
  empleados: Empleados;
};

export default function TablaEmpleados({ empleados }: TablaEmpleadosProps) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosActivos, setFiltrosActivos] = useState<Filtros>({
    nombreEmpleado: [],
    anioUnion: [],
    educacion: [],
    edad: [],
    genero: [],
    benched: [],
    experiencia: [],
    departamento: [],
    nombreCiudad: [],
    idPago: [],
  });
  const [columnaFiltroAbierta, setColumnaFiltroAbierta] = useState<string | null>(null);

  const registrosPorPagina = 5;

  // Obtener valores únicos para cada columna
  const obtenerValoresUnicos = (campo: keyof typeof empleados.data[0]) => {
    const valores = empleados.data.map((emp) => {
      if (campo === "benched") {
        return emp[campo] ? "Sí" : "No";
      }
      return String(emp[campo]);
    });
    return Array.from(new Set(valores)).sort();
  };

  // Filtrar empleados según los filtros activos
  const empleadosFiltrados = useMemo(() => {
    return empleados.data.filter((empleado) => {
      // Verificar cada filtro
      for (const [campo, valoresFiltro] of Object.entries(filtrosActivos)) {
        if (valoresFiltro.length > 0) {
          let valorEmpleado: string;

          if (campo === "benched") {
            valorEmpleado = empleado.benched ? "Sí" : "No";
          } else {
            valorEmpleado = String(empleado[campo as keyof typeof empleado]);
          }

          if (!valoresFiltro.includes(valorEmpleado)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [empleados.data, filtrosActivos]);

  // Calcular paginación
  const totalPaginas = Math.ceil(empleadosFiltrados.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const empleadosPaginados = empleadosFiltrados.slice(indiceInicio, indiceFin);

  // Cambiar página
  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // Toggle filtro de columna
  const toggleFiltroColumna = (columna: string) => {
    if (columnaFiltroAbierta === columna) {
      setColumnaFiltroAbierta(null);
    } else {
      setColumnaFiltroAbierta(columna);
    }
  };

  // Toggle valor de filtro
  const toggleValorFiltro = (columna: keyof Filtros, valor: string) => {
    setFiltrosActivos((prev) => {
      const valoresActuales = prev[columna];
      const nuevosValores = valoresActuales.includes(valor)
        ? valoresActuales.filter((v) => v !== valor)
        : [...valoresActuales, valor];

      return { ...prev, [columna]: nuevosValores };
    });
    setPaginaActual(1); // Resetear a página 1 cuando se filtra
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setFiltrosActivos({
      nombreEmpleado: [],
      anioUnion: [],
      educacion: [],
      edad: [],
      genero: [],
      benched: [],
      experiencia: [],
      departamento: [],
      nombreCiudad: [],
      idPago: [],
    });
    setPaginaActual(1);
  };

  const hayFiltrosActivos = Object.values(filtrosActivos).some((arr) => arr.length > 0);

  const [state, dispatch] = useReducer(empleadosReducer, initialState);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="mb-2 rounded bg-green-500 p-2 text-sm text-white hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          onClick={() => dispatch({ type: 'abrirformulario', payload: {value: true}})}>
          Agregar nuevo empleado
        </button>
        {hayFiltrosActivos && (
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors text-sm"
          >
            Limpiar todos los filtros
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Nombre empleado
                  <FiltroDropdown
                    columna="nombre"
                    campo="nombreEmpleado"
                    valoresUnicos={obtenerValoresUnicos("nombreEmpleado")}
                    tieneValoresFiltrados={filtrosActivos.nombreEmpleado.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Año de unión
                  <FiltroDropdown
                    columna="anio"
                    campo="anioUnion"
                    valoresUnicos={obtenerValoresUnicos("anioUnion")}
                    tieneValoresFiltrados={filtrosActivos.anioUnion.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Nivel de estudios
                  <FiltroDropdown
                    columna="educacion"
                    campo="educacion"
                    valoresUnicos={obtenerValoresUnicos("educacion")}
                    tieneValoresFiltrados={filtrosActivos.educacion.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Edad
                  <FiltroDropdown
                    columna="edad"
                    campo="edad"
                    valoresUnicos={obtenerValoresUnicos("edad")}
                    tieneValoresFiltrados={filtrosActivos.edad.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Género
                  <FiltroDropdown
                    columna="genero"
                    campo="genero"
                    valoresUnicos={obtenerValoresUnicos("genero")}
                    tieneValoresFiltrados={filtrosActivos.genero.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Benched
                  <FiltroDropdown
                    columna="benched"
                    campo="benched"
                    valoresUnicos={obtenerValoresUnicos("benched")}
                    tieneValoresFiltrados={filtrosActivos.benched.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Años de experiencia
                  <FiltroDropdown
                    columna="experiencia"
                    campo="experiencia"
                    valoresUnicos={obtenerValoresUnicos("experiencia")}
                    tieneValoresFiltrados={filtrosActivos.experiencia.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Departamento
                  <FiltroDropdown
                    columna="departamento"
                    campo="departamento"
                    valoresUnicos={obtenerValoresUnicos("departamento")}
                    tieneValoresFiltrados={filtrosActivos.departamento.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Ciudad
                  <FiltroDropdown
                    columna="ciudad"
                    campo="nombreCiudad"
                    valoresUnicos={obtenerValoresUnicos("nombreCiudad")}
                    tieneValoresFiltrados={filtrosActivos.nombreCiudad.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                <div className="flex items-center">
                  Pago
                  <FiltroDropdown
                    columna="pago"
                    campo="idPago"
                    valoresUnicos={obtenerValoresUnicos("idPago")}
                    tieneValoresFiltrados={filtrosActivos.idPago.length > 0}
                    columnaFiltroAbierta={columnaFiltroAbierta}
                    setColumnaFiltroAbierta={setColumnaFiltroAbierta}
                    filtrosActivos={filtrosActivos}
                    setFiltrosActivos={setFiltrosActivos}
                    toggleFiltroColumna={toggleFiltroColumna}
                    toggleValorFiltro={toggleValorFiltro}
                    setPaginaActual={setPaginaActual}
                  />
                </div>
              </th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {empleadosPaginados.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="border-b border-slate-200 px-4 py-3 text-center text-slate-700"
                >
                  {hayFiltrosActivos
                    ? "No hay empleados que coincidan con los filtros"
                    : "No hay empleados registrados"}
                </td>
              </tr>
            ) : (
              empleadosPaginados.map((empleado) => (
                <tr
                  key={empleado.idEmpleado}
                  className="odd:bg-white even:bg-slate-50"
                >
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.nombreEmpleado}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.anioUnion}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.educacion}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.edad}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.genero}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.benched ? "Sí" : "No"}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.experiencia}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.departamento}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.nombreCiudad}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    {empleado.idPago}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                    <button 
                      className="mr-2 rounded bg-blue-500 p-2 text-sm text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                      onClick={() => dispatch({ type: 'abrirformulario', payload: {value: true}})}>
                        Editar
                    </button>
                    <button 
                      className="rounded bg-red-500 p-2 text-sm text-white hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                      onClick={() => dispatch({ type:'abrirWarning', payload: {value: true, idEmpleado: empleado.idEmpleado, nombreEmpleado: empleado.nombreEmpleado}})}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sección de modales */}
      {state.formulario && <ModalRegistroEmpleado dispatch={dispatch} titulo={"Agregar empleado"}/>}
      {state.formulario && <ModalRegistroEmpleado dispatch={dispatch} titulo={"Editar empleado"}/>}
      {state.warning && <ModalEliminarEmpleado dispatch={dispatch} titulo={"Eliminar empleado"} idEmpleado={state.idEmpleado} nombreEmpleado={state.nombreEmpleado} mensaje={'El siguiente empleado será eliminado del sistema'}/>}

      {/* Paginación */}
      {empleadosFiltrados.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Mostrando {indiceInicio + 1} a{" "}
            {Math.min(indiceFin, empleadosFiltrados.length)} de{" "}
            {empleadosFiltrados.length} empleados
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="p-2 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => cambiarPagina(pagina)}
                  className={`px-3 py-1 rounded border transition-colors ${paginaActual === pagina
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {pagina}
                </button>
              ))}
            </div>

            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="p-2 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}