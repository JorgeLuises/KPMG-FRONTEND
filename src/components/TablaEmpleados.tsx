import type { Empleados } from "../types"

type TablaEmpleadosProps = {
  empleados : Empleados
}

export default function TablaEmpleados({ empleados } : TablaEmpleadosProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Nombre empleado</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Año de unión</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Nivel de estudios</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Edad</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Genero</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Benched</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Años de experiencia</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Departamento</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Ciudad</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Pago</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.data.length === 0 ? 
            <tr>
              <td colSpan={11} className="border-b border-slate-200 px-4 py-3 text-center text-slate-700">
                No hay empleados registrados
              </td>
            </tr> : 
            (empleados.data.map((empleado) => (
              <tr key={empleado.idEmpleado} className="odd:bg-white even:bg-slate-50">
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.nombreEmpleado}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.anioUnion}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.educacion}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.edad}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.genero}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.benched ? "Sí" : "No"}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.experiencia}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.idDepartamento}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.idCiudad}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{empleado.idPago}</td>
                <td className="border-b border-slate-200 px-4 py-3 text-slate-700">
                  <button className="mb-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 transition-colors duration-200">
                    Editar empleado
                  </button>
                  <button className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 transition-colors duration-200">
                    Eliminar empleado
                  </button>
                  </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
