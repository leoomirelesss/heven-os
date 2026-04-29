'use client';

import { useState } from 'react';
import { automations } from '../../lib/mock-data/heven';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const templates = ['Welcome flow', 'Abandoned cart', 'Win-back campaign', 'Post-purchase NPS'];

export function AutomationsScreen() {
  const [items, setItems] = useState(automations);

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Automations</h2></div>
      <div className="grid gap-4 lg:grid-cols-2"><Card className="p-4"><h3 className="font-medium mb-3">Templates</h3><div className="grid gap-2">{templates.map((t)=><div key={t} className="rounded-md border border-white/10 p-2 text-sm">{t}</div>)}</div></Card></div>
      <Card className="p-4 space-y-2">{items.map((a)=><div key={a.id} className="flex items-center justify-between rounded-lg border border-white/10 p-3"><div><p className="text-sm">{a.name}</p><p className="text-xs text-muted">{a.trigger}</p></div><button onClick={() => setItems((prev) => prev.map((row) => row.id === a.id ? { ...row, status: row.status === 'Active' ? 'Inactive' : 'Active' } : row))}><Badge className={a.status==='Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10'}>{a.status}</Badge></button></div>)}</Card>
    </div>
  );
}
