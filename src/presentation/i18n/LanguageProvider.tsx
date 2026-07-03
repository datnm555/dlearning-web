import { useCallback, useMemo, useState, type ReactNode } from 'react';
import en from '../../i18n/en.json';
import vi from '../../i18n/vi.json';
import { LanguageContext, type Lang, type LanguageContextValue } from './LanguageContext';

const KEY = 'dlearning.lang';
const catalogs: Record<Lang, Record<string, string>> = { en, vi };

function initialLang(): Lang {
  const saved = localStorage.getItem(KEY);
  return saved === 'en' || saved === 'vi' ? saved : 'vi';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem(KEY, next);
    setLangState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let text = catalogs[lang][key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(`{${k}}`, v);
        }
      }
      return text;
    },
    [lang],
  );

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
