import type { CountingNumber } from '../../domain/models/CountingNumber';
import { letterCovers } from '../../styles/tokens';

interface NumberCardProps {
  number: CountingNumber;
  index: number;
  onClick: () => void;
}

export function NumberCard({ number, index, onClick }: NumberCardProps) {
  const cover = letterCovers[index % letterCovers.length];
  return (
    <button
      onClick={onClick}
      style={{ textAlign: 'left', border: '1px solid rgba(27,27,47,.06)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', background: '#fff', padding: 0 }}
    >
      <div style={{ height: 96, background: cover, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 48, color: 'rgba(255,255,255,.95)' }}>{number.value}</span>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15 }}>{number.word}</div>
        <div style={{ fontSize: 14, marginTop: 4, letterSpacing: 2, overflowWrap: 'anywhere' }}>{number.emoji.repeat(number.value)}</div>
      </div>
    </button>
  );
}
