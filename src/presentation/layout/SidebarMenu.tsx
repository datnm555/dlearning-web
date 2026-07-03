import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { container } from '../../di/container';
import type { Category } from '../../domain/models/Category';
import type { Product } from '../../domain/models/Product';
import { useI18n } from '../i18n/useI18n';

export function SidebarMenu() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<string>('preschool');
  const [products, setProducts] = useState<Record<string, Product[]>>({});

  const activeCode = location.pathname.replace(/^\//, '');

  useEffect(() => {
    let alive = true;
    container.getCategories(lang)
      .then((cats) => { if (alive) setCategories(cats); })
      .catch(() => { /* sidebar stays empty; body pages surface errors */ });
    setProducts({});
    return () => { alive = false; };
  }, [lang]);

  useEffect(() => {
    if (!expanded || products[expanded]) {
      return;
    }
    let alive = true;
    container.getProducts(expanded, lang)
      .then((items) => { if (alive) setProducts((prev) => ({ ...prev, [expanded]: items })); })
      .catch(() => { /* keep section collapsed-looking on failure */ });
    return () => { alive = false; };
  }, [expanded, lang, products]);

  return (
    <nav style={{ width: 250, flex: 'none', background: '#fff', borderRight: '1px solid rgba(27,27,47,.07)', overflowY: 'auto', padding: '18px 12px' }}>
      {categories.map((category) => {
        const isOpen = category.code === expanded;
        const items = products[category.code] ?? [];
        return (
          <div key={category.code} style={{ marginBottom: 6 }}>
            <button
              onClick={() => setExpanded(category.code)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: isOpen ? '#F7F7FB' : 'transparent', borderRadius: 14, padding: '11px 12px', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 18 }}>{category.iconKey}</span>
              <span style={{ flex: 1, fontFamily: 'Sora', fontWeight: 700, fontSize: 13.5, color: '#1B1B2F' }}>{category.name}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
                <path d="M6 9l6 6 6-6" stroke="#A6A6B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isOpen && (
              <div style={{ padding: '4px 0 4px 8px' }}>
                {items.length === 0 && (
                  <div style={{ fontSize: 12, color: '#9A9AA8', padding: '8px 12px' }}>{t('common.comingSoon')}</div>
                )}
                {items.map((product) => {
                  const active = product.code === activeCode;
                  const disabled = !product.isAvailable;
                  return (
                    <button
                      key={product.code}
                      onClick={disabled ? undefined : () => navigate(`/${product.code}`)}
                      disabled={disabled}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        border: 'none',
                        borderRadius: 14,
                        padding: '9px 12px',
                        cursor: disabled ? 'default' : 'pointer',
                        textAlign: 'left',
                        background: active ? '#EEF0FE' : 'transparent',
                        opacity: disabled ? 0.55 : 1,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{product.iconKey}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: active ? '#4F46E5' : '#5A5A6B' }}>{product.name}</span>
                      {disabled && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#9A9AA8', background: '#F1F0F6', borderRadius: 999, padding: '2px 7px' }}>{t('common.comingSoon')}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
