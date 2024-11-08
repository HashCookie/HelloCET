import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Statistics from "./components/Statistics";
import QuickStart from "./components/QuickStart";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <Features />
        <Statistics />
        <QuickStart />
      </main>
      <footer className="bg-gray-50 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 HelloCET. All rights reserved.</p>
      </footer>
    </div>
  );
}
