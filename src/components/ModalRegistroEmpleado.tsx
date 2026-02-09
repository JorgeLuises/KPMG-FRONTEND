import { X } from 'lucide-react';
import type { accionesEmpleados } from '../reducers/empleadosReducer';

type ModalRegistroProps = {
  dispatch : React.ActionDispatch<[actions: accionesEmpleados]>,
  titulo : string
}

export default function ModalRegistroEmpleado({ dispatch, titulo } : ModalRegistroProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800">{titulo}</h2>
            <button
              onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true }})}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Form */}
          <form  className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre del Empleado */}
              <div className="md:col-span-2">
                <label
                  htmlFor="nombreEmpleado"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nombre del Empleado <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombreEmpleado"
                  name="nombreEmpleado"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese el nombre completo"
                />
              </div>

              {/* Año de Unión */}
              <div>
                <label
                  htmlFor="anioUnion"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Año de Unión <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="anioUnion"
                  name="anioUnion"
                  required
                  min="1900"
                  max="2100"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese año de incorporación"
                />
              </div>

              {/* Edad */}
              <div>
                <label
                  htmlFor="edad"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Edad <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese edad"
                />
              </div>

              {/* Género */}
              <div>
                <label
                  htmlFor="genero"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Género <span className="text-red-500">*</span>
                </label>
                <select
                  id="genero"
                  name="genero"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {/* Nivel de Educación */}
              <div>
                <label
                  htmlFor="educacion"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nivel de Educación <span className="text-red-500">*</span>
                </label>
                <select
                  id="educacion"
                  name="educacion"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione nivel de estudios</option>
                  <option value="Bachillerato">Bachillerato</option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Maestría">Maestría</option>
                  <option value="Doctorado">Doctorado</option>
                </select>
              </div>

              {/* Benched */}
              <div>
                <label
                  htmlFor="benched"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Benched <span className="text-red-500">*</span>
                </label>
                <select
                  id="benched"
                  name="benched"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>

              {/* Años de Experiencia */}
              <div>
                <label
                  htmlFor="experiencia"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Años de Experiencia <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="experiencia"
                  name="experiencia"
                  required
                  min="0"
                  max="50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese los años de experiencia"
                />
              </div>

              {/* Departamento */}
              <div>
                <label
                  htmlFor="idDepartamento"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Departamento <span className="text-red-500">*</span>
                </label>
                <select
                  id="idDepartamento"
                  name="idDepartamento"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un departamento</option>
                  <option value="1">Recursos Humanos</option>
                  <option value="2">Tecnología</option>
                  <option value="3">Finanzas</option>
                  <option value="4">Marketing</option>
                  <option value="5">Ventas</option>
                </select>
              </div>

              {/* Ciudad */}
              <div>
                <label
                  htmlFor="idCiudad"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <select
                  id="idCiudad"
                  name="idCiudad"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione una ciudad</option>
                  <option value="1">Ciudad de México</option>
                  <option value="2">Guadalajara</option>
                  <option value="3">Monterrey</option>
                  <option value="4">Puebla</option>
                  <option value="5">Querétaro</option>
                </select>
              </div>

              {/* Tipo de Pago */}
              <div>
                <label
                  htmlFor="idPago"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                    Nivel de pago<span className="text-red-500">*</span>
                </label>
                <select
                  id="idPago"
                  name="idPago"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="1">Mensual</option>
                  <option value="2">Quincenal</option>
                  <option value="3">Semanal</option>
                  <option value="4">Por Proyecto</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true }})}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
