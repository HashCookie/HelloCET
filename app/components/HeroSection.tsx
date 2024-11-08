"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
          </div>
        </div>
      </div>
      <div className="relative text-center px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800 leading-none">
          Welcome to
          <br className="hidden lg:inline-block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HelloCET
          </span>
        </h1>
        <p className="mt-6 text-base text-gray-600 sm:text-lg md:mt-8 mx-auto max-w-lg md:max-w-3xl">
          为准备参加大学英语四级和六级考试的学生设计的在线测试网站。
        </p>
        <div className="mt-10">
          <button
            onClick={() => router.push("/cet4")}
            className="w-full sm:w-auto px-8 py-3 text-base rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            开始练习
          </button>
        </div>
      </div>
    </section>
  );
}
