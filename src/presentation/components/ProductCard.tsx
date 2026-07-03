import type { Product } from '../../domain/models/Product';
import { letterCovers } from '../../styles/tokens';

interface ProductCardProps {
  product: Product;
  index: number;
  comingSoonLabel: string;
  onOpen: () => void;
}

export function ProductCard({ product, index, comingSoonLabel, onOpen }: ProductCardProps) {
  const cover = letterCovers[index % letterCovers.length];
  const disabled = !product.isAvailable;
  return (
    <button
      onClick={disabled ? undefined : onOpen}
      disabled={disabled}
      style={{
        position: 'relative',
        textAlign: 'left',
        border: '1px solid rgba(27,27,47,.06)',
        borderRadius: 18,
        overflow: 'hidden',
        cursor: disabled ? 'default' : 'pointer',
        background: '#fff',
        padding: 0,
        opacity: disabled ? 0.72 : 1,
      }}
    >
      <div style={{ height: 96, background: cover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>
        {product.iconKey}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15 }}>{product.name}</div>
        {disabled && (
          <div style={{ marginTop: 6, display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#8A8A99', background: '#F1F0F6', borderRadius: 999, padding: '3px 9px' }}>
            {comingSoonLabel}
          </div>
        )}
      </div>
    </button>
  );
}
