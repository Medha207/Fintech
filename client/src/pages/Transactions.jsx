import { useState } from "react";

export default function Transactions() {
  const [transactions] = useState([
    { id: 1, type: "Income", amount: 5000, date: "2025-08-01" },
    { id: 2, type: "Expense", amount: 2000, date: "2025-08-05" },
    { id: 3, type: "Investment", amount: 3000, date: "2025-08-10" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left">#</th>
              <th className="px-6 py-3 border-b text-left">Type</th>
              <th className="px-6 py-3 border-b text-left">Amount</th>
              <th className="px-6 py-3 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{tx.id}</td>
                <td className="px-6 py-3 border-b">{tx.type}</td>
                <td className="px-6 py-3 border-b text-green-600 font-semibold">
                  ₹ {tx.amount}
                </td>
                <td className="px-6 py-3 border-b">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
