import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    // Get stored users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login successful");
      setMsg("");
      // Store login state
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-changed")); // notify app
      navigate("/");
    } else {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex items-center justify-center px-4 font-inter">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-center text-black mb-2 animate-fade-in">
          🔐 Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sign in to continue your journey with{" "}
          <span className="font-semibold">Sprush</span>.
        </p>

        {msg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm transition-opacity duration-300">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition duration-300"
          />
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInput}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 font-semibold transition-transform duration-300 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="underline hover:text-black font-medium transition-colors duration-300"
          >
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
