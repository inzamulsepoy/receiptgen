import React, { useEffect, useState } from 'react';
import ReceiptForm, { Item } from '../components/ReceiptForm';

type Receipt = {
  _id: string;
  title: string;
  date: string;
  items: Item[];
  total: number;
};

export default function Home() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const fetchReceipts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/receipts');
      const data = await res.json();
      setReceipts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const createReceipt = async ({ title, items }: { title: string; items: Item[] }) => {
    await fetch('http://localhost:5000/api/receipts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, items })
    });
    await fetchReceipts();
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Receipt Generator</h1>
          <p className="text-sm text-gray-600">Create receipts quickly and store them in MongoDB</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReceiptForm onCreate={createReceipt} />

          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-4">Recent Receipts</h2>
            {receipts.length === 0 ? (
              <p className="text-sm text-gray-500">No receipts yet</p>
            ) : (
              <ul className="space-y-3">
                {receipts.map((r) => (
                  <li key={r._id} className="border p-3 rounded">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-gray-500">{new Date(r.date).toLocaleString()}</div>
                      </div>
                      <div className="font-semibold">${r.total.toFixed(2)}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {r.items.map((it, i) => (
                        <div key={i}>{it.qty} x {it.name} @ ${it.price}</div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
