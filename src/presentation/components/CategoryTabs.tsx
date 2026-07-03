import type { Category } from '../../domain/models/Category';

interface CategoryTabsProps {
  categories: Category[];
  selected: string;
  onSelect: (code: string) => void;
}

export function CategoryTabs({ categories, selected, onSelect }: CategoryTabsProps) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
      {categories.map((c) => {
        const active = c.code === selected;
        return (
          <button
            key={c.code}
            onClick={() => onSelect(c.code)}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: '10px 16px',
              borderRadius: 999,
              fontFamily: 'Sora',
              fontWeight: 700,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: active ? 'linear-gradient(135deg,#4F46E5,#6D28D9)' : '#fff',
              color: active ? '#fff' : '#5A5A6B',
              boxShadow: active ? '0 10px 22px -12px rgba(79,70,229,.7)' : 'none',
            }}
          >
            <span>{c.iconKey}</span>
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
