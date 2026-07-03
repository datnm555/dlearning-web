import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AlphabetPage } from './pages/AlphabetPage';
import { ColorsPage } from './pages/ColorsPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: '/alphabet',
    element: (
      <RequireAuth>
        <AlphabetPage />
      </RequireAuth>
    ),
  },
  {
    path: '/colors',
    element: (
      <RequireAuth>
        <ColorsPage />
      </RequireAuth>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
