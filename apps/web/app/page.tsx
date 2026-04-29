import Link from 'next/link';

export default function HomePage() {
  return <main className="min-h-screen bg-surface text-text"><section className="mx-auto max-w-6xl px-6 py-20 space-y-6"><p className="text-xs uppercase tracking-[0.2em] text-muted">Hevën OS</p><h1 className="text-5xl font-semibold max-w-3xl">Create, launch, and operate your business with AI.</h1><p className="text-lg text-muted max-w-3xl">Hevën OS turns a simple prompt into a complete digital business: website, store, CRM, automations, analytics, and operations.</p><div className="flex gap-3"><Link href="/register" className="rounded-md bg-white text-black px-4 py-2">Start building</Link><Link href="/ai-builder" className="rounded-md border border-white/20 px-4 py-2">Watch demo</Link></div></section></main>;
}
