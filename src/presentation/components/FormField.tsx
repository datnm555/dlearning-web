import { useId, type ComponentProps, type ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps extends Omit<ComponentProps<'input'>, 'onChange' | 'id'> {
  label: string;
  onChange: (value: string) => void;
  /** Rendered inside the input on the right (e.g. show-password toggle). */
  trailing?: ReactNode;
}

export function FormField({ label, onChange, trailing, ...rest }: FormFieldProps) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input id={id} onChange={(e) => onChange(e.target.value)} className={trailing ? 'pr-12' : undefined} {...rest} />
        {trailing && <span className="absolute inset-y-0 right-1 flex items-center">{trailing}</span>}
      </div>
    </div>
  );
}
