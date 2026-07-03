import { useEffect, useState } from 'react';
import { container } from '../../di/container';
import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import { LetterCard } from '../components/LetterCard';
import { LetterDetail } from '../components/LetterDetail';
import { useI18n } from '../i18n/useI18n';

type Status = 'loading' | 'ready' | 'error';

export function AlphabetPage() {
  const { t } = useI18n();
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
    <div>
      <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 22px' }}>
        {t('lesson.alphabet')}
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
