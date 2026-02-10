import { useState, useEffect } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import axios from 'axios';
import { X } from 'lucide-react';
import type { accionesEmpleados } from '../reducers/empleadosReducer';
import type { Empleado, RespuestaAPI, Departamento, Ciudad, Pago } from '../types/index';

type ModalRegistroProps = {
  dispatch: React.ActionDispatch<[actions: accionesEmpleados]>,
  titulo: string
}

export default function ModalRegistroEmpleado({ dispatch, titulo }: ModalRegistroProps) {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<Empleado>();
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, ciudadRes, pagoRes] = await Promise.all([
          axios.get<Departamento[]>('http://localhost:3000/departamentos/mostrarDepartamentos'),
          axios.get<Ciudad[]>('http://localhost:3000/ciudades/mostrarCiudades'),
          axios.get<Pago[]>('http://localhost:3000/pagos/mostrarPagos')
        ]);

        setDepartamentos(deptRes.data);
        setCiudades(ciudadRes.data);
        setPagos(pagoRes.data);
      }
      catch (error) {
        console.error('Error al cargar datos en formulario:', error);
      }
      
    }
    fetchData();
  }, []);

  const onSubmit = async (data: Empleado) => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:3000/empleados/agregarEmpleado",data, { withCredentials: true });

      if (response.data.mensaje) {
        sessionStorage.setItem('toastAfterReload', JSON.stringify({ type: 'success', text: response.data.mensaje }))
      }
      reset();
      window.location.reload();
    } catch (error: any) {
      if (error.response?.data?.errores) {
        const respuesta = error.response.data as RespuestaAPI;

        respuesta.errores.forEach((err) => {
          if ('path' in err) {
            const fieldPath = err.path as FieldPath<Empleado>;
            setError(fieldPath, { message: err.msg });
          } else {
            setError('root', { message: err.msg });
          }
        });
      } else {
        console.error(error);
      }
    }
  }

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
              onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true } })}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Form */}
          {errors.root && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.root.message}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
                  {...register('nombreEmpleado')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese el nombre completo"
                />
                {errors.nombreEmpleado && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.nombreEmpleado.message}</p>}
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
                  {...register('anioUnion')}
                  min="1900"
                  max="2100"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese año de incorporación"
                />
                {errors.anioUnion && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.anioUnion.message}</p>}
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
                  {...register('edad')}
                  min="18"
                  max="100"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese edad"
                />
                {errors.edad && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.edad.message}</p>}
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
                  required
                  {...register('genero')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione un género</option>
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
                  required
                  {...register('educacion')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione nivel de estudios</option>
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
                  {...register('benched')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione una opción</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
                {errors.benched && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.benched.message}</p>}
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
                  {...register('experiencia')}
                  min="0"
                  max="50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese los años de experiencia"
                />
                {errors.experiencia && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.experiencia.message}</p>}
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
                  required
                  id="idDepartamento"
                  {...register('idDepartamento')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione un departamento</option>
                  {departamentos.map((depto, index) => (
                    <option key={index} value={depto.idDepartamento}>{depto.departamento}</option>
                  ))}
                </select>
                {errors.departamento && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.departamento.message}</p>}
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
                  required
                  id="idCiudad"
                  {...register('idCiudad')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione una ciudad</option>
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad.idCiudad}>{ciudad.nombreCiudad}</option>
                  ))}
                </select>
                {errors.nombreCiudad && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.nombreCiudad.message}</p>}
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
                  {...register('idPago')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled selected>Seleccione una opción</option>
                  {pagos.map((pago, index) => (
                    <option key={index} value={pago.idPago}>{pago.idPago}</option>
                  ))}
                </select>
                {errors.idPago && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.idPago.message}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => dispatch({ type: 'cerrarModal', payload: { value: true } })}
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
