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
  year,
  month,
  set,
  answers,
}: ExamHeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-4 pt-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
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
