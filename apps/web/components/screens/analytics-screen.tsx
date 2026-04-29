import { revenueSeries, trafficSources } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';

export function AnalyticsScreen() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Analytics</h2><p className="text-sm text-muted">Revenue, conversion, customer growth, and traffic mix.</p></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4"><h3 className="mb-3 font-medium">Revenue graph</h3>{revenueSeries.map((r)=><p key={r.month} className="text-sm text-muted">{r.month}: ${(r.revenue/1000).toFixed(1)}k</p>)}</Card>
        <Card className="p-4"><h3 className="mb-3 font-medium">Conversion graph</h3>{revenueSeries.map((r)=><p key={r.month} className="text-sm text-muted">{r.month}: {r.conversion}%</p>)}</Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4"><h3 className="mb-3 font-medium">Customer growth</h3>{revenueSeries.map((r)=><p key={r.month} className="text-sm text-muted">{r.month}: {r.customers} customers</p>)}</Card>
        <Card className="p-4"><h3 className="mb-3 font-medium">Traffic sources</h3>{trafficSources.map((t)=><p key={t.source} className="text-sm text-muted">{t.source}: {t.share}</p>)}</Card>
      </div>
    </div>
  );
}
