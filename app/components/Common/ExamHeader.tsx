import ExamTabs from "./ExamTabs";
import ControlButtons from "./ControlButtons";

interface Answers {
  writing: string;
  listening: Record<number, string>;
  reading: Record<number, string>;
  translation: string;
}

interface ExamHeaderProps {
  title: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onReset: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  year: string;
  month: string;
  set: string;
  answers: Answers;
}

const ExamHeader = ({
  title,
  activeTab,
  onTabChange,
  onReset,
  onBack,
  showBackButton = false,
  year,
  month,
  set,
  answers,
}: ExamHeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-4 pt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <ControlButtons
            onReset={onReset}
            year={year}
            month={month}
            set={set}
            answers={answers}
          />
        </div>
        <ExamTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default ExamHeader;
