import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import type { Product } from '../../domain/models/Product';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../auth/useAuth';
import { useI18n } from '../i18n/useI18n';

type Status = 'loading' | 'ready' | 'error';

export function HomePage() {
  const { session } = useAuth();
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    container.getProducts('preschool', lang)
      .then((items) => { if (active) { setProducts(items); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [lang, reloadKey]);

  function openProduct(product: Product) {
    if (product.isAvailable) {
      navigate(`/${product.code}`);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 4px' }}>
        {t('app.greeting', { name: session?.user.username ?? '' })}
      </h1>
      <p style={{ fontSize: 14, color: '#6B6B80', margin: '0 0 24px' }}>{t('app.chooseLesson')}</p>

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 22, background: 'linear-gradient(120deg,#4F46E5,#6D28D9 60%,#7C3AED)', color: '#fff', padding: '30px 34px', marginBottom: 26 }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18 }}>
          <div style={{ maxWidth: 420 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,.16)', padding: '5px 11px', borderRadius: 20, marginBottom: 13 }}>
              {t('home.continue')}
            </span>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 26, letterSpacing: '-.02em', margin: 0, lineHeight: 1.15 }}>🔤 ABC</h2>
          </div>
          <button
            onClick={() => navigate('/alphabet')}
            style={{ border: 'none', borderRadius: 13, background: '#fff', color: '#4F46E5', fontFamily: 'Sora', fontWeight: 700, fontSize: 14, padding: '13px 24px', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 10px 24px -10px rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#4F46E5"><path d="M8 5v14l11-7z" /></svg>
            {t('home.startNow')}
          </button>
        </div>
      </div>

      <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, margin: '0 0 16px' }}>{t('home.yourLessons')}</h3>

      {status === 'loading' && <p style={{ color: '#6B6B80' }}>{t('common.loading')}</p>}

      {status === 'error' && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 14px', borderRadius: 12, display: 'inline-flex', gap: 12, alignItems: 'center' }}>
          {t('common.error')}
          <button onClick={() => setReloadKey((k) => k + 1)} style={{ border: 'none', background: '#B91C1C', color: '#fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>{t('common.retry')}</button>
        </div>
      )}

      {status === 'ready' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16 }}>
          {products.map((product, index) => (
            <ProductCard key={product.code} product={product} index={index} comingSoonLabel={t('common.comingSoon')} onOpen={() => openProduct(product)} />
          ))}
        </div>
      )}
    </div>
  );
}
