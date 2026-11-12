import { Link, useOutletContext } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { StatusView } from './StatusView';
import type { KidOutletContext } from './KidLayout';
import { toneFor } from './tones';

export function AlphabetGridPage() {
  const { letters, status, reload } = useOutletContext<KidOutletContext>();
  const { t } = useI18n();

  if (status !== 'ready') {
    return <StatusView status={status} reload={reload} />;
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] sm:gap-4" aria-label={t('kids.alphabet')}>
      {letters.map((l, i) => (
        <li key={l.id}>
          <Link to={`/letter/${l.id}`} className={`flex min-h-26 items-baseline justify-center gap-1.5 rounded-[1.75rem] border-[3px] border-ink pt-3.5 text-ink no-underline shadow-pop transition-transform duration-150 outline-none hover:-translate-y-1 hover:scale-105 active:translate-y-1 active:scale-95 active:shadow-pop-sm focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:active:transform-none ${toneFor(i)}`} aria-label={`${l.upperCase} ${l.lowerCase}`}>
            <span className="text-5xl leading-none font-extrabold sm:text-6xl">{l.upperCase}</span>
            <span className="text-4xl leading-none font-bold sm:text-5xl">{l.lowerCase}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
