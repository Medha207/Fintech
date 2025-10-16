import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  LogOut,
} from "lucide-react"; // Sidebar icons

const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b", "#ef4444", "#10b981"];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  // ✅ Dummy data fallback (if API returns nothing)
  const dummyIncomeData = [
    { month: "Jan", income: 4000 },
    { month: "Feb", income: 3200 },
    { month: "Mar", income: 5000 },
    { month: "Apr", income: 4500 },
    { month: "May", income: 4800 },
    { month: "Jun", income: 5200 },
  ];

  const dummyExpensesData = [
    { name: "Food", value: 1200 },
    { name: "Transport", value: 800 },
    { name: "Rent", value: 2500 },
    { name: "Shopping", value: 1000 },
    { name: "Other", value: 600 },
  ];

  // ✅ Fetch transactions from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tx = res.data || [];
        setTransactions(tx);

        if (tx.length === 0) {
          // if no transactions, show dummy data
          setBarData(dummyIncomeData);
          setPieData(dummyExpensesData);
          setStats({
            totalBalance: 10000,
            totalIncome: 15000,
            totalExpense: 5000,
          });
          return;
        }

        // ✅ Compute stats
        const income = tx
          .filter((t) => t.type === "income")
          .reduce((a, c) => a + c.amount, 0);
        const expense = tx
          .filter((t) => t.type === "expense")
          .reduce((a, c) => a + Math.abs(c.amount), 0);

        setStats({
          totalBalance: income - expense,
          totalIncome: income,
          totalExpense: expense,
        });

        // ✅ Prepare monthly bar chart
        const monthly = {};
        tx.forEach((t) => {
          const month = new Date(t.date).toLocaleString("default", {
            month: "short",
          });
          if (!monthly[month]) monthly[month] = { month, income: 0 };
          if (t.type === "income") {
            monthly[month].income += t.amount;
          }
        });
        setBarData(Object.values(monthly));

        // ✅ Pie chart breakdown by category
        const categories = {};
        tx.forEach((t) => {
          if (!categories[t.category]) categories[t.category] = 0;
          categories[t.category] += Math.abs(t.amount);
        });
        setPieData(
          Object.keys(categories).map((key) => ({
            name: key,
            value: categories[key],
          }))
        );
      } catch (err) {
        console.error("Error fetching transactions:", err);
        // fallback to dummy data
        setBarData(dummyIncomeData);
        setPieData(dummyExpensesData);
        setStats({
          totalBalance: 10000,
          totalIncome: 15000,
          totalExpense: 5000,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-8">FinTrack</h2>
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                activeMenu === "dashboard"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveMenu("dashboard")}
            >
              <LayoutDashboard size={20} /> Dashboard
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                activeMenu === "transactions"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveMenu("transactions")}
            >
              <Receipt size={20} /> Transactions
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                activeMenu === "reports"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveMenu("reports")}
            >
              <BarChart3 size={20} /> Reports
            </li>
          </ul>
        </div>
        <button
          className="flex items-center gap-2 text-red-600 hover:bg-red-100 p-2 rounded-lg"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeMenu === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-gray-500">Total Balance</h2>
                <p className="text-2xl font-bold text-indigo-600">
                  ₹{stats.totalBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-gray-500">This Month Income</h2>
                <p className="text-2xl font-bold text-green-600">
                  ₹{stats.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-gray-500">This Month Expenses</h2>
                <p className="text-2xl font-bold text-red-600">
                  ₹{stats.totalExpense.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData.length > 0 ? barData : dummyIncomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData.length > 0 ? pieData : dummyExpensesData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {(pieData.length > 0 ? pieData : dummyExpensesData).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeMenu === "transactions" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {tx.description}
                      </td>
                      <td
                        className={`px-6 py-4 font-semibold ${
                          tx.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ₹{tx.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "reports" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Reports</h1>
            <p className="text-gray-600">
              Detailed financial reports will be available here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
