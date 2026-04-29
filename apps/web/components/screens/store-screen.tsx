import { orders, products } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';

export function StoreScreen() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Store</h2><p className="text-sm text-muted">Product catalog, order preview, and website snapshot.</p></div>
      <Card className="p-4 overflow-x-auto">
        <h3 className="mb-3 font-medium">Products</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-muted"><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
          <tbody>{products.map((p) => <tr key={p.id} className="border-t border-white/10"><td className="py-2">{p.name}</td><td>{p.category}</td><td>{p.price}</td><td>{p.stock}</td><td>{p.status}</td></tr>)}</tbody>
        </table>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4"><h3 className="mb-3 font-medium">Orders preview</h3>{orders.map((o)=><p key={o.id} className="text-sm text-muted py-1">{o.id} • {o.customer} • {o.total}</p>)}</Card>
        <Card className="p-4"><h3 className="mb-3 font-medium">Website preview</h3><div className="rounded-lg bg-white text-black p-4"><p className="text-xs text-slate-500">lunajewelry.mx</p><p className="font-semibold">Spring Collection Live</p></div></Card>
      </div>
    </div>
  );
}
