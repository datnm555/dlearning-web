import { splitHighlight } from './highlight';

export function HighlightedWord({ text, start }: { text: string; start: number }) {
  const { before, highlight, after } = splitHighlight(text, start);
  return (
    <span data-testid="kid-word" className="text-center font-letter text-3xl font-bold text-ink sm:text-4xl" aria-label={text}>
      {before}
      {highlight && <mark className="bg-transparent font-extrabold text-hl">{highlight}</mark>}
      {after}
    </span>
  );
}
