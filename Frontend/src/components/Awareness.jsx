"use client";
import React from "react";
import { Shield, Leaf, CloudRain, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Awareness() {
  const facts = [
    {
      icon: <Shield className="w-12 h-12 text-green-700 mb-4" />,
      title: "Protects Coastal Communities",
      description:
        "Mangroves act as natural barriers against storms, tidal surges, and erosion, reducing damage to homes, infrastructure, and livelihoods. Protecting them directly safeguards human lives and property.",
    },
    {
      icon: <Leaf className="w-12 h-12 text-green-700 mb-4" />,
      title: "Supports Biodiversity",
      description:
        "These forests are home to fish, crabs, birds, and countless other species. Conserving mangroves helps maintain ecological balance and ensures sustainable fisheries and local food security.",
    },
    {
      icon: <CloudRain className="w-12 h-12 text-green-700 mb-4" />,
      title: "Mitigates Climate Change",
      description:
        "Mangroves absorb and store large amounts of carbon dioxide, acting as natural carbon sinks. Every protected hectare helps reduce greenhouse gases and fight global warming.",
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-green-700 mb-4" />,
      title: "Every Report Creates Impact",
      description:
        "By submitting reports, you help authorities identify threats and take action. Each report contributes to saving hectares of mangrove forests, preserving ecosystems, and creating a greener future.",
    },
  ];

  // Framer motion variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20  text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Mangroves Are Crucial
        </motion.h2>

        <motion.p
          className=" text-lg max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Mangroves are not just trees—they are <strong>lifelines</strong> for our coasts, communities, and climate.
          They protect us from natural disasters, provide livelihoods, store carbon, and sustain biodiversity.
          By reporting threats and participating in BioGroves, you make a <strong>real-world impact</strong> on the environment and society.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              {fact.icon}
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {fact.title}
              </h3>
              <p className="text-gray-600">{fact.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="/report"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition"
          >
            Start Reporting Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
