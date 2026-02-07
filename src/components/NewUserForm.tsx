import { useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import axios from 'axios';
import type { NuevoUsuario, RespuestaAPI } from '../types';

export default function NewUserForm() {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<NuevoUsuario>();
    const [mensaje, setMensaje] = useState<string>();

    const onSubmit = async (data: NuevoUsuario) => {
        try {
            const response = await axios.post("http://localhost:3000/usuario/registro", data);
            if (response.data?.mensaje) {
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
                        const fieldPath = err.path as FieldPath<NuevoUsuario>;
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
                <div className="md:w-1/2 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 flex items-center justify-center">
                    <div className="text-center">
                        <div className="mb-8">
                            <svg className="w-32 h-32 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Bienvenido</h2>
                        <p className="text-indigo-100 text-lg">
                            Únete a nuestra plataforma y descubre un mundo de posibilidades
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    {mensaje ? (
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
                                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al inicio de sesión
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear cuenta</h2>
                                <p className="text-gray-600">Completa el formulario para registrarte</p>
                            </div>

                            {errors.root && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.root.message}</p>}

                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        {...register('nombre')}
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                                        placeholder="Ingresa tu nombre"
                                    />
                                    {errors.nombre && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.nombre.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
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
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    {errors.password && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.password.message}</p>}
                                </div>

                                {/* Confirmar contraseña */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        {...register('repitePassword')}
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                                        placeholder="Repite tu contraseña"
                                    />
                                    {errors.repitePassword && <p className="bg-red-500 uppercase text-white text-sm font-bold p-3 my-4 text-center">{errors.repitePassword.message}</p>}
                                </div>

                                {/* Botón */}
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 transform hover:scale-[1.02]"
                                >
                                    Crear cuenta
                                </button>

                                {/* Link de inicio de sesión */}
                                <p className="text-center text-sm text-gray-600">
                                    ¿Ya tienes cuenta?{' '}
                                    <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        Inicia sesión
                                    </a>
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
