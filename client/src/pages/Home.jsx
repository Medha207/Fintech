import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome to FinTech Pro
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Your all-in-one platform to manage transactions, track spending, and
          gain financial insights — built with modern technology.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-900 py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose FinTech Pro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Track Transactions</h3>
            <p>Easily log and manage your daily transactions securely.</p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
            <p>Get insights and visualize your financial data in one place.</p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-pink-500 to-red-500 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Secure &amp; Reliable</h3>
            <p>Your data is protected with industry-standard encryption.</p>
        </div>
        </div>
      </section>
    </div>
  );
}
 export default Home;