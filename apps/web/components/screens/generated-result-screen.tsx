import Link from 'next/link';
import { automations, business, products } from '../../lib/mock-data/heven';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function GeneratedResultScreen() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-3">
          <Badge className="bg-emerald-500/20 text-emerald-300">Business generated successfully</Badge>
          <h1 className="text-4xl font-semibold">{business.name}</h1>
          <p className="text-muted max-w-2xl">{business.description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm text-muted">Website preview</h2>
            <div className="rounded-lg bg-white text-black p-6 space-y-4">
              <p className="text-xs text-slate-500">{business.domain}</p>
              <h3 className="text-2xl font-semibold">Hecho en México</h3>
              <p className="text-sm text-slate-600">Minimalist pieces, ethically made.</p>
            </div>
          </Card>
          <Card className="p-4 space-y-2">
            <h2 className="text-sm text-muted">Generated automations</h2>
            {automations.map((automation) => (
              <div key={automation.id} className="rounded-md border border-white/10 p-3">
                <p className="text-sm">{automation.name}</p>
                <p className="text-xs text-muted">{automation.trigger}</p>
              </div>
            ))}
          </Card>
        </div>
        <Card className="p-4">
          <h2 className="mb-3 text-sm text-muted">Sample products</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border border-white/10 p-3">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted">{product.category}</p>
                <p className="mt-2 text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </Card>
        <Link href="/dashboard"><Button>Continue to Dashboard</Button></Link>
      </div>
    </div>
  );
}
