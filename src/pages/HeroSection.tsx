import React from "react";

type Props = {};

const HeroSection: React.FC<Props> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-purple-900 font-[sans-serif]">
      <div className="w-full max-w-screen-xl px-4 py-16 sm:px-6 lg:py-32 lg:px-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-none">
            Welcome to
            <br className="hidden lg:inline-block" />
            <span className="text-indigo-400"> LanguageLadder</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:mt-5 lg:max-w-3xl text-gray-300 mx-auto lg:mx-0">
            一个在线四六级练习平台是一个专门为准备参加大学英语四级和六级考试的学生设计的网站。
          </p>
          <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-indigo-600 bg-white hover:text-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
                Get Started
              </button>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition duration-150 ease-in-out">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
