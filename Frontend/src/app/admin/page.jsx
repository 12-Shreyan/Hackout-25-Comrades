"use client";

import React, { useMemo, useState } from "react";
import {
  Menu,
  ShieldCheck,
  Users,
  FileText,
  BadgeCheck,
  BarChart3,
  Settings,
  CheckCircle2,
  XCircle,
  Crown,
  Calendar,
  Check,
  X,
} from "lucide-react";

// ---------------------------------------------
// THEME
// ---------------------------------------------
const theme = {
  bg: "#F5F5DC",
  card: "#ffffff",
  ink: "#0d1117",
  primary: "#2E7D32",
  primaryMuted: "#a7d7ac",
  border: "#d9d4c7",
  soft: "#f8f7f1",
};

// ---------------------------------------------
// SAMPLE DATA
// ---------------------------------------------
const sampleUsers = [
  { id: 1, name: "Amit Sharma", reports: 42 },
  { id: 2, name: "Neha Patel", reports: 37 },
  { id: 3, name: "Rahul Verma", reports: 29 },
];

const sampleReports = [
  { id: 1001, title: "Mangrove Cutting", reporter: "Amit Sharma", region: "Gujarat", date: "2025-07-12", status: "pending" },
  { id: 1002, title: "Illegal Dumping", reporter: "Neha Patel", region: "Kerala", date: "2025-08-20", status: "approved" },
  { id: 1005, title: "Cutting – New", reporter: "Amit Sharma", region: "Gujarat", date: "2025-08-29", status: "pending" },
];

const leaderboardData = [
  { rank: 1, user: "Amit Sharma", points: 150 },
  { rank: 2, user: "Neha Patel", points: 120 },
  { rank: 3, user: "Rahul Verma", points: 100 },
];

// ---------------------------------------------
// UTILS
// ---------------------------------------------
const classNames = (...arr) => arr.filter(Boolean).join(" ");

// ---------------------------------------------
// REUSABLES
// ---------------------------------------------
function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-2xl shadow-sm border" style={{ background: theme.card, borderColor: theme.border }}>
      <div className="p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: theme.primaryMuted }}>
          {icon}
        </div>
        <div>
          <div className="text-sm" style={{ color: theme.ink }}>{label}</div>
          <div className="text-2xl font-bold" style={{ color: theme.primary }}>{value}</div>
          {sub && <div className="text-xs text-gray-500">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold" style={{ color: theme.primary }}>{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

// ---------------------------------------------
// MAIN ADMIN PANEL
// ---------------------------------------------
export default function AdminPanel() {
  const [navOpen, setNavOpen] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [reports, setReports] = useState(sampleReports);

  const counts = useMemo(() => {
    const t = reports.length;
    const p = reports.filter((r) => r.status === "pending").length;
    const a = reports.filter((r) => r.status === "approved").length;
    const rj = reports.filter((r) => r.status === "rejected").length;
    return { total: t, pending: p, approved: a, rejected: rj };
  }, [reports]);

  const handleVerify = (id) => {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" } : r));
  };

  const handleReject = (id) => {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" } : r));
  };

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.ink }}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b" style={{ background: theme.card, borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button className="md:hidden p-2 rounded-lg" onClick={() => setNavOpen((v) => !v)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" color={theme.primary} />
            <span className="font-semibold" style={{ color: theme.primary }}>Admin Panel</span>
          </div>
          <div className="ml-auto text-sm flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" /> {new Date().toLocaleDateString()}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
        {/* SIDEBAR */}
        <aside className={classNames("md:block", navOpen ? "block" : "hidden")}>
          <nav className="rounded-2xl border p-3" style={{ background: theme.card, borderColor: theme.border }}>
            {[
              { key: "dashboard", label: "Dashboard", icon: <ShieldCheck className="w-4 h-4" /> },
              { key: "reports", label: "Reports", icon: <FileText className="w-4 h-4" /> },
              { key: "leaderboard", label: "Leaderboard", icon: <Crown className="w-4 h-4" /> },
              { key: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={classNames(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm mb-1",
                  tab === item.key ? "bg-green-100 text-green-900" : "hover:bg-gray-50"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="space-y-8">
          {tab === "dashboard" && (
            <section>
              <SectionHeader title="Overview" subtitle="Realtime status of reports and users" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<FileText className="text-green-800" />} label="Total Reports" value={counts.total} sub={`${counts.pending} pending`} />
                <StatCard icon={<CheckCircle2 className="text-green-800" />} label="Approved" value={counts.approved} sub="This month" />
                <StatCard icon={<XCircle className="text-green-800" />} label="Rejected" value={counts.rejected} sub="Needs review" />
                <StatCard icon={<Users className="text-green-800" />} label="Active Users" value={sampleUsers.length} sub="Last 24h" />
              </div>
            </section>
          )}

          {tab === "reports" && (
            <section>
              <SectionHeader title="Pending Reports" subtitle="Verify or reject reports submitted by users" />
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 rounded-2xl shadow border" style={{ background: theme.card, borderColor: theme.border }}>
                    <h4 className="font-semibold text-lg">{report.title}</h4>
                    <p className="text-sm text-gray-500">Reporter: {report.reporter}</p>
                    <p className="text-sm text-gray-500">Region: {report.region}</p>
                    <p className={`mt-2 font-semibold ${report.status === "approved" ? "text-green-600" : report.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                      Status: {report.status}
                    </p>
                    {report.status === "pending" && (
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => handleVerify(report.id)} className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          <Check size={16} /> Verify
                        </button>
                        <button onClick={() => handleReject(report.id)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          <X size={16} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "leaderboard" && (
            <section>
              <SectionHeader title="Leaderboard" subtitle="Top contributors based on verified reports" />
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaderboardData.map((item) => (
                  <div key={item.rank} className="p-4 rounded-2xl shadow border flex flex-col items-center" style={{ background: theme.card, borderColor: theme.border }}>
                    <Crown className="w-6 h-6 text-yellow-600 mb-2" />
                    <p className="font-semibold text-lg">{item.user}</p>
                    <p className="text-gray-500">{item.points} Points</p>
                    <p className="text-gray-400">Rank #{item.rank}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
