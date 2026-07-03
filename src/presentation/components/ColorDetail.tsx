import type { CSSProperties } from 'react';
import type { Color } from '../../domain/models/Color';

interface ColorDetailProps {
  color: Color;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function ColorDetail({ color, hasPrev, hasNext, onPrev, onNext, onClose }: ColorDetailProps) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,10,40,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, overflow: 'hidden', animation: 'fadeUp .3s ease both' }}>
        <div style={{ background: color.hexValue, borderBottom: '1px solid rgba(0,0,0,.08)', padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 84, lineHeight: 1 }}>{color.exampleEmoji}</div>
        </div>
        <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#8A8A99', textTransform: 'uppercase', letterSpacing: '.06em' }}>{color.hexValue}</div>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 26, margin: '4px 0 6px' }}>{color.name}</div>
          <div style={{ fontSize: 15, color: '#6B6B80', marginBottom: 18 }}>{color.exampleEmoji} {color.exampleWord}</div>
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
