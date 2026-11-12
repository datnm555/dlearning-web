import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-dvh bg-kid-bg text-ink">
      <header className="flex items-center justify-between gap-3 px-4 py-2.5">
        <span className="rounded-full bg-tile-6 px-4.5 py-0.5 text-3xl font-extrabold tracking-wide max-sm:text-2xl">ABC</span>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={t('common.logout')}
            onClick={() => { logout(); navigate('/login'); }}
          >
            <LogOut className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-275 px-4 pt-2 pb-8">
        <Outlet context={state satisfies KidOutletContext} />
      </main>
    </div>
  );
}
