import { useState, useEffect } from "react";
import { transactionAPI } from "../utils/api";
import { useUser } from "../context/UserContext";
import { formatCurrency, formatDate, getCategoryIcon } from "../utils/helpers";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getUserTransactions(user.id);
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [user]);

  const handleTransactionSuccess = () => {
    fetchTransactions();
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-gray-400 text-lg">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-xl">+</span>
            New Transaction
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card mb-8 p-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === "all"
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setFilter("credit")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === "credit"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
            >
              💰 Income
            </button>
            <button
              onClick={() => setFilter("debit")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === "debit"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/50"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
            >
              💸 Expenses
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="glass-card">
          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((tx, index) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/10 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-5 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <span className="text-4xl">{getCategoryIcon(tx.category)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-white text-xl">{tx.category}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${tx.type === "credit"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                        >
                          {tx.type === "credit" ? "Income" : "Expense"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {tx.description || "No description"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <p
                      className={`text-3xl font-bold ${tx.type === "credit" ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {tx.type === "credit" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📊</div>
              <h3 className="text-3xl font-bold text-white mb-3">
                No transactions found
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                {filter === "all"
                  ? "Start by creating your first transaction"
                  : `No ${filter === "credit" ? "income" : "expense"} transactions yet`}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Create Transaction
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
