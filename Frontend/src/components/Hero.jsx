"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Leaf, Users } from "lucide-react";
import mangroove from "@/public/ref3.jpg";

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Banner image */}
      <Image
        src={mangroove}
        alt="Mangrove forest along a coastal shoreline"
        fill
        priority
        sizes="200vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:px-10 md:py-28">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur animate-fadeUpScale">
          Introducing <strong className="ml-1 font-semibold">BioGroves</strong>
        </span>

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl animate-fadeUpScale delay-100">
          Protect Mangroves. <br className="hidden sm:block" />
          <span className="text-[#F5F5DC]">Report, Earn, Make Impact.</span>
        </h1>

        <p className="max-w-2xl text-base text-white/90 sm:text-lg animate-fadeUpScale delay-200">
          A community-driven platform to report threats, track saved coastal lands, and earn badges & certificates for real conservation impact.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-4 animate-fadeUpScale delay-300">
          <Link
            href="/submit-report"
            className="inline-flex items-center justify-center rounded-lg bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white transition transform hover:scale-105 hover:bg-[#256a2b] focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Submit Report
          </Link>

          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center rounded-lg bg-[#F5F5DC] px-6 py-3 text-sm font-semibold text-[#2E7D32] transition transform hover:scale-105 hover:bg-[#ebe7cf] focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            View Leaderboard
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 rounded-xl bg-white/10 p-5 text-white backdrop-blur-lg shadow-lg sm:grid-cols-3 animate-fadeUpScale delay-400">
          <Stat
            icon={<CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />}
            label="Reports Submitted"
            value="1,248+"
          />
          <Stat
            icon={<Leaf className="w-6 h-6 text-green-400 animate-bounce delay-100" />}
            label="Hectares Protected"
            value="112+"
          />
          <Stat
            icon={<Users className="w-6 h-6 text-green-400 animate-bounce delay-200" />}
            label="Active Guardians"
            value="530+"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center transition transform hover:scale-105">
      <div className="mb-2">{icon}</div>
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
