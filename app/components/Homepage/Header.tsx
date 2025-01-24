"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPracticeMenuOpen, setIsPracticeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="HelloCET Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="hidden text-xl font-bold text-gray-900 sm:block">
                HelloCET
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/cet4"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                CET4
              </Link>
              <Link
                href="/cet6"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                CET6
              </Link>

              {/* 专项练习下拉菜单 */}
              <div
                className="relative"
                onMouseEnter={() => setIsPracticeMenuOpen(true)}
                onMouseLeave={() => setIsPracticeMenuOpen(false)}
              >
                <button className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                  专项练习
                </button>
                {isPracticeMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link
                      href="/practice/writing"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    >
                      写作
                    </Link>
                    <Link
                      href="/practice/listening"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    >
                      听力
                    </Link>
                    <Link
                      href="/practice/reading"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    >
                      阅读理解
                    </Link>
                    <Link
                      href="/practice/ctoe"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    >
                      翻译
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/feedback"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                反馈
              </Link>
              <Link
                href="/scores"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                数据记录
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="sr-only">打开主菜单</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute left-0 top-16 w-full bg-white/95 shadow-sm backdrop-blur-sm`}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link
            href="/cet4"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            CET4
          </Link>
          <Link
            href="/cet6"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            CET6
          </Link>
          <button
            onClick={() => setIsPracticeMenuOpen(!isPracticeMenuOpen)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            专项练习
            <svg
              className={`h-5 w-5 transform transition-transform ${
                isPracticeMenuOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isPracticeMenuOpen && (
            <div className="ml-4 space-y-1 bg-white/95">
              <Link
                href="/practice/writing"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                写作
              </Link>
              <Link
                href="/practice/listening"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                听力
              </Link>
              <Link
                href="/practice/reading"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                阅读理解
              </Link>
              <Link
                href="/practice/ctoe"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                翻译
              </Link>
            </div>
          )}
          <Link
            href="/feedback"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            反馈
          </Link>
          <Link
            href="/scores"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            数据记录
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
