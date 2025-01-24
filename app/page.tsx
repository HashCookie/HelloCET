import Features from "@/app/components/Homepage/Features";
import Header from "@/app/components/Homepage/Header";
import HeroSection from "@/app/components/Homepage/HeroSection";
import QuickStart from "@/app/components/Homepage/QuickStart";
import Statistics from "@/app/components/Statistics";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <HeroSection />
      <Features />
      <Statistics />
      <QuickStart />
      <footer className="bg-gray-50 text-center text-sm text-gray-500">
        <p>© 2024 HelloCET. All rights reserved.</p>
      </footer>
    </div>
  );
}
