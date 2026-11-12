import { splitHighlight } from './highlight';

export function HighlightedWord({ text, start }: { text: string; start: number }) {
  const { before, highlight, after } = splitHighlight(text, start);
  return (
    <span className="kid-word" aria-label={text}>
      {before}
      {highlight && <mark className="kid-word-hl">{highlight}</mark>}
      {after}
    </span>
  );
}
