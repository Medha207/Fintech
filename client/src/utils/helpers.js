// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};

// Format date to readable format
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// Format date with time
export const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
};

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Get user from localStorage
export const getUser = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
};

// Save user to localStorage
export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

// Get transaction type color
export const getTransactionColor = (type) => {
    return type === "credit" ? "text-green-600" : "text-red-600";
};

// Get transaction type badge
export const getTransactionBadge = (type) => {
    return type === "credit"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";
};

// Get category icon (you can expand this with actual icons)
export const getCategoryIcon = (category) => {
    const icons = {
        Salary: "💰",
        Food: "🍔",
        Transport: "🚗",
        Rent: "🏠",
        Shopping: "🛍️",
        Entertainment: "🎬",
        Bills: "📄",
        Healthcare: "🏥",
        Education: "📚",
        Investment: "📈",
        Other: "📦",
    };
    return icons[category] || "📦";
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Generate random color for charts
export const getRandomColor = () => {
    const colors = [
        "#4F46E5", "#9333EA", "#06B6D4", "#10B981",
        "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
