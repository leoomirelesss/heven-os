import Link from 'next/link';
import { business } from '../../lib/mock-data/heven';
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
  return (
    <div className="min-h-screen bg-surface text-text px-6 py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Hevën OS AI Builder</p>
          <h1 className="text-4xl font-semibold tracking-tight">Generate your business in minutes</h1>
          <p className="text-muted max-w-2xl mx-auto">Prompt-driven setup inspired by Lovable, with Shopify-style editing and unified operations.</p>
        </div>

        <Card className="p-6 space-y-4">
          <p className="text-sm text-muted">Describe the business you want to launch</p>
          <textarea
            readOnly
            value={`Build ${business.name}: ${business.description}`}
            className="w-full min-h-28 rounded-lg border border-white/10 bg-black/20 p-4 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <span key={example} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">{example}</span>
            ))}
          </div>
          <Link href="/generated/loading"><Button>Generate Business</Button></Link>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((type) => (
            <Card key={type.name} className="p-4 space-y-2 hover:border-white/30 transition-colors">
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-sm text-muted">{type.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
