import { useNavigate } from "react-router-dom";
import TypingAnimation from "../components/magicui/typing-animation";

type Props = {};

const HeroSection: React.FC<Props> = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/cet4");
  };

  return (
    <header className="h-screen bg-no-repeat bg-cover flex items-center justify-center">
      <div className="text-center px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-500 leading-none">
          Welcome to
          <br className="hidden lg:inline-block" />
          <span className="text-indigo-300">
            <TypingAnimation text="HelloCET" />
          </span>
        </h1>
        <p className="mt-6 text-base text-gray-500 sm:text-lg md:mt-8 mx-auto max-w-lg md:max-w-3xl">
          一个在线四六级练习平台专门为准备参加大学英语四级和六级考试的学生设计的在线测试网站。
        </p>
        <div className="mt-10">
          <button
            className="w-full rounded sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={handleGetStartedClick}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
