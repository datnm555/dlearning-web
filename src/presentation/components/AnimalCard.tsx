import type { Animal } from '../../domain/models/Animal';
import { letterCovers } from '../../styles/tokens';

interface AnimalCardProps {
  animal: Animal;
  index: number;
  onClick: () => void;
}

export function AnimalCard({ animal, index, onClick }: AnimalCardProps) {
  const cover = letterCovers[index % letterCovers.length];
  return (
    <button
      onClick={onClick}
      style={{ textAlign: 'left', border: '1px solid rgba(27,27,47,.06)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', background: '#fff', padding: 0 }}
    >
      <div style={{ height: 96, background: cover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        {animal.emoji}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15 }}>{animal.name}</div>
        <div style={{ fontSize: 12, color: '#8A8A99', marginTop: 2 }}>🔊 {animal.sound}</div>
      </div>
    </button>
  );
}
