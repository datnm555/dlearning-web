import type { CSSProperties } from 'react';
import type { Animal } from '../../domain/models/Animal';
import { letterCovers } from '../../styles/tokens';

interface AnimalDetailProps {
  animal: Animal;
  index: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function AnimalDetail({ animal, index, hasPrev, hasNext, onPrev, onNext, onClose }: AnimalDetailProps) {
  const cover = letterCovers[index % letterCovers.length];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,10,40,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, overflow: 'hidden', animation: 'fadeUp .3s ease both' }}>
        <div style={{ background: cover, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 96, lineHeight: 1 }}>{animal.emoji}</div>
        </div>
        <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 26, margin: '0 0 6px' }}>{animal.name}</div>
          <div style={{ fontSize: 17, color: '#4F46E5', fontWeight: 600, marginBottom: 18 }}>🔊 {animal.sound}</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            <button onClick={onPrev} disabled={!hasPrev} style={navBtnStyle(!hasPrev)}>← Prev</button>
            <button onClick={onClose} style={{ flex: 1, border: 'none', borderRadius: 12, background: 'linear-gradient(135deg,#4F46E5,#6D28D9)', color: '#fff', fontWeight: 700, fontFamily: 'Sora', cursor: 'pointer', padding: 12 }}>OK</button>
            <button onClick={onNext} disabled={!hasNext} style={navBtnStyle(!hasNext)}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function navBtnStyle(disabled: boolean): CSSProperties {
  return {
    border: '1.5px solid #E4E2EC',
    borderRadius: 12,
    background: '#fff',
    padding: '12px 14px',
    cursor: disabled ? 'default' : 'pointer',
    fontWeight: 600,
    color: disabled ? '#C8C5D6' : '#3A3A4D',
    opacity: disabled ? 0.6 : 1,
  };
}
