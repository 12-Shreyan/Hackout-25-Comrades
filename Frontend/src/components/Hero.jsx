"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";
import mangroove from "@/public/ref3.jpg";

export default function Hero() {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
  };

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
      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:px-10 md:py-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur"
          variants={item}
        >
          Introducing <strong className="ml-1 font-semibold">BioGroves</strong>
        </motion.span>

        <motion.h1
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          variants={item}
        >
          Protect Mangroves. <br className="hidden sm:block" />
          <span className="text-[#F5F5DC]">Report, Earn, Make Impact.</span>
        </motion.h1>

        <motion.p className="max-w-2xl text-base text-white/90 sm:text-lg" variants={item}>
          A community-driven platform to report threats, track saved coastal lands,
          and earn badges & certificates for real conservation impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="mt-6 flex flex-wrap items-center gap-4" variants={item}>
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
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 rounded-xl bg-white/10 p-5 text-white backdrop-blur-lg shadow-lg sm:grid-cols-3">
          <Stat icon={<CheckCircle className="w-6 h-6 text-green-400" />} label="Reports Submitted" value="1,248+" />
          <Stat icon={<Leaf className="w-6 h-6 text-green-400" />} label="Hectares Protected" value="112+" />
          <Stat icon={<Users className="w-6 h-6 text-green-400" />} label="Active Guardians" value="530+" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ icon, label, value }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center transition transform hover:scale-105"
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-xs text-white/80">{label}</span>
    </motion.div>
  );
}
