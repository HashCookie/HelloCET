import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Statistics from "./components/Statistics";
import QuickStart from "./components/QuickStart";

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
