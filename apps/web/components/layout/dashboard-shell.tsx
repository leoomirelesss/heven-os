'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Store', '/store'],
  ['Customers', '/customers'],
  ['Inbox', '/inbox'],
  ['Automations', '/automations'],
  ['Bookings', '/bookings'],
  ['Shipping', '/shipping'],
  ['Analytics', '/analytics'],
  ['Settings', '/settings'],
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-surface">
      <aside className="border-r border-white/10 p-4 bg-panel">
        <Link href="/ai-builder" className="font-semibold text-lg mb-6 block">Hevën OS</Link>
        <nav className="space-y-1">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm transition-colors',
                pathname === href ? 'bg-white text-black' : 'text-muted hover:text-text hover:bg-white/10',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main>
        <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between">
          <span className="text-sm text-muted">AI Business OS for LATAM operators</span>
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Investor Demo</span>
        </header>
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
