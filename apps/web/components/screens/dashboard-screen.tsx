import { dashboardStats, orders, revenueSeries } from '../../lib/mock-data/heven';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export function DashboardScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted">Executive summary of commerce, CRM, and automations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-muted">{stat.change} vs last month</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <h3 className="mb-4 font-medium">Revenue trend</h3>
          <div className="space-y-3">
            {revenueSeries.map((point) => (
              <div key={point.month} className="grid grid-cols-[40px_1fr_auto] items-center gap-3 text-sm">
                <span className="text-muted">{point.month}</span>
                <div className="h-2 rounded bg-white/10"><div className="h-2 rounded bg-accent" style={{ width: `${(point.revenue / 35000) * 100}%` }} /></div>
                <span>${Math.round(point.revenue / 1000)}k</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-4 font-medium">Recent orders</h3>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border border-white/10 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{order.customer}</p>
                  <Badge>{order.status}</Badge>
                </div>
                <p className="text-xs text-muted">{order.id} • {order.total}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
