import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
      </main>
    </div>
  );
}
