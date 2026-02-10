# KPMG Frontend - Sistema de Gestión de Empleados

## 📋 Descripción de la Aplicación

KPMG Frontend es una aplicación web moderna desarrollada con **React y TypeScript** que permite gestionar de forma integral la información de empleados de una organización. La aplicación proporciona funcionalidades de autenticación segura, visualización de datos en tablas interactivas, filtrado avanzado y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para empleados.

### Características Principales:
- ✅ Sistema de autenticación y registro de usuarios
- ✅ Recuperación de contraseñas segura
- ✅ Gestión completa de empleados (crear, editar, eliminar)
- ✅ Tablas interactivas con filtrado avanzado
- ✅ Interfaz responsiva y moderna
- ✅ Validación de formularios robusta
- ✅ Notificaciones de usuario en tiempo real

---

## 🏗️ Arquitectura de la Aplicación

### Tipo de Arquitectura

La aplicación implementa una **arquitectura por componentes** (Component-Based Architecture) con una separación clara de responsabilidades:

```
Frontend (React) ↔ API REST (Node.js/Express) ↔ Base de Datos (MySQL)
```

### Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── FiltroDropdown.tsx       # Selector de filtros
│   ├── LoginForm.tsx             # Formulario de login
│   ├── ModalEliminarEmpleado.tsx # Modal de eliminación
│   ├── ModalRegistroEmpleado.tsx # Modal de crear/editar empleado
│   ├── NewUserForm.tsx           # Formulario de registro
│   ├── ResetPasswordForm.tsx      # Formulario de recuperación
│   ├── SideBar.tsx               # Barra lateral de navegación
│   ├── Spinner.tsx               # Componente de carga
│   ├── TablaEmpleados.tsx        # Tabla de empleados
│   └── UsuarioProtegido.tsx      # Componente de rutas privadas
├── context/             # Contextos de React
│   └── AuthContext.tsx           # Contexto de autenticación
├── pages/               # Páginas principales
│   ├── Login.tsx                 # Página de login
│   ├── Register.tsx              # Página de registro
│   ├── ForgotPassword.tsx        # Página de recuperación
│   └── Home.tsx                  # Página principal (protegida)
├── reducers/            # Reducers de estado
│   └── empleadosReducer.ts       # Lógica de gestión de empleados
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts                  # Tipos globales
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

### Patrones de Diseño Utilizados

1. **Context API**: Gestión de estado global de autenticación
2. **useReducer**: Gestión local de estado de empleados
3. **React Router**: Manejo de rutas y navegación
4. **Custom Hooks**: Reutilización de lógica (useAuth)
5. **React Hook Form**: Validación y gestión de formularios

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Descripción |
|------------|---------|------------|
| **React** | 19.2.0 | Librería para construir interfaces de usuario |
| **TypeScript** | 5.9.3 | Lenguaje tipado basado en JavaScript |
| **Vite** | 7.2.4 | Bundler y servidor de desarrollo ultrarrápido |
| **Tailwind CSS** | 4.1.18 | Framework de CSS utilitario para estilos |
| **React Router DOM** | 7.13.0 | Librería de enrutamiento para SPA |
| **React Hook Form** | 7.71.1 | Librería para gestión eficiente de formularios |
| **Axios** | 1.13.4 | Cliente HTTP para consumo de APIs |
| **React Toastify** | 11.0.5 | Librería para notificaciones/toasts |
| **Lucide React** | 0.563.0 | Librería de iconos SVG |

### Herramientas de Desarrollo

| Herramienta | Versión | Propósito |
|-------------|---------|----------|
| **ESLint** | 9.39.1 | Linter para JavaScript/TypeScript |
| **SWC** | - | Compilador ultrarrápido para TypeScript |
| **Node** | 20+ | Runtime de JavaScript (recomendado) |

---

## 💻 Tecnologías y Librerías

### React y Ecosistema
- **React 19**: Framework principal para la construcción de la UI
- **React Router**: Manejo de navegación entre páginas
- **React Hook Form**: Gestión simplificada de formularios con validaciones
- **Context API**: Estado global compartido entre componentes

### Estilos
- **Tailwind CSS**: Estilos predefinidos y responsive design
- **Lucide React**: Iconos profesionales y consistentes

### Comunicación con servidor
- **Axios**: HTTP client para llamadas a API con soporte para:
  - Métodos GET, POST, PATCH, DELETE
  - Cookies (withCredentials: true)
  - Manejo de errores estructurado
  - Promesas y async/await

### Notificaciones
- **React Toastify**: Mensajes de éxito, error e información al usuario

### Tipado y Calidad
- **TypeScript**: Tipado estático para mayor seguridad
- **ESLint**: Análisis estático de código

---

## 📦 Consumo de API con Axios

### Configuración General

La aplicación comunica con una API REST alojada en `http://localhost:3000` mediante Axios. Las características principales son:

#### Autenticación con Cookies
```typescript
axios.get('http://localhost:3000/ruta', { withCredentials: true })
```
Se utiliza `withCredentials: true` para enviar/recibir cookies de sesión.

### Endpoints Utilizados

#### Autenticación
```typescript
// Verificar usuario autenticado
GET /usuario/verificacion

// Login
POST /usuario/login { email, password }

// Registro
POST /usuario/registro { email, password, nombre }

// Logout
POST /usuario/logout

// Recuperar contraseña
POST /usuario/recuperarPassword { email }

// Reset password
PUT /usuario/resetPassword { newPassword }
```

#### Empleados
```typescript
// Obtener todos los empleados
GET /empleados/mostrarEmpleados

// Agregar nuevo empleado
POST /empleados/agregarEmpleado { ...datos }

// Editar empleado
PUT /empleados/editarEmpleado/:id { ...datos }

// Eliminar empleado
DELETE /empleados/eliminarEmpleado/:id
```

#### Datos Auxiliares
```typescript
// Obtener departamentos
GET /departamentos/mostrarDepartamentos

// Obtener ciudades
GET /ciudades/mostrarCiudades

// Obtener niveles de pago
GET /pagos/mostrarPagos
```

### Manejo de Errores

La API retorna la siguiente estructura de respuesta:

```typescript
// Respuesta con errores
{
  errores: [
    {
      type: "field",
      path: "nombreEmpleado",
      msg: "El nombre es requerido"
    },
    {
      msg: "Error genérico"
    }
  ],
  usuario?: { email: "usuario@ejemplo.com" }
}
```

Los componentes capturan estos errores y los muestran en los campos específicos del formulario.

### Ejemplo de Consumo - ModalRegistroEmpleado.tsx

```typescript
const onSubmit = async (data: Empleado) => {
  try {
    // Validar modo: crear o editar
    const endpoint = modoEdicion 
      ? `http://localhost:3000/empleados/editarEmpleado/${idEmpleado}`
      : "http://localhost:3000/empleados/agregarEmpleado";
    
    const metodo = modoEdicion ? 'put' : 'post';
    
    // Realizar llamada con cookies
    const response = await axios[metodo](endpoint, data, { withCredentials: true });

    // Guardar mensaje de éxito en sessionStorage
    if (response.data.mensaje) {
      sessionStorage.setItem('toastAfterReload', JSON.stringify({ 
        type: 'success', 
        text: response.data.mensaje 
      }));
    }
    
    // Recargar página para reflejar cambios
    window.location.reload();
  } catch (error: any) {
    // Manejo de errores de validación
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
    }
  }
}
```

---

## 🚀 Guía de Instalación

### Requisitos Previos

- **Node.js** 18.0.0 o superior
- **npm** 9.0.0 o superior
- **Backend API** ejecutándose en `http://localhost:3000`

### Pasos de Instalación

#### 1. Clonar o descargar el repositorio

```bash
cd KPMG_FRONTEND
```

#### 2. Instalar dependencias

```bash
npm install
```

Este comando instala todas las dependencias del proyecto definidas en `package.json`.

#### 3. Variables de Entorno (Opcional)

Si es necesario, crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

Nota: Actualmente la URL está hardcodeada en los archivos. Se recomienda actualizar esto en futuras versiones.

#### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (Vite asigna el puerto automáticamente).

#### 5. Construir para producción

```bash
npm run build
```

Genera una carpeta `dist/` con los archivos optimizados listos para desplegar.

#### 6. Vista previa de la versión producción

```bash
npm run preview
```

Permite ver cómo se verá la aplicación compilada localmente.

#### 7. Linting (Validar código)

```bash
npm run lint
```

Ejecuta ESLint para identificar problemas de código y estilo.

---

## 📚 Estructura de Tipos (TypeScript)

### Tipos Principales

#### Usuario
```typescript
type NuevoUsuario = {
    email: string;
    password: string;
    nombre: string;
    repitePassword: string;
}

type LoginUsuario = Omit<NuevoUsuario, 'nombre' | 'repitePassword'>
```

#### Empleado
```typescript
type Empleado = {
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
    idCiudad: string;
    idDepartamento: string;
}
```

#### Respuesta de API
```typescript
type ErrorAPI = ErrorDeCampo | ErrorGenerico;

type RespuestaAPI = {
    errores: ErrorAPI[];
    usuario?: { email?: string }
}
```

#### Datos Auxiliares
```typescript
type Departamento = {
    idDepartamento: string;
    departamento: string;
};

type Ciudad = {
    idCiudad: string;
    nombreCiudad: string;
};

type Pago = {
    idPago: string;
};
```

---

## 🔐 Flujo de Autenticación

1. **Login/Register**: Usuario ingresa credenciales
2. **Verificación**: Backend valida y envía cookie de sesión
3. **AuthContext**: Almacena estado de autenticación global
4. **UsuarioProtegido**: Componente que protege rutas privadas
5. **Redirección**: Si no está autenticado, redirige a login

---

## 📊 Gestión de Estado

### Context API (AuthContext)
- **Auth**: Información del usuario autenticado
- **Loading**: Estado de carga durante verificación
- **setAuth**: Función para actualizar autenticación

### useReducer (empleadosReducer)
- **abrirModal**: Abre modal de registro
- **cerrarModal**: Cierra modal
- **setEmpleado**: Establece empleado a editar
- **limpiarEmpleado**: Limpia selección

---

## 🎨 Interfaz de Usuario

La aplicación utiliza **Tailwind CSS** para crear una interfaz moderna y responsiva:

- **Colores**: Palette de azul/gris
- **Componentes**: Botones, inputs, modales, tablas
- **Responsive**: Diseño adaptable a dispositivos móviles
- **Iconos**: Lucide React para iconografía consistente

---

## 📝 Componentes Principales

### LoginForm.tsx
Formulario de autenticación con validación de email y contraseña.

### ModalRegistroEmpleado.tsx
Modal reutilizable para crear y editar empleados con:
- Selección de departamento, ciudad y tipo de pago
- Validación de campos requeridos
- Manejo de errores de API

### TablaEmpleados.tsx
Tabla interactiva que muestra todos los empleados con:
- Paginación
- Acciones (editar, eliminar)
- Integración con filtros

### FiltroDropdown.tsx
Componentes para filtrar empleados por múltiples criterios.

---

## ⚙️ Configuración

### vite.config.ts
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### tsconfig.json
Configuración de TypeScript con opción estricta y módulos ES.

### eslint.config.js
Reglas de linting para mantener código limpio y consistente.

---

## 🐛 Troubleshooting

### El frontend no se conecta al backend
- Verificar que el backend está ejecutándose en `http://localhost:3000`
- Verificar que CORS está habilitado en el backend

### Los selectores no muestran datos al editar
- Asegurar que las opciones se cargan antes de resetear el formulario
- Verificar que los IDs coinciden entre datos y opciones

### Errores de TypeScript
- Ejecutar `npm run lint` para ver errores específicos
- Instalar tipos faltantes con `npm install --save-dev @types/nombre-paquete`

---

## 📄 Licencia

Este proyecto es parte del programa de KPMG.

---

## 👨‍💻 Autor

Desarrollado como aplicación de gestión de empleados para KPMG. Por Jorge Luis Escobedo Solana

**Fecha**: 10 de febrero de 2026

---

## 🔗 Enlaces Útiles

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

## 📌 Notas Importantes

1. **Variables de Entorno**: Considera migrar las URLs hardcodeadas a variables de entorno
2. **Seguridad**: Implementar HTTPS en producción
3. **Testing**: Añadir tests unitarios con Jest/Vitest
4. **Error Handling**: Mejorar manejo de errores de red
5. **API Base URL**: Centralizar en un archivo de configuración

