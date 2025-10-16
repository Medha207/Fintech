import React from "react";
import { useState } from "react";
import axios from "axios";
import e from "cors";

//const BASE_URL = "https://fintech-2-8h51.onrender.com/api";
const BASE_URL = "http://localhost:3000/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const user = (event)=>{
    setUsername(event.target.value);
  }

  const emailId = (event)=>{
    setEmail(event.target.value);
  }

  const pass = (event)=>{
    setPassword(event.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/register`, {
        username,
        email,
        password,
      });
      setMessage("✅ Registered successfully! Please login.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={user}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={emailId}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={pass}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
