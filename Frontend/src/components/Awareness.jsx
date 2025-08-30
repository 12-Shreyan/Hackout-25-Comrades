import React from "react";
import { Shield, Leaf, CloudRain, BarChart2 } from "lucide-react";

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

  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          Why Mangroves Are Crucial
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
          Mangroves are not just trees—they are **lifelines** for our coasts, communities, and climate.
          They protect us from natural disasters, provide livelihoods, store carbon, and sustain biodiversity.
          By reporting threats and participating in BioGroves, you make a **real-world impact** on the environment and society.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {fact.icon}
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {fact.title}
              </h3>
              <p className="text-gray-600">{fact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/report"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition"
          >
            Start Reporting Now
          </a>
        </div>
      </div>
    </section>
  );
}
