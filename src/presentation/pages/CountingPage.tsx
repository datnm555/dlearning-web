import { useEffect, useState } from 'react';
import { container } from '../../di/container';
import type { CountingNumber } from '../../domain/models/CountingNumber';
import { NumberCard } from '../components/NumberCard';
import { NumberDetail } from '../components/NumberDetail';
import { useI18n } from '../i18n/useI18n';

type Status = 'loading' | 'ready' | 'error';

export function CountingPage() {
  const { lang, t } = useI18n();
  const [numbers, setNumbers] = useState<CountingNumber[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [selected, setSelected] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    container.getCounting(lang)
      .then((data) => { if (active) { setNumbers(data); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [lang, reloadKey]);

  return (
    <div>
      <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 22px' }}>
        {t('lesson.counting')}
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
          {numbers.map((number, index) => (
            <NumberCard key={number.value} number={number} index={index} onClick={() => setSelected(index)} />
          ))}
        </div>
      )}

      {selected !== null && numbers[selected] && (
        <NumberDetail
          number={numbers[selected]}
          index={selected}
          hasPrev={selected > 0}
          hasNext={selected < numbers.length - 1}
          onPrev={() => setSelected((s) => (s === null ? s : Math.max(0, s - 1)))}
          onNext={() => setSelected((s) => (s === null ? s : Math.min(numbers.length - 1, s + 1)))}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
