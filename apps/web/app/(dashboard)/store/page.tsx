import Link from 'next/link';

export default function StorePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Store</h2>
      <p className="text-muted">Manage your product catalog and orders.</p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded bg-accent text-white text-sm" href="/store/products">
          Products
        </Link>
        <Link className="px-4 py-2 rounded border border-slate-700 text-sm" href="/store/orders">
          Orders
        </Link>
      </div>
    </div>
  );
}
