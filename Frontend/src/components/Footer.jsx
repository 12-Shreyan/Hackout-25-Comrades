"use client";

import React from "react";
import { Mail, Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, href: "#" },
    { icon: <Github className="w-6 h-6" />, href: "#" },
    { icon: <Instagram className="w-6 h-6" />, href: "#" },
    { icon: <Linkedin className="w-6 h-6" />, href: "#" },
  ];

  const linkVariants = {
    hover: { x: 5, color: "#A7F3D0", transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-green-900 text-white py-16 relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* About Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-2">BioGroves</h3>
          <p className="text-gray-300">
            At BioGroves, we are dedicated to protecting mangroves and empowering communities. 
            Every report you submit helps preserve biodiversity, safeguard coastal communities, 
            and combat climate change. Together, we create a greener, safer future for generations to come.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Submit Report", "Leaderboard", "How It Works", "About"].map((link, idx) => (
              <motion.li key={idx} whileHover={{ x: 5, color: "#A7F3D0", transition: { duration: 0.3 } }}>
                <a href={`/${link.toLowerCase().replace(" ", "-")}`} className="transition">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <Mail className="w-5 h-5" /> info@biogroves.org
          </p>
          <p className="text-gray-300">
            Follow us on social media to stay updated on the latest conservation efforts, community events, and ways you can contribute.
          </p>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                variants={linkVariants}
                whileHover="hover"
                className="text-white"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 border-t border-green-700 pt-6 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        &copy; {new Date().getFullYear()} BioGroves. All Rights Reserved.  
        <br />
      </motion.div>
    </footer>
  );
}
