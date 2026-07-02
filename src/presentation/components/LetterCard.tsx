import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import { letterCovers } from '../../styles/tokens';

interface LetterCardProps {
  letter: AlphabetLetter;
  index: number;
  onClick: () => void;
}

export function LetterCard({ letter, index, onClick }: LetterCardProps) {
  const cover = letterCovers[index % letterCovers.length];
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
      <div style={{ height: 96, background: cover, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 40, color: 'rgba(255,255,255,.95)' }}>
          {letter.upperCase}
          {letter.lowerCase}
        </span>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>{letter.exampleEmoji}</div>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14.5 }}>{letter.exampleWord}</div>
        <div style={{ fontSize: 12, color: '#8A8A99', marginTop: 2 }}>đọc là “{letter.sound}”</div>
      </div>
    </button>
  );
}
