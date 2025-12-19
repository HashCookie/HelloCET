"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPracticeMenuOpen, setIsPracticeMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center space-x-2" href="/">
              <Image
                alt="HelloCET Logo"
                className="rounded-lg"
                height={40}
                src="/favicon.ico"
                width={40}
              />
              <span className="hidden font-bold text-gray-900 text-xl sm:block">
                HelloCET
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link
                className="font-medium text-gray-700 text-sm transition-colors hover:text-blue-600"
                href="/cet4"
              >
                CET4
              </Link>
              <Link
                className="font-medium text-gray-700 text-sm transition-colors hover:text-blue-600"
                href="/cet6"
              >
                CET6
              </Link>

              {/* 专项练习下拉菜单 */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  setIsPracticeMenuOpen(true);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setIsPracticeMenuOpen(false);
                  }, 200);
                }}
              >
                <button className="font-medium text-gray-700 text-sm transition-colors hover:text-blue-600">
                  专项练习
                </button>
                {isPracticeMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link
                      className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                      href="/practice/writing"
                    >
                      写作
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                      href="/practice/listening"
                    >
                      听力
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                      href="/practice/reading"
                    >
                      阅读理解
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
                      href="/practice/ctoe"
                    >
                      翻译
                    </Link>
                  </div>
                )}
              </div>

              <Link
                className="font-medium text-gray-700 text-sm transition-colors hover:text-blue-600"
                href="/feedback"
              >
                反馈
              </Link>
              <Link
                className="font-medium text-gray-700 text-sm transition-colors hover:text-blue-600"
                href="/scores"
              >
                数据记录
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">打开主菜单</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white/95 shadow-sm backdrop-blur-sm`}
      >
        <div className="space-y-1 px-4 pt-2 pb-3">
          <Link
            className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            href="/cet4"
          >
            CET4
          </Link>
          <Link
            className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            href="/cet6"
          >
            CET6
          </Link>
          <button
            className="flex w-full items-center justify-between rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            onClick={() => setIsPracticeMenuOpen(!isPracticeMenuOpen)}
          >
            专项练习
            <svg
              className={`h-5 w-5 transform transition-transform ${
                isPracticeMenuOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                fillRule="evenodd"
              />
            </svg>
          </button>
          {isPracticeMenuOpen && (
            <div className="ml-4 space-y-1 bg-white/95">
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                href="/practice/writing"
              >
                写作
              </Link>
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                href="/practice/listening"
              >
                听力
              </Link>
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                href="/practice/reading"
              >
                阅读理解
              </Link>
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                href="/practice/ctoe"
              >
                翻译
              </Link>
            </div>
          )}
          <Link
            className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            href="/feedback"
          >
            反馈
          </Link>
          <Link
            className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            href="/scores"
          >
            数据记录
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
