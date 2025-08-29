"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#276a2a] text-[#EDEADE] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          BioGroves
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center font-medium">
          <Link href="/leaderboard" className="hover:text-green-100 transition">
            Leaderboard
          </Link>
          <Link href="/report" className="hover:text-green-100 transition">
            Contribution
          </Link>

          {/* <Link
            href="/profile"
            className="flex items-center gap-2 hover:text-green-200 transition"
          >
            <User size={18} /> Profile
          </Link> */}

          <Link
            href="/login"
            className="bg-[#EDEADE] text-green-700 px-4 py-2 rounded-lg shadow hover:bg-green-100 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-600 px-6 py-4 space-y-4">
          <Link href="/leaderboard" className="block hover:text-green-200">
            Leaderboard
          </Link>
          <Link href="/report" className="block hover:text-green-200">
            Contribution
          </Link>
          {/* <Link href="/profile" className="block flex items-center gap-2 hover:text-green-200">
            <User size={18} /> Profile
          </Link> */}
          <Link
            href="/login"
            className="block bg-[#EDEADE] text-green-700 px-4 py-2 rounded-lg shadow hover:bg-green-100"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
