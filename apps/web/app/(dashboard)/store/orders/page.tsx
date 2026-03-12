'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '../../../../lib/api/client';
import { Order } from '../../../../types/domain';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);

  const load = async () => {
    const data = await apiRequest<Order[]>('/orders');
    setOrders(data);
  };

  useEffect(() => {
    void load();
  }, []);

  const openOrder = async (id: string) => {
    const order = await apiRequest<Order>(`/orders/${id}`);
    setSelected(order);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Orders</h2>

      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-panel text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-800 cursor-pointer hover:bg-slate-900" onClick={() => void openOrder(order.id)}>
                <td className="p-3 font-mono text-xs">{order.id.slice(0, 12)}...</td>
                <td className="p-3">{order.customer?.name ?? order.customerId}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.currency} {order.total}</td>
                <td className="p-3 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="border border-slate-700 rounded-lg p-4 bg-panel space-y-2">
          <h3 className="font-semibold">Order detail</h3>
          <p className="text-sm text-muted">Customer: {selected.customer?.name ?? selected.customerId}</p>
          <p className="text-sm text-muted">Status: {selected.status}</p>
          <p className="text-sm text-muted">Total: {selected.currency} {selected.total}</p>
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Items</h4>
            <ul className="space-y-1 text-sm">
              {(selected.items ?? []).map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.product?.name ?? item.productId} × {item.quantity}</span>
                  <span>{selected.currency} {item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
