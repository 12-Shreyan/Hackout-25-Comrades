"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Capture & Report",
      description:
        "Take a photo of the mangrove issue (cutting, dumping, etc.) and upload it with one click from our website or mobile app.",
    },
    {
      number: "2",
      title: "Add Location",
      description:
        "Your report is automatically geotagged, so authorities and NGOs know the exact location of the incident.",
    },
    {
      number: "3",
      title: "Submit Easily",
      description:
        "Just hit submit! Your report is safely stored and shared with relevant agencies for action.",
    },
    {
      number: "4",
      title: "Get Recognized",
      description:
        "Earn badges, certificates, and points for every report you make—celebrate your impact on saving mangroves!",
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
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
