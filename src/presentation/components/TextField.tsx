import type { ReactNode } from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export function TextField({ label, value, onChange, type = 'text', placeholder, icon, trailing }: TextFieldProps) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#3A3A4D', marginBottom: 7 }}>{label}</span>
      <span style={{ position: 'relative', display: 'block' }}>
        {icon && <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            height: 48,
            padding: icon ? '0 44px 0 40px' : '0 14px',
            borderRadius: 12,
            border: '1.5px solid #E4E2EC',
            background: '#fff',
            fontSize: 14,
            color: '#1B1B2F',
            outline: 'none',
          }}
        />
        {trailing && <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)' }}>{trailing}</span>}
      </span>
    </label>
  );
}
