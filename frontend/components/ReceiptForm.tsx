import React, { useState } from 'react';

export type Item = {
  name: string;
  qty: number;
  price: number;
};

type Props = {
  onCreate: (data: { title: string; items: Item[] }) => Promise<void>;
};

export default function ReceiptForm({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Item[]>([{ name: '', qty: 1, price: 0 }]);

  const addItem = () => setItems((s) => [...s, { name: '', qty: 1, price: 0 }]);
  const removeItem = (i: number) => setItems((s) => s.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: keyof Item, value: any) =>
    setItems((s) => s.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate({ title: title || 'Receipt', items });
    setTitle('');
    setItems([{ name: '', qty: 1, price: 0 }]);
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
        {items.map((it, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input placeholder="name" value={it.name} onChange={(e) => updateItem(i, 'name', e.target.value)} className="flex-1 border rounded p-2" />
            <input type="number" value={it.qty} onChange={(e) => updateItem(i, 'qty', Number(e.target.value))} className="w-20 border rounded p-2" />
            <input type="number" value={it.price} onChange={(e) => updateItem(i, 'price', Number(e.target.value))} className="w-28 border rounded p-2" />
            <button type="button" onClick={() => removeItem(i)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="text-blue-600">+ Add item</button>
      </div>

      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Receipt</button>
      </div>
    </form>
  );
}
