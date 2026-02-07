import { useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import axios from 'axios';
import type { LoginUsuario, RespuestaAPI } from '../types';

export default function ResetPasswordForm() {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<LoginUsuario>();
  const [ mensaje, setMensaje ] = useState<string>()

  const onSubmit = async (data: LoginUsuario) => {
    try {
      const response = await axios.post("http://localhost:3000/usuario/reestablecerPassword", data);
      if(response.data?.mensaje) {
        setMensaje(response.data.mensaje)
      }
      reset();
    } catch (error: any) {
      if (error.response?.data?.errores) {
        const respuesta = error.response.data as RespuestaAPI;

        respuesta.errores.forEach((err) => {
          // Type guard: verificar si es ErrorDeCampo
          if ('path' in err) {
            // Validar que el path sea un campo válido del formulario
            const fieldPath = err.path as FieldPath<LoginUsuario>;
            setError(fieldPath, { message: err.msg });
          } else {
            // Error genérico
            setError('root', { message: err.msg });
          }
        });
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

        {/* Sección de imagen de fondo */}
        <div className="md:w-1/2 bg-linear-to-br from-purple-500 via-pink-500 to-rose-500 p-12 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-32 h-32 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No te preocupes</h2>
            <p className="text-pink-100 text-lg">
              Te ayudaremos a recuperar el acceso a tu cuenta
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {mensaje ? (
            // Mensaje de éxito
            <div className="text-center">
              <div className="mb-8">
                <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Éxito!</h2>
              <p className="text-gray-600 mb-8 text-lg">{mensaje}</p>
              <a 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio de sesión
              </a>
            </div>
          ) : (
            // Formulario
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Restablecer contraseña</h2>
                <p className="text-gray-600">Ingresa tu correo electrónico y tu nueva contraseña para poder reestablecerla</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {errors.root && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.root.message}</p>}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.email.message}</p>}
                </div>

                {/* Nuevo password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="tu nueva contraseña"
                  />
                  {errors.password && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.password.message}</p>}
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-200 transform hover:scale-[1.02]"
                >
                  Restablecer contraseña
                </button>

              </form>

              {/* Link de regreso */}
              <div className="text-center mt-6">
                <a href="/" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al inicio de sesión
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
