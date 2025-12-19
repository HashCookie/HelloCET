"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute -top-10 -left-10 h-40 w-40 animate-blob rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl filter" />
          <div className="animation-delay-2000 absolute top-0 left-20 h-32 w-32 animate-blob rounded-full bg-indigo-200 opacity-70 mix-blend-multiply blur-xl filter" />
          <div className="animation-delay-4000 absolute right-20 bottom-0 h-40 w-40 animate-blob rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl filter" />
          <div className="absolute -right-10 -bottom-10 h-32 w-32 animate-blob rounded-full bg-pink-200 opacity-70 mix-blend-multiply blur-xl filter" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 mix-blend-multiply blur-3xl filter" />
          </div>
        </div>
      </div>
      <div className="relative px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-extrabold text-2xl text-gray-800 leading-none sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Welcome to
          <br className="hidden lg:inline-block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HelloCET
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base text-gray-600 sm:text-lg md:mt-8 md:max-w-3xl">
          为准备参加大学英语四级和六级考试的学生设计的在线测试网站。
        </p>
        <div className="mt-10">
          <button
            className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-base text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:w-auto"
            onClick={() => router.push("/cet4")}
          >
            开始练习
          </button>
        </div>
      </div>
    </section>
  );
}
