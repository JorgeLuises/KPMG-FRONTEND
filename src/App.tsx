import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import UsuarioProtegido from './components/UsuarioProtegido';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';

const router = createBrowserRouter([
  // --- Rutas Públicas ---
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },

  // --- Rutas Privadas (Protegidas) ---
  {
    element: <UsuarioProtegido />, //Rutas que requieren del usuario autenticado
    children: [  //Rutas protegidas por el usuario autenticado
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },

  // --- Manejo de errores ---
  {
    path: '*',
    element: <Navigate to="/" />,
  }
]);

function App() {
  return (
    //Provider envuelva al Router para que ProtectedRoute pueda acceder al estado de autenticación
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;