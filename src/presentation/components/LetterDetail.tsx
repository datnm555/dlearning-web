import type { CSSProperties } from 'react';
import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import { letterCovers } from '../../styles/tokens';

interface LetterDetailProps {
  letter: AlphabetLetter;
  index: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function LetterDetail({ letter, index, hasPrev, hasNext, onPrev, onNext, onClose }: LetterDetailProps) {
  const cover = letterCovers[index % letterCovers.length];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,10,40,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, overflow: 'hidden', animation: 'fadeUp .3s ease both' }}>
        <div style={{ background: cover, padding: 34, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 72, lineHeight: 1 }}>
            {letter.upperCase}
            {letter.lowerCase}
          </div>
          <div style={{ fontSize: 64, marginTop: 8 }}>{letter.exampleEmoji}</div>
        </div>
        <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#8A8A99', textTransform: 'uppercase', letterSpacing: '.06em' }}>Tên chữ</div>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, margin: '2px 0 16px' }}>{letter.name}</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
            <div style={{ flex: 1, background: '#F4F3FF', borderRadius: 14, padding: 12 }}>
              <div style={{ fontSize: 12, color: '#8A8A99' }}>Cách đọc</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#4F46E5' }}>{letter.sound}</div>
            </div>
            <div style={{ flex: 1, background: '#FFF6EE', borderRadius: 14, padding: 12 }}>
              <div style={{ fontSize: 12, color: '#8A8A99' }}>Ví dụ</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#FF6B4A' }}>{letter.exampleWord}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            <button onClick={onPrev} disabled={!hasPrev} style={navBtnStyle(!hasPrev)}>← Trước</button>
            <button onClick={onClose} style={{ flex: 1, border: 'none', borderRadius: 12, background: 'linear-gradient(135deg,#4F46E5,#6D28D9)', color: '#fff', fontWeight: 700, fontFamily: 'Sora', cursor: 'pointer', padding: 12 }}>Đóng</button>
            <button onClick={onNext} disabled={!hasNext} style={navBtnStyle(!hasNext)}>Sau →</button>
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
