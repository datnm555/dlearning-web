import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import { isValidPassword, isValidUsername } from '../../application/usecases/passwordRule';
import { ApiError } from '../../infrastructure/http/ApiError';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { useAuth } from '../auth/useAuth';

const PASSWORD_RULE = 'Mật khẩu 8–128 ký tự, có ít nhất 1 chữ cái và 1 chữ số.';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!isValidUsername(username.trim())) {
      setError('Tên đăng nhập gồm 3–50 ký tự: chữ không dấu, số, dấu chấm, gạch dưới hoặc gạch ngang.');
      return;
    }
    if (!isValidPassword(password)) {
      setError(PASSWORD_RULE);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const session = await container.register({ username: username.trim(), password });
      setSession(session, true);
      navigate('/');
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 409
          ? 'Tên đăng nhập đã tồn tại.'
          : err instanceof ApiError
            ? err.message
            : 'Không thể đăng ký. Vui lòng thử lại.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title={'Bắt đầu\nhành trình học.'} subtitle="Tạo tài khoản dLearning để cùng bé khám phá bảng chữ cái tiếng Việt.">
      <Card>
        <CardHeader>
          <CardTitle>Đăng ký</CardTitle>
          <CardDescription>Chỉ mất một phút để tạo tài khoản.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField label="Tên đăng nhập" value={username} onChange={setUsername} placeholder="minhanh" autoComplete="username" />
            <div className="grid gap-2">
              <FormField label="Mật khẩu" type="password" value={password} onChange={setPassword} placeholder="Ít nhất 8 ký tự" autoComplete="new-password" />
              <p data-testid="password-rule" className="text-sm text-muted-foreground">{PASSWORD_RULE}</p>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? 'Đang tạo tài khoản…' : 'Đăng ký'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          <span>
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-primary-strong hover:underline">Đăng nhập</Link>
          </span>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
