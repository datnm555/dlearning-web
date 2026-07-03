import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AppLayout } from './layout/AppLayout';
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
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'alphabet', element: <AlphabetPage /> },
      { path: 'colors', element: <ColorsPage /> },
      { path: 'animals', element: <AnimalsPage /> },
      { path: 'counting', element: <CountingPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
