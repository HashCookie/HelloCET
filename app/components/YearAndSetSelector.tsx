"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Writing from "./Writing/Writing";
import ListeningComprehension from "./ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./ReadingComprehension/ReadingComprehension";
import Translation from "./CTOE/Translation";
import ExamSelector from "./Selector/ExamSelector";
import LoadingSpinner from "./Common/LoadingSpinner";
import ControlButtons from "./Common/ControlButtons";
import ExamTabs from "./Common/ExamTabs";
import { useExamData } from "@/app/hooks/useExamData";
import type { ExamPaper } from "@/app/types/exam";

interface PaperData {
  years: number[];
  months: number[];
  papers: {
    year: number;
    month: number;
    setCount: number;
  }[];
}

interface Answers {
  writing: string;
  listening: Record<number, string>;
  reading: Record<number, string>;
  translation: string;
}

type AnswerValue = Answers[keyof Answers];

const YearAndSetSelector = () => {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperData | null>(null);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<string>("");

  const [activeTab, setActiveTab] = useState("writing");

  const [answers, setAnswers] = useState<Answers>({
    writing: "",
    listening: {},
    reading: {},
    translation: "",
  });

  const { data: writingData, isLoading: writingLoading } = useExamData<
    Pick<ExamPaper, "writing">
  >("writing", selectedYear, selectedMonth, selectedSet);

  const { data: listeningData, isLoading: listeningLoading } = useExamData<
    Pick<ExamPaper, "listeningComprehension">
  >("listeningComprehension", selectedYear, selectedMonth, selectedSet);

  const { data: readingData, isLoading: readingLoading } = useExamData<
    Pick<ExamPaper, "readingComprehension">
  >("readingComprehension", selectedYear, selectedMonth, selectedSet);

  const { data: translationData, isLoading: translationLoading } = useExamData<
    Pick<ExamPaper, "translation">
  >("translation", selectedYear, selectedMonth, selectedSet);

  const fetchPaperInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();
      setPaperData(data[0]);
      setYears(data[0]?.years.sort((a: number, b: number) => a - b) || []);
    } catch (error) {
      console.error("获取试卷信息失败:", error);
    } finally {
      setIsLoading(false);
    }
  }, [examType]);

  useEffect(() => {
    fetchPaperInfo();
  }, [fetchPaperInfo]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth("");
    setSelectedSet("");
    if (year && paperData) {
      const availableMonths = paperData.papers
        .filter((p) => p.year === parseInt(year))
        .map((p) => p.month);
      setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedSet("");
    if (selectedYear && month && paperData) {
      const sets = paperData.papers.filter(
        (p) => p.year === parseInt(selectedYear) && p.month === parseInt(month)
      );
      setSetCount(sets[0]?.setCount || 0);
    }
  };

  const handleSetChange = (set: string) => {
    setSelectedSet(set);
  };

  const handleSubmit = () => {
    if (selectedYear && selectedMonth && selectedSet) {
      setShowControls(true);
      // TODO: 处理加载具体试卷数据的逻辑
    }
  };

  const handleReset = () => {
    setShowControls(false);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedSet("");
  };

  const handleAnswerChange = (
    section: keyof Answers,
    newAnswer: AnswerValue
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: newAnswer,
    }));
  };

  const renderExamContent = () => {
    switch (activeTab) {
      case "writing":
        return (
          <Writing
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            data={writingData}
            isLoading={writingLoading}
            answer={answers.writing}
            onAnswerChange={(value) => handleAnswerChange("writing", value)}
          />
        );
      case "listening":
        return (
          <ListeningComprehension
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            data={listeningData}
            isLoading={listeningLoading}
            answers={answers.listening}
            onAnswerChange={(value) => handleAnswerChange("listening", value)}
          />
        );
      case "reading":
        return (
          <ReadingComprehension
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            data={readingData}
            isLoading={readingLoading}
            answers={answers.reading}
            onAnswerChange={(value) => handleAnswerChange("reading", value)}
          />
        );
      case "translation":
        return (
          <Translation
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            data={translationData}
            isLoading={translationLoading}
            answer={answers.translation}
            onAnswerChange={(value) => handleAnswerChange("translation", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-[sans-serif] space-y-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : showControls ? (
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {selectedYear}年{selectedMonth}月大学英语{examType}真题（卷
              {selectedSet}）
            </h1>
            <ControlButtons
              onReset={handleReset}
              activeTab={activeTab}
              year={selectedYear}
              month={selectedMonth}
              set={selectedSet}
              answers={answers}
            />
          </div>

          <ExamTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mt-6 bg-white rounded-lg shadow-sm">
            {renderExamContent()}
          </div>
        </div>
      ) : (
        <ExamSelector
          years={years}
          months={months}
          setCount={setCount}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedSet={selectedSet}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onSetChange={handleSetChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default YearAndSetSelector;
