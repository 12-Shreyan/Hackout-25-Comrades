import Awareness from "@/components/Awareness";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Leaderboard from "@/components/Leaderboard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Leaderboard />
      <HowItWorks />
      <Awareness />
      {/* other sections below… */}
    </>
  );
}
