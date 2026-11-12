import { Link, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useAuth } from '../auth/useAuth';
import { useI18n } from '../i18n/useI18n';

export function AppHeader() {
  const { session, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', background: 'rgba(244,243,239,.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(27,27,47,.07)', flex: 'none' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: '#1B1B2F' }}>
        <span style={{ width: 42, height: 42, borderRadius: 12, background: '#EEF0FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L2 8l10 5 10-5-10-5z" fill="#4F46E5" />
            <path d="M5 11v4.5c0 1 3 2.5 7 2.5s7-1.5 7-2.5V11" stroke="#4F46E5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
        </span>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, letterSpacing: '-.02em' }}>{t('app.title')}</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LanguageSwitcher />
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#fff', boxShadow: '0 6px 16px -6px rgba(79,70,229,.6)' }}>
            {initials(session?.user.username)}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{session?.user.username}</div>
            <div style={{ fontSize: 11.5, color: '#8A8A99' }}>Học viên</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ border: '1px solid rgba(27,27,47,.08)', background: '#fff', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#5A5A6B' }}>
          {t('common.logout')}
        </button>
      </div>
    </header>
  );
}

function initials(name?: string): string {
  if (!name) {
    return '🙂';
  }
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}
