import { useEffect, useRef } from 'react';
import type { Letter } from '../../domain/models/Letter';
import { ExampleImage } from './ExampleImage';
import { HighlightedWord } from './HighlightedWord';
import { KID_BTN } from './kidClasses';
import { swipeDirection } from './swipe';

interface Props {
  letter: Letter;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  labels: { prev: string; next: string; back: string };
}

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function LetterCardView({ letter, hasPrev, hasNext, onPrev, onNext, onClose, labels }: Props) {
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      else if (e.key === 'ArrowRight' && hasNext) onNext();
      else if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasPrev, hasNext, onPrev, onNext, onClose]);

  const examples = [...letter.examples].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section
      className="relative flex min-h-full touch-pan-y flex-col items-center px-4 pt-4 pb-32 text-ink"
      data-testid="letter-card"
      onTouchStart={(e) => {
        const t = e.touches[0];
        start.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        if (!start.current) return;
        const t = e.changedTouches[0];
        const dir = swipeDirection(t.clientX - start.current.x, t.clientY - start.current.y);
        start.current = null;
        if (dir === 'next' && hasNext) onNext();
        if (dir === 'prev' && hasPrev) onPrev();
      }}
    >
      <button type="button" className={`${KID_BTN} absolute top-4 left-4`} onClick={onClose} aria-label={labels.back}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
          <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" />
          <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" />
          <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" />
        </svg>
      </button>

      <div className="flex w-full max-w-4xl flex-col items-center gap-3">
        <h1 className="mt-2 font-letter text-[clamp(5.5rem,22vw,12rem)] leading-[1.05] font-bold" aria-label={`${letter.upperCase} ${letter.lowerCase}`}>
          <span>{letter.upperCase}</span> <span>{letter.lowerCase}</span>
        </h1>

        <ul className="flex w-full flex-wrap justify-center gap-4">
          {examples.map((ex) => (
            <li key={ex.id} className="flex w-full flex-col items-center gap-1.5 rounded-[1.75rem] border-[3px] border-ink bg-white px-4 py-3.5 sm:w-65">
              <ExampleImage example={ex} />
              <HighlightedWord text={ex.text} start={ex.highlightStart} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className={`${KID_BTN} fixed bottom-5 left-5 size-21 rounded-full`} onClick={onPrev} disabled={!hasPrev} aria-label={labels.prev}>
        <Arrow dir="left" />
      </button>
      <button type="button" className={`${KID_BTN} fixed right-5 bottom-5 size-21 rounded-full`} onClick={onNext} disabled={!hasNext} aria-label={labels.next}>
        <Arrow dir="right" />
      </button>
    </section>
  );
}
