// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import "./index.css";

function App() {
  // Simulating authentication (replace with real auth later)
  const isAuthenticated = localStorage.getItem("token"); 

  return (
    
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/transactions"
              element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />}
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/NotFound" />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    
  );
}

export default App;
