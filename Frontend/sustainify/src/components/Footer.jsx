import React from "react";
import { Mail, Github, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">BioGroves</h3>
          <p className="text-gray-200">
            Protecting mangroves, empowering communities, and creating a greener future. 
            Join us in reporting threats and preserving nature for generations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-300 transition">Home</a>
            </li>
            <li>
              <a href="/submit-report" className="hover:text-green-300 transition">Submit Report</a>
            </li>
            <li>
              <a href="/leaderboard" className="hover:text-green-300 transition">Leaderboard</a>
            </li>
            <li>
              <a href="/how-it-works" className="hover:text-green-300 transition">How It Works</a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-300 transition">About</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <p className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5" /> info@biogroves.org
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-green-300 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-green-700 pt-6 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} BioGroves. All Rights Reserved.
      </div>
    </footer>
  );
}
