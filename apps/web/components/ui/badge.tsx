import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-white/10 text-white/80', className)} {...props} />;
}
