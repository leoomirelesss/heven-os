'use client';

import { useMemo, useState } from 'react';
import { customers } from '../../lib/mock-data/heven';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export function CustomersScreen() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(customers[0].id);
  const filtered = useMemo(() => customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = filtered.find((c) => c.id === selectedId) ?? filtered[0] ?? customers[0];

  return <div className="grid gap-4 xl:grid-cols-[2fr_1fr]"><Card className="p-4 overflow-x-auto"><div className="flex items-center justify-between mb-4"><h2 className="text-2xl font-semibold">Customers</h2><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm"/></div><table className="w-full text-sm"><thead className="text-left text-muted"><tr><th>Name</th><th>Email</th><th>Tags</th><th>Status</th><th>LTV</th></tr></thead><tbody>{filtered.map((c)=><tr key={c.id} onClick={() => setSelectedId(c.id)} className={`border-t border-white/10 cursor-pointer ${selected.id===c.id ? 'bg-white/5':''}`}><td className="py-3">{c.name}</td><td>{c.email}</td><td className="space-x-1">{c.tags.map((t)=><Badge key={t}>{t}</Badge>)}</td><td>{c.status}</td><td>{c.ltv}</td></tr>)}</tbody></table></Card><Card className="p-4"><h3 className="font-medium">Customer details</h3><p className="mt-3 text-sm">{selected.name}</p><p className="text-sm text-muted">{selected.email}</p><div className="mt-2 space-x-1">{selected.tags.map((tag)=><Badge key={tag}>{tag}</Badge>)}</div></Card></div>;
}
