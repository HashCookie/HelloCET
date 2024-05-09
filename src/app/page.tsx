import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <HeroSection />
    </div>
  );
}
