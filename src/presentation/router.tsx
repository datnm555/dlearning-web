import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AlphabetPage } from './pages/AlphabetPage';
import { AnimalsPage } from './pages/AnimalsPage';
import { ColorsPage } from './pages/ColorsPage';
import { CountingPage } from './pages/CountingPage';
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
  {
    path: '/animals',
    element: (
      <RequireAuth>
        <AnimalsPage />
      </RequireAuth>
    ),
  },
  {
    path: '/counting',
    element: (
      <RequireAuth>
        <CountingPage />
      </RequireAuth>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
