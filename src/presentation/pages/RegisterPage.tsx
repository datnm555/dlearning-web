import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import { ApiError } from '../../infrastructure/http/ApiError';
import { BrandPane } from '../components/BrandPane';
import { PrimaryButton } from '../components/PrimaryButton';
import { TextField } from '../components/TextField';
import { useAuth } from '../auth/useAuth';

export function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!displayName.trim() || !email.trim() || !username.trim() || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const session = await container.register({ email, username, displayName, password });
      setSession(session, true);
      navigate('/');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Không thể đăng ký. Vui lòng thử lại.');
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

          <TextField label="Tên hiển thị" value={displayName} onChange={setDisplayName} placeholder="Bé Minh Anh" />
          <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <TextField label="Tên đăng nhập" value={username} onChange={setUsername} placeholder="minhanh (3–30 ký tự, chữ và số)" />
          <TextField label="Mật khẩu" type="password" value={password} onChange={setPassword} placeholder="Ít nhất 8 ký tự" />

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
