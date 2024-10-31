"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPracticeMenuOpen, setIsPracticeMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePracticeMenu = () => {
    setIsPracticeMenuOpen(!isPracticeMenuOpen);
  };

  return (
    <header className="py-2 px-4 sm:px-10 bg-white h-16">
      <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
        <img src="/favicon.ico" alt="logo" className="w-12 z-10" />
        <button className="lg:hidden ml-auto z-10" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul
          id="collapseMenu"
          className={`lg:flex lg:ml-14 lg:space-x-5 z-10 ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex-row lg:items-center max-lg:py-4 max-lg:w-full z-10`}
        >
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              href="/cet4"
              className="text-[#007bff] block font-semibold text-[15px]"
            >
              CET4
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              href="/cet6"
              className="text-gray-500 block font-semibold text-[15px]"
            >
              CET6
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 relative">
            <button
              onClick={togglePracticeMenu}
              className="text-gray-500 block font-semibold text-[15px]"
            >
              专项练习
            </button>
            {isPracticeMenuOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-md">
                <Link
                  href="/practice/writing"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  写作
                </Link>
                <Link
                  href="/practice/listening"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  听力
                </Link>
                <Link
                  href="/practice/reading"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  阅读理解
                </Link>
                <Link
                  href="/practice/ctoe"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  翻译
                </Link>
              </div>
            )}
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              href="/feedback"
              className="text-gray-500 block font-semibold text-[15px]"
            >
              反馈
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              href="/scores"
              className="text-gray-500 block font-semibold text-[15px]"
            >
              数据记录
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
