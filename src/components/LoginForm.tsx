import { useForm, type FieldPath } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { LoginUsuario, RespuestaAPI } from '../types';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<LoginUsuario>();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginUsuario) => {
    try {
      const response = await axios.post("http://localhost:3000/usuario/login",
        data,
        {
          withCredentials: true
        }
      );
      setAuth(response.data);
      navigate('/home');
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
        <div className="md:w-1/2 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-600 p-12 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-32 h-32 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">¡Hola de nuevo!</h2>
            <p className="text-cyan-100 text-lg">
              Inicia sesión para continuar con tu experiencia
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar sesión</h2>
            <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa tu contraseña"
              />
              {errors.password && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.password.message}</p>}
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 transform hover:scale-[1.02]"
            >
              Iniciar sesión
            </button>

            {/* Link de registro */}
            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
