import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { LetterCardView } from './LetterCardView';
import { StatusView } from './StatusView';
import type { KidOutletContext } from './KidLayout';
import { toneFor } from './tones';

export function LetterCardPage() {
  const { id } = useParams();
  const { letters, status, reload } = useOutletContext<KidOutletContext>();
  const { t } = useI18n();
  const navigate = useNavigate();

  if (status !== 'ready') {
    return <StatusView status={status} reload={reload} />;
  }
  const index = letters.findIndex((l) => l.id === id);
  if (index < 0) {
    return <Navigate to="/" replace />;
  }
  const go = (i: number) => navigate(`/letter/${letters[i].id}`, { replace: true });

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${toneFor(index)}`}>
      <LetterCardView
        letter={letters[index]}
        hasPrev={index > 0}
        hasNext={index < letters.length - 1}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onClose={() => navigate('/')}
        labels={{ prev: t('kids.prev'), next: t('kids.next'), back: t('kids.back') }}
      />
    </div>
  );
}
