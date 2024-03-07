import React from "react";

type Props = {};

const HeroSection: React.FC<Props> = () => {
  return (
    <header
      className="h-screen bg-no-repeat bg-cover flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg-effect.svg')",
      }}
    >
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-500 leading-none">
          Welcome to
          <br className="hidden lg:inline-block" />
          <span className="text-indigo-300"> LanguageLadder</span>
        </h1>
        <p className="mt-6 text-base text-gray-500 sm:text-lg md:mt-8 mx-auto max-w-lg md:max-w-3xl">
          一个在线四六级练习平台专门为准备参加大学英语四级和六级考试的学生设计的在线测试网站。
        </p>
        <div className="mt-10">
          <button className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
            Get started today
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
