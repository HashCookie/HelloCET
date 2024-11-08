"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-500 leading-none">
          Welcome to
          <br className="hidden lg:inline-block" />
          <span className="text-indigo-300">HelloCET</span>
        </h1>
        <p className="mt-6 text-base text-gray-500 sm:text-lg md:mt-8 mx-auto max-w-lg md:max-w-3xl">
          为准备参加大学英语四级和六级考试的学生设计的在线测试网站。
        </p>
        <div className="mt-10">
          <button
            onClick={() => router.push("/cet4")}
            className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base sm:px-8 sm:py-3 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
