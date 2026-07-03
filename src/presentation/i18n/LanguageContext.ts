import { createContext } from 'react';

export type Lang = 'en' | 'vi';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
