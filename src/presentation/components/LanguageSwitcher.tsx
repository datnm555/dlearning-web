import { Button } from '@/components/ui/button';
import { useI18n } from '../i18n/useI18n';
import type { Lang } from '../i18n/LanguageContext';

const OPTIONS: Lang[] = ['vi', 'en'];

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div role="group" aria-label="Language" className="inline-flex gap-1 rounded-2xl border bg-card p-1">
      {OPTIONS.map((code) => (
        <Button
          key={code}
          type="button"
          size="sm"
          variant={lang === code ? 'default' : 'ghost'}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
