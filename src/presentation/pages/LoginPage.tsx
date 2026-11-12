import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import { ApiError } from '../../infrastructure/http/ApiError';
import { BrandPane } from '../components/BrandPane';
import { PrimaryButton } from '../components/PrimaryButton';
import { TextField } from '../components/TextField';
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
    <div className="auth-shell">
      <BrandPane
        title={'Học tập\nkhông giới hạn.'}
        subtitle="Nền tảng học trực tuyến đồng hành cùng mọi hành trình tri thức của bạn."
      />
      <div className="auth-form">
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, animation: 'fadeUp .5s ease both' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 6px' }}>Đăng nhập</h2>
          <p style={{ fontSize: 14, color: '#6B6B80', margin: '0 0 26px' }}>Chào mừng bạn quay lại dLearning.</p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: 12.5, fontWeight: 500, padding: '10px 12px', borderRadius: 11, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <TextField
            label="Tên đăng nhập"
            value={username}
            onChange={setUsername}
            placeholder="sam"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#A6A6B5" strokeWidth="1.6" />
                <path d="M4 20c1-4 4-6 8-6s7 2 8 6" stroke="#A6A6B5" strokeWidth="1.6" />
              </svg>
            }
          />

          <TextField
            label="Mật khẩu"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="#A6A6B5" strokeWidth="1.6" />
                <path d="M8 10V7a4 4 0 018 0v3" stroke="#A6A6B5" strokeWidth="1.6" />
              </svg>
            }
            trailing={
              <button type="button" onClick={() => setShowPass((s) => !s)} aria-label="Hiện mật khẩu" style={{ width: 34, height: 34, border: 'none', background: 'none', cursor: 'pointer', color: '#A6A6B5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            }
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '6px 0 22px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#5A5A6B' }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Ghi nhớ đăng nhập
            </label>
          </div>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </PrimaryButton>

          <p data-testid="demo-hint" style={{ textAlign: 'center', fontSize: 13, color: '#6B6B80', margin: '18px 0 0' }}>
            Tài khoản demo: <strong>sam</strong> / <strong>1</strong>
          </p>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B6B80', margin: '24px 0 0' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ fontWeight: 700, color: '#4F46E5', textDecoration: 'none' }}>Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
