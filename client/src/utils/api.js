import axios from "axios";

// Base API URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post("/register", data),
    login: (data) => api.post("/login", data),
};

// User APIs
export const userAPI = {
    getWalletBalance: (userId) => api.get(`/wallet/${userId}`),
};

// Transaction APIs
export const transactionAPI = {
    create: (data) => api.post("/transactions", data),
    getAll: () => api.get("/transactions"),
    getUserTransactions: (userId, params) =>
        api.get(`/transactions/user/${userId}`, { params }),
    getStats: (userId) => api.get(`/transactions/stats/${userId}`),
    getById: (id) => api.get(`/transactions/${id}`),
    update: (id, data) => api.put(`/transactions/${id}`, data),
    delete: (id) => api.delete(`/transactions/${id}`),
};

export default api;
