"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa"; // Google icon

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to your BioGroves account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          <FaGoogle className="w-5 h-5" /> Log in with Google
        </motion.button>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-700 font-semibold hover:underline">
            Sign Up
          </a>
        </div>
      </motion.div>
    </div>
  );
}
