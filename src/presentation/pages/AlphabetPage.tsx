import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { LetterCard } from '../components/LetterCard';
import { LetterDetail } from '../components/LetterDetail';
import { useI18n } from '../i18n/useI18n';

type Status = 'loading' | 'ready' | 'error';

export function AlphabetPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [letters, setLetters] = useState<AlphabetLetter[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [selected, setSelected] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    container.getAlphabet()
      .then((data) => { if (active) { setLetters(data); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [reloadKey]);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F3EF' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 34px', position: 'sticky', top: 0, background: 'rgba(244,243,239,.88)', backdropFilter: 'blur(12px)', zIndex: 5 }}>
        <button onClick={() => navigate('/')} style={{ border: '1px solid rgba(27,27,47,.08)', background: '#fff', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#5A5A6B' }}>
          ← {t('app.title')}
        </button>
        <LanguageSwitcher />
      </header>

      <main style={{ padding: '6px 34px 60px' }}>
        <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 22px' }}>
          {t('app.chooseLesson')}
        </h1>

        {status === 'loading' && <p style={{ color: '#6B6B80' }}>{t('common.loading')}</p>}

        {status === 'error' && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 14px', borderRadius: 12, display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            {t('common.error')}
            <button onClick={() => setReloadKey((k) => k + 1)} style={{ border: 'none', background: '#B91C1C', color: '#fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>{t('common.retry')}</button>
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
