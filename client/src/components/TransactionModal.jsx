import { useState } from "react";
import { transactionAPI } from "../utils/api";
import { useUser } from "../context/UserContext";

const CATEGORIES = [
    "Salary",
    "Food",
    "Transport",
    "Rent",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Education",
    "Investment",
    "Other",
];

export default function TransactionModal({ isOpen, onClose, onSuccess }) {
    const { user, updateUser } = useUser();
    const [formData, setFormData] = useState({
        amount: "",
        type: "credit",
        category: "Other",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await transactionAPI.create({
                userId: user.id,
                amount: parseFloat(formData.amount),
                type: formData.type,
                category: formData.category,
                description: formData.description,
            });

            // Update user's wallet balance in context
            if (response.data.walletBalance !== undefined) {
                updateUser({ ...user, walletBalance: response.data.walletBalance });
            }

            // Reset form
            setFormData({
                amount: "",
                type: "credit",
                category: "Other",
                description: "",
            });

            // Call success callback
            if (onSuccess) onSuccess(response.data);

            // Close modal
            onClose();
        } catch (err) {
            console.error("Transaction error:", err);
            setError(err.response?.data?.error || "Failed to create transaction");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="glass-card max-w-md w-full p-8 animate-fadeInScale border-2 border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gradient">
                        New Transaction
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Transaction Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: "credit" })}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${formData.type === "credit"
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50"
                                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                💰 Credit
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: "debit" })}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${formData.type === "debit"
                                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/50"
                                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                💸 Debit
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="input-dark"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input-dark"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-dark resize-none"
                            placeholder="Add a note..."
                            rows="3"
                            maxLength="200"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.description.length}/200 characters
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processing...
                            </span>
                        ) : (
                            "Create Transaction"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
