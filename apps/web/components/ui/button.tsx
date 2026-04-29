import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'default' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ className, children, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'default' && 'bg-white text-black hover:bg-slate-200',
        variant === 'secondary' && 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
        variant === 'ghost' && 'text-white/70 hover:text-white hover:bg-white/5',
        className,
      )}
    >
      {children}
    </button>
  );
}
