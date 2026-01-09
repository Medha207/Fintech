import { useState, useEffect } from "react";
import { transactionAPI } from "../utils/api";
import { useUser } from "../context/UserContext";
import { formatCurrency, formatDate, getCategoryIcon } from "../utils/helpers";
import TransactionModal from "../components/TransactionModal";
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

const COLORS = ["#a855f7", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Dashboard() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [txResponse, statsResponse] = await Promise.all([
        transactionAPI.getUserTransactions(user.id),
        transactionAPI.getStats(user.id),
      ]);

      setTransactions(txResponse.data.transactions || []);
      setStats(statsResponse.data.stats || null);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleTransactionSuccess = () => {
    fetchData(); // Refresh data after new transaction
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="spinner"></div>
      </div>
    );
  }

  // Prepare chart data
  const categoryData = stats?.categoryBreakdown
    ? Object.entries(stats.categoryBreakdown).map(([name, value]) => ({
      name,
      value,
    }))
    : [];

  const monthlyData = stats?.monthlyData
    ? Object.entries(stats.monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }))
    : [];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0f172a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient">{user?.username}</span>! 👋
            </h1>
            <p className="text-gray-400 text-lg">Here's your financial overview</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-xl">+</span>
            New Transaction
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Balance</p>
                <p className="text-4xl font-bold text-gradient">
                  {formatCurrency(user?.walletBalance || 0)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </div>

          <div className="glass-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Income</p>
                <p className="text-4xl font-bold text-green-400">
                  {formatCurrency(stats?.totalIncome || 0)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/50">
                <span className="text-3xl">📈</span>
              </div>
            </div>
          </div>

          <div className="glass-card bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/30 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Expenses</p>
                <p className="text-4xl font-bold text-red-400">
                  {formatCurrency(stats?.totalExpense || 0)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/50">
                <span className="text-3xl">📉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Monthly Overview */}
          <div className="glass-card animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">Monthly Overview</h2>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.9)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "0.75rem",
                      color: "#f1f5f9",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} name="Income" />
                  <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available. Create your first transaction!
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="glass-card animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-bold text-white mb-6">Spending by Category</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.9)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "0.75rem",
                      color: "#f1f5f9",
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No category data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
            <a href="/transactions" className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors">
              View All →
            </a>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <span className="text-3xl">{getCategoryIcon(tx.category)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{tx.category}</p>
                      <p className="text-sm text-gray-400">
                        {tx.description || "No description"} • {formatDate(tx.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${tx.type === "credit" ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {tx.type === "credit" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{tx.type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-7xl mb-6">📊</div>
              <p className="text-gray-400 mb-6 text-lg">No transactions yet</p>
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Create Your First Transaction
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  );
}
