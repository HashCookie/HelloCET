import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <header className="border-b py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
        <img src="/CET.svg" alt="logo" className="w-12" />
        <button id="toggle" className="lg:hidden ml-auto" onClick={toggleMenu}>
          <svg
            className="w-7 h-7"
            fill="#000"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul
          id="collapseMenu"
          className={`lg:flex lg:ml-14 lg:space-x-5 ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex-row lg:items-center max-lg:py-4 max-lg:w-full`}
        >
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              to="/cet4"
              className="text-[#007bff] block font-semibold text-[15px]"
            >
              CET4
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              to="/cet6"
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
                  to="/practice/writing"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  写作
                </Link>
                <Link
                  to="/practice/listening"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  听力
                </Link>
                <Link
                  to="/practice/ReadingComprehension"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  阅读理解
                </Link>
                <Link
                  to="/practice/Translation"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  翻译
                </Link>
              </div>
            )}
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              to="/feedback"
              className="text-gray-500 block font-semibold text-[15px]"
            >
              反馈
            </Link>
          </li>
        </ul>
        <div className="flex lg:ml-auto max-lg:w-full">
          <div className="flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#007bff]">
            <input
              type="text"
              placeholder="搜索试卷"
              className="w-full text-sm bg-transparent rounded outline-none pr-2"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="cursor-pointer fill-gray-400"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
