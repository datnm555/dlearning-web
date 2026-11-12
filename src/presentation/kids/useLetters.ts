import { useCallback, useEffect, useState } from 'react';
import { container } from '../../di/container';
import type { Letter } from '../../domain/models/Letter';

export type LettersStatus = 'loading' | 'ready' | 'error';

export interface LettersState {
  letters: Letter[];
  status: LettersStatus;
  reload: () => void;
}

export function useLetters(): LettersState {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [status, setStatus] = useState<LettersStatus>('loading');
  const [key, setKey] = useState(0);

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    container.getAlphabet()
      .then((items) => { if (alive) { setLetters(items); setStatus('ready'); } })
      .catch(() => { if (alive) setStatus('error'); });
    return () => { alive = false; };
  }, [key]);

  const reload = useCallback(() => setKey((k) => k + 1), []);
  return { letters, status, reload };
}
