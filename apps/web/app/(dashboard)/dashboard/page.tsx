'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '../../../lib/api/client';
import { DashboardMetrics } from '../../../types/domain';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    apiRequest<DashboardMetrics>('/dashboard/metrics').then(setMetrics).catch(() => setMetrics({
      totalProducts: 0,
      totalCustomers: 0,
      totalOrders: 0,
      totalRevenue: 0,
    }));
  }, []);

  const cards = [
    { label: 'Total products', value: metrics?.totalProducts ?? 0 },
    { label: 'Total customers', value: metrics?.totalCustomers ?? 0 },
    { label: 'Total orders', value: metrics?.totalOrders ?? 0 },
    { label: 'Revenue', value: `$${(metrics?.totalRevenue ?? 0).toFixed(2)}` },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <article key={card.label} className="bg-panel border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="text-3xl font-semibold mt-2">{card.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
