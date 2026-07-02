import { brandGradient } from '../../styles/tokens';

export function BrandPane({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="auth-brand"
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        background: brandGradient,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 44px',
        width: '46%',
        minWidth: 320,
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L2 8l10 5 10-5-10-5z" fill="#fff" />
            <path d="M5 11v4.5c0 1 3 2.5 7 2.5s7-1.5 7-2.5V11" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, letterSpacing: '-.02em' }}>dLearning</span>
      </div>

      <div style={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 40, lineHeight: 1.08, letterSpacing: '-.03em', margin: '0 0 14px', whiteSpace: 'pre-line' }}>
          {title}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.82)', margin: 0, maxWidth: 340 }}>{subtitle}</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 19 }}>20.000+</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.7)' }}>học viên</div>
        </div>
        <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,.2)' }} />
        <div>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 19 }}>850+</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.7)' }}>khóa học</div>
        </div>
      </div>
    </div>
  );
}
