import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const DECOR = [['A', 'bg-tile-3'], ['Ă', 'bg-tile-4'], ['Â', 'bg-tile-5'], ['B', 'bg-tile-6']] as const;

/** Shared frame for login/register: pastel brand pane (hidden on small screens) + form column. */
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="relative hidden w-[46%] min-w-80 flex-col justify-between overflow-hidden bg-gradient-to-br from-tile-5 via-tile-2 to-tile-1 p-12 text-ink md:flex">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-white/70 text-xl font-extrabold">A</span>
          <span className="text-2xl font-extrabold">dLearning</span>
        </div>
        <div>
          <h1 className="mb-3 text-5xl leading-[1.05] font-extrabold whitespace-pre-line">{title}</h1>
          <p className="max-w-sm text-base leading-relaxed text-ink/80">{subtitle}</p>
        </div>
        <div aria-hidden="true" className="flex gap-3 text-5xl font-extrabold select-none">
          {DECOR.map(([c, tone]) => (
            <span key={c} className={`grid size-16 place-items-center rounded-3xl shadow-pop-sm ${tone}`}>{c}</span>
          ))}
        </div>
      </aside>
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md animate-rise motion-reduce:animate-none">{children}</div>
      </main>
    </div>
  );
}
