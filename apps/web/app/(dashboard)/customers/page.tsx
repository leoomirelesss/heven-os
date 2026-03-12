'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiRequest } from '../../../lib/api/client';
import { Customer } from '../../../types/domain';

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  tags: string;
  notes: string;
};

const initialForm: CustomerForm = {
  name: '',
  email: '',
  phone: '',
  tags: '',
  notes: '',
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const data = await apiRequest<Customer[]>('/customers');
    setCustomers(data);
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    if (editingId) {
      await apiRequest(`/customers/${editingId}`, { method: 'PATCH', body: JSON.stringify(payload) });
    } else {
      await apiRequest('/customers', { method: 'POST', body: JSON.stringify(payload) });
    }

    setOpen(false);
    setEditingId(null);
    setForm(initialForm);
    await load();
  };

  const edit = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      tags: customer.tags.join(', '),
      notes: customer.notes ?? '',
    });
    setOpen(true);
  };

  const remove = async (id: string) => {
    await apiRequest(`/customers/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customers</h2>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded bg-accent text-white text-sm">New customer</button>
      </div>

      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-panel text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Tags</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-slate-800">
                <td className="p-3">{customer.name}</td>
                <td className="p-3 text-muted">{customer.email ?? '-'}</td>
                <td className="p-3">{customer.phone ?? '-'}</td>
                <td className="p-3">{customer.tags.join(', ')}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => edit(customer)} className="text-accent">Edit</button>
                  <button onClick={() => void remove(customer.id)} className="text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <form onSubmit={submit} className="w-full max-w-xl bg-panel border border-slate-700 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit customer' : 'Create customer'}</h3>
            <input className="w-full p-2 rounded bg-slate-900" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full p-2 rounded bg-slate-900" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="w-full p-2 rounded bg-slate-900" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <input className="w-full p-2 rounded bg-slate-900" placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <textarea className="w-full p-2 rounded bg-slate-900" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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
