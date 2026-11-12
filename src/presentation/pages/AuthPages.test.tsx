import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { AuthProvider } from '../auth/AuthProvider';

const wrap = (ui: React.ReactElement) =>
  render(<MemoryRouter><AuthProvider>{ui}</AuthProvider></MemoryRouter>);

describe('auth pages', () => {
  it('login shows the demo account hint and prefills nothing', () => {
    wrap(<LoginPage />);
    expect(screen.getByTestId('demo-hint')).toHaveTextContent('Tài khoản demo: sam / 1');
    expect((screen.getByLabelText('Tên đăng nhập') as HTMLInputElement).value).toBe('');
  });

  it('register shows the password rule', () => {
    wrap(<RegisterPage />);
    expect(screen.getByTestId('password-rule')).toHaveTextContent('8–128 ký tự');
  });
});
