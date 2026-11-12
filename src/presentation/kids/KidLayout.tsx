import { Outlet, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useAuth } from '../auth/useAuth';
import { useI18n } from '../i18n/useI18n';
import { useLetters, type LettersState } from './useLetters';

export type KidOutletContext = LettersState;

export function KidLayout() {
  const { logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const state = useLetters();

  return (
    <div className="kid-app">
      <header className="kid-header">
        <span className="kid-logo">ABC</span>
        <div className="kid-header-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="kid-btn kid-logout"
            aria-label={t('common.logout')}
            onClick={() => { logout(); navigate('/login'); }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>
      <main className="kid-main">
        <Outlet context={state satisfies KidOutletContext} />
      </main>
    </div>
  );
}
