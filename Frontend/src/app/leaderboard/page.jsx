"use client";

import React, { useState, useMemo } from "react";
import { Crown, Award, Medal, Users, Search, MapPin } from "lucide-react";

// Sample leaderboard data
const leaderboardData = [
  { id: 1, name: "Amit Sharma", reports: 42, badge: "Gold", region: "Gujarat Coast" },
  { id: 2, name: "Neha Patel", reports: 37, badge: "Silver", region: "Maharashtra Coast" },
  { id: 3, name: "Rahul Verma", reports: 29, badge: "Bronze", region: "Sundarbans" },
  { id: 4, name: "Sneha Iyer", reports: 25, badge: "Contributor", region: "Kerala Coast" },
  { id: 5, name: "Arjun Singh", reports: 20, badge: "Contributor", region: "Odisha Coast" },
  { id: 6, name: "Priya Singh", reports: 18, badge: "Contributor", region: "Andaman & Nicobar Islands" },
  { id: 7, name: "Rohan Das", reports: 15, badge: "Contributor", region: "Other" },
];

export default function Leaderboard() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // Filtered leaderboard
  const filteredData = useMemo(() => {
    return leaderboardData
      .filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter(user => (regionFilter ? user.region === regionFilter : true));
  }, [search, regionFilter]);

  const topThree = filteredData.slice(0, 3);
  const others = filteredData.slice(3);

  const getBadgeColor = (badge) => {
    switch (badge.toLowerCase()) {
      case "gold": return "bg-yellow-400 text-white";
      case "silver": return "bg-gray-400 text-white";
      case "bronze": return "bg-orange-400 text-white";
      default: return "bg-green-600 text-white";
    }
  };

  const getBadgeIcon = (index) => {
    if (index === 0) return <Crown className="w-6 h-6 inline mr-1" />;
    if (index === 1) return <Award className="w-6 h-6 inline mr-1" />;
    if (index === 2) return <Medal className="w-6 h-6 inline mr-1" />;
  };

  const regions = [...new Set(leaderboardData.map(user => user.region))];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-800">🌿 Community Leaderboard</h2>
        <p className="text-gray-600 mt-2">Recognizing top guardians of our mangroves</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Regions</option>
            {regions.map((r, idx) => (
              <option key={idx} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 contributors */}
      <div className="flex justify-center gap-8 mb-12 flex-wrap">
        {topThree.map((user, index) => (
          <div
            key={user.id}
            className={`flex flex-col items-center rounded-lg p-4 shadow-lg w-44 transition transform hover:scale-105 ${
              index === 0 ? "bg-yellow-100" : index === 1 ? "bg-gray-100" : "bg-orange-100"
            }`}
          >
            {getBadgeIcon(index)}
            <h3 className="font-semibold text-lg mt-2">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.reports} Reports</p>
            <span
              className={`mt-2 px-3 py-1 text-sm rounded-full font-medium ${getBadgeColor(user.badge)}`}
            >
              {user.badge}
            </span>
            <p className="text-xs mt-1 text-gray-500">{user.region}</p>
          </div>
        ))}
      </div>

      {/* Other contributors table */}
      <div className="bg-green-50 p-6 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-200">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Reports</th>
              <th className="py-3 px-4">Badge</th>
              <th className="py-3 px-4">Region</th>
            </tr>
          </thead>
          <tbody>
            {others.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-green-100 transition">
                <td className="py-3 px-4 font-semibold">{index + 4}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.reports}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${getBadgeColor(user.badge)}`}>
                    {user.badge}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-green-700" /> {user.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="mt-12 flex justify-around flex-wrap gap-6 text-center">
        <div className="bg-green-100 p-4 rounded-xl w-48">
          <Users className="mx-auto w-8 h-8 text-green-700" />
          <p className="mt-2 font-semibold text-lg">530+</p>
          <p className="text-sm text-gray-600">Active Guardians</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl w-48">
          <Users className="mx-auto w-8 h-8 text-green-700" />
          <p className="mt-2 font-semibold text-lg">1,248+</p>
          <p className="text-sm text-gray-600">Reports Submitted</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl w-48">
          <Users className="mx-auto w-8 h-8 text-green-700" />
          <p className="mt-2 font-semibold text-lg">112+</p>
          <p className="text-sm text-gray-600">Hectares Protected</p>
        </div>
      </div>
    </section>
  );
}
