
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { get } from "http";


//const BASE_URL = "https://fintech-2-8h51.onrender.com/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const getUserName = (event)=>{
    setUsername(event.target.value);
  }

  const getPassword = (event)=>{
    setPassword(event.target.value);
  }

  

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000/api";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      //console.log("data",res.data.jwtToken)
      localStorage.setItem("token", res.data.jwtToken);
      setMessage("✅ Login successful!");
      setUsername("");
      setPassword("");
    

      // window.location.href = "/dashboard";

       navigate("/dashboard");
     

    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={getUserName}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={getPassword}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
