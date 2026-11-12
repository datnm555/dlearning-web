import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import { ApiError } from '../../infrastructure/http/ApiError';
import { Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { useAuth } from '../auth/useAuth';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const session = await container.login({ username: username.trim(), password });
      setSession(session, remember);
      navigate('/');
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? 'Sai tên đăng nhập hoặc mật khẩu.'
          : err instanceof ApiError
            ? err.message
            : 'Không thể đăng nhập. Vui lòng thử lại.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title={'Học tập\nkhông giới hạn.'} subtitle="Nền tảng học trực tuyến đồng hành cùng mọi hành trình tri thức của bạn.">
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Chào mừng bạn quay lại dLearning.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField label="Tên đăng nhập" value={username} onChange={setUsername} placeholder="sam" autoComplete="username" />

            <FormField
              label="Mật khẩu"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="current-password"
              trailing={
                <Button type="button" variant="ghost" size="icon" className="size-10" onClick={() => setShowPass((s) => !s)} aria-label="Hiện mật khẩu">
                  {showPass ? <EyeOff /> : <Eye />}
                </Button>
              }
            />

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="size-4 accent-primary-strong" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Ghi nhớ đăng nhập
            </label>

            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
            </Button>

            <p data-testid="demo-hint" className="text-center text-sm text-muted-foreground">
              Tài khoản demo: <strong>sam</strong> / <strong>1</strong>
            </p>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          <span>
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-primary-strong hover:underline">Đăng ký ngay</Link>
          </span>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
