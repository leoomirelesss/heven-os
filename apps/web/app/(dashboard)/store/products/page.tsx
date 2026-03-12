'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiRequest } from '../../../../lib/api/client';
import { Product } from '../../../../types/domain';

type ProductForm = {
  name: string;
  description: string;
  sku: string;
  price: string;
  currency: string;
  stock: string;
  status: string;
};

const initialForm: ProductForm = {
  name: '',
  description: '',
  sku: '',
  price: '0',
  currency: 'USD',
  stock: '0',
  status: 'active',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const data = await apiRequest<Product[]>('/products');
    setProducts(data);
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId) {
      await apiRequest(`/products/${editingId}`, { method: 'PATCH', body: JSON.stringify(payload) });
    } else {
      await apiRequest('/products', { method: 'POST', body: JSON.stringify(payload) });
    }

    setOpen(false);
    setEditingId(null);
    setForm(initialForm);
    await load();
  };

  const edit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description ?? '',
      sku: product.sku,
      price: String(product.price),
      currency: product.currency,
      stock: String(product.stock),
      status: product.status,
    });
    setOpen(true);
  };

  const remove = async (id: string) => {
    await apiRequest(`/products/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded bg-accent text-white text-sm">New product</button>
      </div>

      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-panel text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-800">
                <td className="p-3">{product.name}</td>
                <td className="p-3 text-muted">{product.sku}</td>
                <td className="p-3">{product.currency} {product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.status}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => edit(product)} className="text-accent">Edit</button>
                  <button onClick={() => void remove(product.id)} className="text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <form onSubmit={submit} className="w-full max-w-xl bg-panel border border-slate-700 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit product' : 'Create product'}</h3>
            <input className="w-full p-2 rounded bg-slate-900" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full p-2 rounded bg-slate-900" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full p-2 rounded bg-slate-900" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              <input className="w-full p-2 rounded bg-slate-900" placeholder="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
              <input type="number" step="0.01" className="w-full p-2 rounded bg-slate-900" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input type="number" className="w-full p-2 rounded bg-slate-900" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <input className="w-full p-2 rounded bg-slate-900" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-4 py-2 border border-slate-700 rounded" onClick={() => setOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-accent rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
