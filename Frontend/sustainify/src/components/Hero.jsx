"use client";
import Image from "next/image";
import Link from "next/link";
import mangroove from '@/public/mangroove.jpg'

export default function Hero() {
  return (
    <section className="relative isolate min-h-[70vh] w-full overflow-hidden">
      {/* Banner image (put a file at /public/hero-mangrove.jpg) */}
      <Image
        // src={mangroove}
        alt="Mangrove forest along a coastal shoreline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 md:py-24">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
          Introducing <strong className="ml-1 font-semibold">BioGroves</strong>
        </span>

        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Protect Mangroves. <br className="hidden sm:block" />
          <span className="text-[#F5F5DC]">Report, Earn, Make Impact.</span>
        </h1>

        <p className="max-w-2xl text-base text-white/90 sm:text-lg">
          A community-powered platform to report threats, track saved coastal lands,
          and earn badges & certificates for real conservation impact.
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/submit-report"
            className="inline-flex items-center justify-center rounded-lg bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256a2b] focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Submit a new mangrove incident report"
          >
            Submit Report
          </Link>

          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center rounded-lg bg-[#F5F5DC] px-5 py-3 text-sm font-semibold text-[#2E7D32] transition hover:bg-[#ebe7cf] focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="View leaderboard and top contributors"
          >
            View Leaderboard
          </Link>
        </div>

        {/* Quick trust stats (optional, looks great under hero) */}
        <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-4 rounded-xl bg-white/10 p-4 text-white backdrop-blur sm:grid-cols-3">
          <Stat label="Reports Submitted" value="1,248+" />
          <Stat label="Hectares Protected" value="112+" />
          <Stat label="Active Guardians" value="530+" className="" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
