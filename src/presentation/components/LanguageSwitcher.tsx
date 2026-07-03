import { useI18n } from '../i18n/useI18n';
import type { Lang } from '../i18n/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const options: Lang[] = ['vi', 'en'];
  return (
    <div style={{ display: 'inline-flex', border: '1px solid #E4E2EC', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      {options.map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{
            border: 'none',
            cursor: 'pointer',
            padding: '6px 12px',
            fontSize: 13,
            fontWeight: 600,
            background: lang === code ? '#4F46E5' : 'transparent',
            color: lang === code ? '#fff' : '#6B6B80',
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
