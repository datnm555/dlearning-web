import { useState } from 'react';
import type { ExampleWord } from '../../domain/models/Letter';

/** Picture from the API; falls back to the emoji when there is no image or it fails to load. */
export function ExampleImage({ example }: { example: ExampleWord }) {
  const [failed, setFailed] = useState(false);
  if (example.imagePath && !failed) {
    return (
      <img
        className="aspect-square w-full max-w-50 object-contain"
        src={example.imagePath}
        alt={example.text}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="flex aspect-square w-full max-w-50 items-center justify-center text-[6.5rem] leading-none" role="img" aria-label={example.text}>
      {example.emoji ?? '🖼️'}
    </span>
  );
}
