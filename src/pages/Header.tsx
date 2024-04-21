import { useState } from "react";
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
    <header className="py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px]">
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
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Link
              to="/scores"
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
