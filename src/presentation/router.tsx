import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AlphabetGridPage } from './kids/AlphabetGridPage';
import { KidLayout } from './kids/KidLayout';
import { LetterCardPage } from './kids/LetterCardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// HIDDEN (code kept, not routed): HomePage, AnimalsPage, ColorsPage, CountingPage, AppLayout,
// SidebarMenu. They depend on the retired dlearning-be endpoints (/categories, /products,
// /animals, /colors, /counting) which dlearning-api does not provide.
export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <KidLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AlphabetGridPage /> },
      { path: 'letter/:id', element: <LetterCardPage /> },
      { path: 'alphabet', element: <Navigate to="/" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
