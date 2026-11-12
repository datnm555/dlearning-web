import { useState } from 'react';
import type { ExampleWord } from '../../domain/models/Letter';

/** Picture from the API; falls back to the emoji when there is no image or it fails to load. */
export function ExampleImage({ example }: { example: ExampleWord }) {
  const [failed, setFailed] = useState(false);
  if (example.imagePath && !failed) {
    return (
      <img
        className="kid-pic"
        src={example.imagePath}
        alt={example.text}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="kid-pic kid-pic-emoji" role="img" aria-label={example.text}>
      {example.emoji ?? '🖼️'}
    </span>
  );
}
