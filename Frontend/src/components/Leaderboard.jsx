"use client";
import React from "react";
import { Crown, Award, Medal } from "lucide-react";

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

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-2">
          🌿 Community Leaderboard
        </h2>
        <p className="text-gray-700">
          Honoring our top guardians of mangroves and encouraging participation.
        </p>
      </div>

      {/* Top 3 Pyramid */}
      <div className="flex justify-center items-end gap-8 mb-12">
        {topThree.map((user, index) => (
          <div
            key={user.id}
            className={`flex flex-col items-center transition transform hover:scale-105`}
          >
            <div
              className={`w-24 h-24 flex items-center justify-center rounded-full text-3xl ${
                index === 0
                  ? "bg-yellow-400 text-white" // 1st rank
                  : index === 1
                  ? "bg-gray-400 text-white" // 2nd rank
                  : "bg-orange-400 text-white" // 3rd rank
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
          </div>
        ))}
      </div>

      {/* Others Table */}
      {others.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
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
                <tr
                  key={user.id}
                  className="border-b hover:bg-green-50 transition"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
