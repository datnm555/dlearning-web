import { Link, useOutletContext } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { StatusView } from './StatusView';
import type { KidOutletContext } from './KidLayout';

export function AlphabetGridPage() {
  const { letters, status, reload } = useOutletContext<KidOutletContext>();
  const { t } = useI18n();

  if (status !== 'ready') {
    return <StatusView status={status} reload={reload} />;
  }
  return (
    <ul className="kid-grid" aria-label={t('kids.alphabet')}>
      {letters.map((l, i) => (
        <li key={l.id}>
          <Link to={`/letter/${l.id}`} className={`kid-tile kid-tone-${i % 6}`} aria-label={`${l.upperCase} ${l.lowerCase}`}>
            <span className="kid-tile-up">{l.upperCase}</span>
            <span className="kid-tile-low">{l.lowerCase}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
