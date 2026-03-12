import Link from 'next/link';
import { ReactNode } from 'react';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Products', '/store/products'],
  ['Orders', '/store/orders'],
  ['Customers', '/customers'],
  ['Inbox', '/inbox'],
  ['Automations', '/automations'],
  ['Bookings', '/bookings'],
  ['Shipping', '/shipping'],
  ['Analytics', '/analytics'],
  ['Settings', '/settings'],
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-slate-800 p-4 bg-panel">
        <h1 className="font-semibold text-lg mb-6">Hevən OS</h1>
        <nav className="space-y-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded px-3 py-2 text-sm text-muted hover:text-text hover:bg-slate-800">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main>
        <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between">
          <span className="text-sm text-muted">Business Operating System for LATAM</span>
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Store + Customers v1</span>
        </header>
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
