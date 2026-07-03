import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider } from './LanguageProvider';
import { useI18n } from './useI18n';

function Probe() {
  const { lang, setLang, t } = useI18n();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t('app.chooseLesson')}</span>
      <button onClick={() => setLang('en')}>en</button>
    </div>
  );
}

describe('useI18n', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to vi and translates, switches + persists on setLang', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('vi');
    expect(screen.getByTestId('title').textContent).toBe('Chọn bài học');

    act(() => { screen.getByText('en').click(); });
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('title').textContent).toBe('Choose a lesson');
    expect(localStorage.getItem('dlearning.lang')).toBe('en');
  });
});
