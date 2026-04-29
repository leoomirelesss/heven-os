'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const businessTypes = [
  { name: 'Ecommerce', description: 'Physical products with storefront + shipping.' },
  { name: 'Services', description: 'Lead capture, invoicing, and client workspace.' },
  { name: 'Bookings', description: 'Calendar, reminders, and intake flows.' },
  { name: 'Digital', description: 'Digital products with memberships.' },
];

const examples = [
  'Minimalist jewelry brand in Mexico with WhatsApp support and subscriptions.',
  'Pet grooming business in Bogotá with online bookings and CRM follow-up.',
  'Spanish course subscription with ecommerce, analytics, and automations.',
];

export function AIBuilderScreen() {
  const [selectedType, setSelectedType] = useState('Ecommerce');
  const [prompt, setPrompt] = useState(`Build a premium ${selectedType.toLowerCase()} business with bilingual support, ecommerce, CRM and automations.`);

  return (
    <div className="min-h-screen bg-surface text-text px-6 py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Hevën OS AI Builder</p>
          <h1 className="text-4xl font-semibold tracking-tight">Generate your business in minutes</h1>
        </div>
        <Card className="p-6 space-y-4">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full min-h-28 rounded-lg border border-white/10 bg-black/20 p-4 text-sm" />
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button key={example} onClick={() => setPrompt(example)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted hover:bg-white/10">{example}</button>
            ))}
          </div>
          <Link href="/generated/loading"><Button>Generate Business</Button></Link>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((type) => (
            <button key={type.name} onClick={() => setSelectedType(type.name)} className="text-left">
              <Card className={`p-4 space-y-2 transition-colors ${selectedType === type.name ? 'border-accent bg-accent/10' : 'hover:border-white/30'}`}>
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-sm text-muted">{type.description}</p>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
