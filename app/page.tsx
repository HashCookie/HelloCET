import Features from "@/app/components/Homepage/Features";
import Header from "@/app/components/Homepage/Header";
import HeroSection from "@/app/components/Homepage/HeroSection";
import QuickStart from "@/app/components/Homepage/QuickStart";
import Statistics from "@/app/components/Statistics";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <Features />
        <Statistics />
        <QuickStart />
      </main>
      <footer className="bg-gray-50 py-8 text-center text-sm text-gray-500">
        <p>© 2024 HelloCET. All rights reserved.</p>
      </footer>
    </div>
  );
}
