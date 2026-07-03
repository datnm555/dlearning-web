import type { Color } from '../../domain/models/Color';

interface ColorCardProps {
  color: Color;
  onClick: () => void;
}

export function ColorCard({ color, onClick }: ColorCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        border: '1px solid rgba(27,27,47,.06)',
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#fff',
        padding: 0,
      }}
    >
      <div
        style={{
          height: 96,
          background: color.hexValue,
          border: '1px solid rgba(0,0,0,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
        }}
      >
        {color.exampleEmoji}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15 }}>{color.name}</div>
        <div style={{ fontSize: 12, color: '#8A8A99', marginTop: 2 }}>{color.exampleWord}</div>
      </div>
    </button>
  );
}
