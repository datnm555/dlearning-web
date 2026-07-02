import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import { LetterCard } from '../components/LetterCard';
import { LetterDetail } from '../components/LetterDetail';
import { useAuth } from '../auth/useAuth';

type Status = 'loading' | 'ready' | 'error';

export function AlphabetPage() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [letters, setLetters] = useState<AlphabetLetter[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [selected, setSelected] = useState<number | null>(null);

  const load = useCallback(() => {
    setStatus('loading');
    container
      .getAlphabet()
      .then((data) => {
        setLetters(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F3EF' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 34px', position: 'sticky', top: 0, background: 'rgba(244,243,239,.88)', backdropFilter: 'blur(12px)', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 700, color: '#fff' }}>
            {initials(session?.user.displayName)}
          </div>
          <div>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14 }}>{session?.user.displayName}</div>
            <div style={{ fontSize: 11.5, color: '#8A8A99' }}>Học viên</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ border: '1px solid rgba(27,27,47,.08)', background: '#fff', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#5A5A6B' }}>
          Đăng xuất
        </button>
      </header>

      <main style={{ padding: '6px 34px 60px' }}>
        <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 4px' }}>
          Xin chào, {session?.user.displayName} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#6B6B80', margin: '0 0 24px' }}>Cùng học bảng chữ cái tiếng Việt nhé!</p>

        {status === 'loading' && <p style={{ color: '#6B6B80' }}>Đang tải bảng chữ cái…</p>}

        {status === 'error' && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 14px', borderRadius: 12, display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            Không tải được bảng chữ cái.
            <button onClick={load} style={{ border: 'none', background: '#B91C1C', color: '#fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>Thử lại</button>
          </div>
        )}

        {status === 'ready' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 16 }}>
            {letters.map((letter, index) => (
              <LetterCard key={letter.id} letter={letter} index={index} onClick={() => setSelected(index)} />
            ))}
          </div>
        )}
      </main>

      {selected !== null && letters[selected] && (
        <LetterDetail
          letter={letters[selected]}
          index={selected}
          hasPrev={selected > 0}
          hasNext={selected < letters.length - 1}
          onPrev={() => setSelected((s) => (s === null ? s : Math.max(0, s - 1)))}
          onNext={() => setSelected((s) => (s === null ? s : Math.min(letters.length - 1, s + 1)))}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
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
