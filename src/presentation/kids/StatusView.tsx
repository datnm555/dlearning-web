import { useI18n } from '../i18n/useI18n';

export function StatusView({ status, reload }: { status: 'loading' | 'error'; reload: () => void }) {
  const { t } = useI18n();
  if (status === 'loading') {
    return <p className="kid-status" role="status">{t('common.loading')}</p>;
  }
  return (
    <div className="kid-status" role="alert">
      <p>{t('common.error')}</p>
      <button type="button" className="kid-btn kid-retry" onClick={reload}>↻ {t('common.retry')}</button>
    </div>
  );
}
