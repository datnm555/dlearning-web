import { KID_BTN } from './kidClasses';
import { useI18n } from '../i18n/useI18n';

export function StatusView({ status, reload }: { status: 'loading' | 'error'; reload: () => void }) {
  const { t } = useI18n();
  if (status === 'loading') {
    return <p className="py-12 text-center text-2xl font-bold" role="status">{t('common.loading')}</p>;
  }
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center text-2xl font-bold" role="alert">
      <p>{t('common.error')}</p>
      <button type="button" className={`${KID_BTN} bg-secondary px-7`} onClick={reload}>↻ {t('common.retry')}</button>
    </div>
  );
}
