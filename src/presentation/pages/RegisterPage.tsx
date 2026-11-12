import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import { isValidPassword, isValidUsername } from '../../application/usecases/passwordRule';
import { ApiError } from '../../infrastructure/http/ApiError';
import { BrandPane } from '../components/BrandPane';
import { PrimaryButton } from '../components/PrimaryButton';
import { TextField } from '../components/TextField';
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
    <div className="auth-shell">
      <BrandPane
        title={'Bắt đầu\nhành trình học.'}
        subtitle="Tạo tài khoản dLearning để cùng bé khám phá bảng chữ cái tiếng Việt."
      />
      <div className="auth-form">
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, animation: 'fadeUp .5s ease both' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 6px' }}>Đăng ký</h2>
          <p style={{ fontSize: 14, color: '#6B6B80', margin: '0 0 26px' }}>Chỉ mất một phút để tạo tài khoản.</p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: 12.5, fontWeight: 500, padding: '10px 12px', borderRadius: 11, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <TextField label="Tên đăng nhập" value={username} onChange={setUsername} placeholder="minhanh" />
          <TextField label="Mật khẩu" type="password" value={password} onChange={setPassword} placeholder="Ít nhất 8 ký tự" />
          <p data-testid="password-rule" style={{ fontSize: 12.5, color: '#6B6B80', margin: '-8px 0 6px' }}>{PASSWORD_RULE}</p>

          <div style={{ height: 6 }} />
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang tạo tài khoản…' : 'Đăng ký'}
          </PrimaryButton>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B6B80', margin: '24px 0 0' }}>
            Đã có tài khoản?{' '}
            <Link to="/login" style={{ fontWeight: 700, color: '#4F46E5', textDecoration: 'none' }}>Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
