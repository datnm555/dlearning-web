import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ children, type = 'button', onClick, disabled }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        height: 50,
        border: 'none',
        borderRadius: 13,
        background: 'linear-gradient(135deg,#4F46E5,#6D28D9)',
        color: '#fff',
        fontFamily: 'Sora',
        fontWeight: 700,
        fontSize: 15,
        cursor: disabled ? 'default' : 'pointer',
        boxShadow: '0 12px 26px -10px rgba(79,70,229,.7)',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
}
