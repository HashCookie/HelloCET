import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import Features from "@/app/components/Features";
import Statistics from "@/app/components/Statistics";
import QuickStart from "@/app/components/QuickStart";

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
