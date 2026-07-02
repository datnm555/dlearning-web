import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AlphabetPage } from './pages/AlphabetPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/alphabet',
    element: (
      <RequireAuth>
        <AlphabetPage />
      </RequireAuth>
    ),
  },
  { path: '*', element: <Navigate to="/alphabet" replace /> },
]);
