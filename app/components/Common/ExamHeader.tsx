import ExamTabs from "./ExamTabs";
import ControlButtons from "./ControlButtons";
import { useState, useEffect } from "react";
import type { Answers } from "@/app/types/answers";

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
  readOnly?: boolean;
  examType: string;
}

interface ScoreData {
  type: string;
  score: number;
  answer?: string;
  answers?: Record<number, string>;
  attemptId?: string;
  completedQuestions?: number;
  date?: string;
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
  readOnly,
  examType,
}: ExamHeaderProps) => {
  const [scores, setScores] = useState<{ [key: string]: number }>({
    writing: 0,
    listening: 0,
    reading: 0,
    translation: 0,
  });
  const sections = ["writing", "listening", "reading", "translation"] as const;
  const sectionNames: Record<string, string> = {
    writing: "写作",
    listening: "听力",
    reading: "阅读",
    translation: "翻译",
  };

  const totalScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );

  useEffect(() => {
    if (readOnly) {
      const allScores = {
        writing: JSON.parse(
          localStorage.getItem("writingScores") || "[]"
        ) as ScoreData[],
        listening: JSON.parse(
          localStorage.getItem("listeningScores") || "[]"
        ) as ScoreData[],
        reading: JSON.parse(
          localStorage.getItem("readingScores") || "[]"
        ) as ScoreData[],
        translation: JSON.parse(
          localStorage.getItem("translationScores") || "[]"
        ) as ScoreData[],
      };

      const paperTitle = `${year}年${month}月大学英语${examType}真题（卷${set}）`;
      const findScore = (scores: ScoreData[]) => {
        const record = scores.find((s) => s.type === paperTitle);
        return record?.score || 0;
      };

      setScores({
        writing: findScore(allScores.writing),
        listening: findScore(allScores.listening),
        reading: findScore(allScores.reading),
        translation: findScore(allScores.translation),
      });
    }
  }, [readOnly, year, month, set, examType]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
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
            {readOnly && (
              <div className="ml-auto text-sm text-gray-500">
                {sections.map((section) => (
                  <span key={section} className="mr-4">
                    {sectionNames[section]}:
                    <span
                      className={`font-medium ${scores[section] > 0 ? "text-blue-600" : "text-gray-400"}`}
                    >
                      {scores[section].toFixed(1)}分
                    </span>
                  </span>
                ))}
                <span className="mr-4">
                  总分:
                  <span
                    className={`font-medium ${totalScore > 0 ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {totalScore.toFixed(1)}分
                  </span>
                </span>
              </div>
            )}
          </div>
          {!readOnly && (
            <ControlButtons
              onReset={onReset}
              year={year}
              month={month}
              set={set}
              answers={answers}
            />
          )}
        </div>
        <ExamTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default ExamHeader;
