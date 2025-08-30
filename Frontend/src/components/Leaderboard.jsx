"use client";
import React from "react";
import { Crown, Award, Medal } from "lucide-react";
import { motion } from "framer-motion";

const leaderboardData = [
  { id: 1, name: "Amit Sharma", reports: 42, badge: "Gold" },
  { id: 2, name: "Neha Patel", reports: 37, badge: "Silver" },
  { id: 3, name: "Rahul Verma", reports: 29, badge: "Bronze" },
  { id: 4, name: "Sneha Iyer", reports: 25, badge: "Contributor" },
  { id: 5, name: "Arjun Singh", reports: 20, badge: "Contributor" },
];

export default function Leaderboard() {
  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  const badgeColor = (badge) => {
    switch (badge) {
      case "Gold":
        return "bg-yellow-400 text-white";
      case "Silver":
        return "bg-gray-400 text-white";
      case "Bronze":
        return "bg-orange-400 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  // Variants for framer-motion
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-bold text-green-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🌿 Community Leaderboard
        </motion.h2>
        <motion.p
          className="text-gray-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Honoring our top guardians of mangroves and encouraging participation.
        </motion.p>
      </div>

      {/* Top 3 Pyramid */}
      <motion.div
        className="flex justify-center items-end gap-8 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {topThree.map((user, index) => (
          <motion.div
            key={user.id}
            className="flex flex-col items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-24 h-24 flex items-center justify-center rounded-full text-3xl ${
                index === 0
                  ? "bg-yellow-400 text-white"
                  : index === 1
                  ? "bg-gray-400 text-white"
                  : "bg-orange-400 text-white"
              }`}
            >
              {index === 0 ? <Crown /> : index === 1 ? <Award /> : <Medal />}
            </div>
            <p className="mt-2 font-semibold text-green-900">{user.name}</p>
            <p className="text-gray-700">{user.reports} Reports</p>
            <span
              className={`mt-1 px-3 py-1 rounded-full text-sm ${badgeColor(
                user.badge
              )}`}
            >
              {user.badge}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Others Table */}
      {others.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Reports Submitted</th>
                <th className="py-3 px-4">Badge</th>
              </tr>
            </thead>
            <tbody>
              {others.map((user, index) => (
                <motion.tr
                  key={user.id}
                  className="border-b hover:bg-green-50 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="py-3 px-4 font-semibold">{index + 4}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.reports}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${badgeColor(
                        user.badge
                      )}`}
                    >
                      {user.badge}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </section>
  );
}
