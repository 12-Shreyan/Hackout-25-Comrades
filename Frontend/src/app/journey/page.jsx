"use client";
import React from "react";
import {
  Leaf,
  TreePine,
  Globe2,
  ShieldCheck,
  Award,
  Medal,
} from "lucide-react";

// Dummy Data
const reports = [
  {
    title: "Mangrove Cutting",
    region: "Gujarat",
    date: "12/07/2025",
    status: "Approved",
  },
  {
    title: "Illegal Dumping",
    region: "Kerala",
    date: "20/08/2025",
    status: "Pending",
  },
  {
    title: "Mangrove Fire",
    region: "Maharashtra",
    date: "05/09/2025",
    status: "Rejected",
  },
  {
    title: "Pollution Alert",
    region: "Odisha",
    date: "10/09/2025",
    status: "Approved",
  },
];

// All Available Badges
const allBadges = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Starter",
    desc: "Achieved after submitting your first report",
    milestone: "1 Submission",
  },
  {
    icon: <TreePine className="w-8 h-8" />,
    title: "Grower",
    desc: "Achieved after submitting 10 reports",
    milestone: "10 Submissions",
  },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "Guardian",
    desc: "Achieved after contributing in 3 regions",
    milestone: "3 Regions",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Protector",
    desc: "Achieved after 5 approved reports",
    milestone: "5 Approved",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Achiever",
    desc: "Achieved after submitting 25 reports",
    milestone: "25 Submissions",
  },
  {
    icon: <Medal className="w-8 h-8" />,
    title: "Legend",
    desc: "Achieved after submitting 50 reports",
    milestone: "50 Submissions",
  },
];

// Earned Badges
const myBadges = [allBadges[0], allBadges[3], allBadges[1]];

// Heatmap Dummy Data
const months = [
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
];
const days = ["Mon", "Wed", "Fri"];

export default function ProfilePage() {
  return (
    <div className="min-h-screen  p-6">
      {/* Profile Header */}
      <div className="flex gap-6 mb-12">
        <img
          src="https://via.placeholder.com/200"
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-green-600 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">Sarvak Makani</h1>
          <p className="text-gray-400">@sarvakmakani</p>
          <p className="text-sm text-gray-400 mt-2">sarvakmakani@gmail.com</p>
        </div>
      </div>

      {/* Contributions */}
      <h2 className="text-xl font-semibold text-white mb-4">My Contribution</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {reports.map((r, i) => (
          <div
            key={i}
            className="bg-[#161b22] border border-gray-700 p-4 rounded-xl hover:border-green-600 transition"
          >
            <h3 className="text-lg font-semibold text-green-400">{r.title}</h3>
            <p className="text-gray-400 text-sm">{r.region}</p>
            <p className="text-xs text-gray-500">Date: {r.date}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                r.status === "Approved"
                  ? "bg-green-600 text-white"
                  : r.status === "Pending"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-600 text-white"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <h2 className="text-xl font-semibold text-white mb-4">
         Contributions in the Last Year
      </h2>
      <div className="bg-[#161b22] border border-gray-700 p-4 rounded-xl mb-12">
        {/* Months */}
        <div className="grid grid-cols-12 gap-1 mb-2">
          {months.map((m, idx) => (
            <span key={idx} className="text-xs text-gray-400 text-center">
              {m}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Days */}
          <div className="flex flex-col justify-between mr-2 text-xs text-gray-400">
            {days.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="grid grid-cols-52 grid-rows-7 gap-1">
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              // Instead of random, generate controlled distribution
              const rand = Math.random();
              let intensity = 0; // default (empty)
              if (rand > 0.85) intensity = 3; // rare bright green
              else if (rand > 0.7) intensity = 2;
              else if (rand > 0.55) intensity = 1;
              // 55% chance stays empty (gray)

              const colors = [
                "bg-gray-600", // 0 - empty
                "bg-green-900", // 1 - low
                "bg-green-600", // 2 - medium
                "bg-green-400", // 3 - high
              ];

              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${colors[intensity]}`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-2 mt-2 text-xs text-gray-400">
          <span>Less</span>
          <div className="w-3 h-3 bg-gray-700"></div>
          <div className="w-3 h-3 bg-green-900"></div>
          <div className="w-3 h-3 bg-green-600"></div>
          <div className="w-3 h-3 bg-green-400"></div>
          <span>More</span>
        </div>
      </div>

      {/* All Badges */}
      <h2 className="text-xl font-semibold text-white mb-4">
         Contribution Journey
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {allBadges.map((badge, idx) => (
          <div
            key={idx}
            className="bg-[#161b22] p-6 rounded-xl border border-gray-700 text-center shadow-md"
          >
            <div className="w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center shadow-inner bg-beige-200 border-green-600 text-green-800">
              {badge.icon}
            </div>
            <h3 className="text-lg font-bold mt-4 text-white">{badge.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{badge.desc}</p>
            <p className="text-xs text-gray-400 mt-2 italic">
               Milestone: {badge.milestone}
            </p>
          </div>
        ))}
      </div>

      {/* My Badges */}
      <h2 className="text-xl font-semibold text-white mb-4"> My Badges</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {myBadges.map((badge, idx) => (
          <div
            key={idx}
            className="bg-[#161b22] p-6 rounded-xl border border-green-600 text-center shadow-md"
          >
            <div className="w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center shadow-inner bg-green-200 border-green-700 text-green-900">
              {badge.icon}
            </div>
            <h3 className="text-lg font-bold mt-4 text-white">{badge.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{badge.desc}</p>
            <p className="text-xs text-gray-400 mt-2 italic">
               {badge.milestone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
