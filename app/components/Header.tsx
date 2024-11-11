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
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="relative h-16 px-4 py-2 sm:px-10">
        <div className="relative flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
          <img src="/favicon.ico" alt="logo" className="w-12" />
          <button className="ml-auto lg:hidden" onClick={toggleMenu}>
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            className={`lg:ml-14 lg:flex lg:space-x-5 ${
              isMenuOpen ? "flex" : "hidden"
            } flex-col max-lg:w-full max-lg:py-4 lg:flex-row lg:items-center`}
          >
            <li className="px-3 max-lg:border-b max-lg:py-2">
              <Link
                href="/cet4"
                className="block text-[15px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                CET4
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-2">
              <Link
                href="/cet6"
                className="block text-[15px] font-semibold text-gray-600 transition-colors hover:text-blue-600"
              >
                CET6
              </Link>
            </li>
            <li className="relative px-3 max-lg:border-b max-lg:py-2">
              <button
                onClick={togglePracticeMenu}
                className="block text-[15px] font-semibold text-gray-600 transition-colors hover:text-blue-600"
              >
                专项练习
              </button>
              {isPracticeMenuOpen && (
                <div className="absolute left-0 mt-2 overflow-hidden rounded-lg bg-white/95 shadow-lg backdrop-blur-sm">
                  <Link
                    href="/practice/writing"
                    className="block px-4 py-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    写作
                  </Link>
                  <Link
                    href="/practice/listening"
                    className="block px-4 py-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    听力
                  </Link>
                  <Link
                    href="/practice/reading"
                    className="block px-4 py-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    阅读理解
                  </Link>
                  <Link
                    href="/practice/ctoe"
                    className="block px-4 py-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    翻译
                  </Link>
                </div>
              )}
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-2">
              <Link
                href="/feedback"
                className="block text-[15px] font-semibold text-gray-600 transition-colors hover:text-blue-600"
              >
                反馈
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-2">
              <Link
                href="/scores"
                className="block text-[15px] font-semibold text-gray-600 transition-colors hover:text-blue-600"
              >
                数据记录
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
