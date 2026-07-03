import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import type { Category } from '../../domain/models/Category';
import type { Product } from '../../domain/models/Product';
import { CategoryTabs } from '../components/CategoryTabs';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../auth/useAuth';
import { useI18n } from '../i18n/useI18n';

type Status = 'loading' | 'ready' | 'error';

export function HomePage() {
  const { session, logout } = useAuth();
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string>('preschool');
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [reloadKey, setReloadKey] = useState(0);

  // Categories (the menu) reload only when the language changes.
  useEffect(() => {
    let active = true;
    container.getCategories(lang)
      .then((cats) => { if (active) setCategories(cats); })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [lang]);

  // Products reload when the selected category, language, or retry counter changes.
  useEffect(() => {
    let active = true;
    setStatus('loading');
    container.getProducts(selected, lang)
      .then((prods) => { if (active) { setProducts(prods); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [selected, lang, reloadKey]);

  function openProduct(product: Product) {
    if (product.code === 'alphabet') {
      navigate('/alphabet');
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F3EF' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 34px', position: 'sticky', top: 0, background: 'rgba(244,243,239,.88)', backdropFilter: 'blur(12px)', zIndex: 5 }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20 }}>{t('app.title')}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LanguageSwitcher />
          <button onClick={handleLogout} style={{ border: '1px solid rgba(27,27,47,.08)', background: '#fff', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#5A5A6B' }}>
            {t('common.logout')}
          </button>
        </div>
      </header>

      <main style={{ padding: '6px 34px 60px' }}>
        <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 4px' }}>
          {t('app.greeting', { name: session?.user.displayName ?? '' })}
        </h1>
        <p style={{ fontSize: 14, color: '#6B6B80', margin: '0 0 22px' }}>{t('app.chooseLesson')}</p>

        {categories.length > 0 && (
          <CategoryTabs categories={categories} selected={selected} onSelect={setSelected} />
        )}

        {status === 'loading' && <p style={{ color: '#6B6B80' }}>{t('common.loading')}</p>}

        {status === 'error' && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 14px', borderRadius: 12, display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            {t('common.error')}
            <button onClick={() => setReloadKey((k) => k + 1)} style={{ border: 'none', background: '#B91C1C', color: '#fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>{t('common.retry')}</button>
          </div>
        )}

        {status === 'ready' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
            {products.length === 0
              ? <p style={{ color: '#8A8A99' }}>{t('common.comingSoon')}</p>
              : products.map((p, i) => (
                  <ProductCard key={p.code} product={p} index={i} comingSoonLabel={t('common.comingSoon')} onOpen={() => openProduct(p)} />
                ))}
          </div>
        )}
      </main>
    </div>
  );
}
