import { customers } from '../../lib/mock-data/heven';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export function CustomersScreen() {
  const selected = customers[0];
  return (
    <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <Card className="p-4 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-muted"><tr><th>Name</th><th>Email</th><th>Tags</th><th>Status</th><th>LTV</th></tr></thead>
          <tbody>{customers.map((c)=><tr key={c.id} className="border-t border-white/10"><td className="py-3">{c.name}</td><td>{c.email}</td><td className="space-x-1">{c.tags.map((t)=><Badge key={t}>{t}</Badge>)}</td><td>{c.status}</td><td>{c.ltv}</td></tr>)}</tbody>
        </table>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium">Customer details</h3>
        <p className="mt-3 text-sm">{selected.name}</p>
        <p className="text-sm text-muted">{selected.email}</p>
        <p className="text-sm text-muted mt-2">Lifecycle tags</p>
        <div className="mt-2 space-x-1">{selected.tags.map((tag)=><Badge key={tag}>{tag}</Badge>)}</div>
      </Card>
    </div>
  );
}
