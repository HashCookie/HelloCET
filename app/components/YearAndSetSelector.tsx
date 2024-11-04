"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Writing from "./Writing/Writing";
import ListeningComprehension from "./ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./ReadingComprehension/ReadingComprehension";
import Translation from "./CTOE/Translation";
import ExamSelector from "./Selector/ExamSelector";
import LoadingSpinner from "./Common/LoadingSpinner";
import { useExamData } from "@/app/hooks/useExamData";
import type { ExamPaper } from "@/app/types/exam";
import ExamHeader from "./Common/ExamHeader";
import { examStorage } from "@/app/utils/storage";

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
  const [scrollPositions, setScrollPositions] = useState({
    writing: 0,
    listening: 0,
    reading: 0,
    translation: 0,
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

  useEffect(() => {
    const savedState = examStorage.getState();
    const savedAnswers = examStorage.getAnswers();
    
    if (savedState) {
      setSelectedYear(savedState.year);
      setSelectedMonth(savedState.month);
      setSelectedSet(savedState.set);
      setShowControls(savedState.showControls);
      setActiveTab(savedState.activeTab);
    }
    
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    if (!paperData || !selectedYear) return;

    const availableMonths = paperData.papers
      .filter((p) => p.year === parseInt(selectedYear))
      .map((p) => p.month);
    setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));

    if (selectedMonth) {
      const sets = paperData.papers.filter(
        (p) => 
          p.year === parseInt(selectedYear) && 
          p.month === parseInt(selectedMonth)
      );
      setSetCount(sets[0]?.setCount || 0);
    }
  }, [paperData, selectedYear, selectedMonth]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth("");
    setSelectedSet("");
    setActiveTab("writing");
    setAnswers({
      writing: "",
      listening: {},
      reading: {},
      translation: "",
    });
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
      setActiveTab("writing");
      examStorage.saveState({
        year: selectedYear,
        month: selectedMonth,
        set: selectedSet,
        showControls: true,
        activeTab: "writing"
      });
    }
  };

  const handleReset = () => {
    setShowControls(false);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedSet("");
    setActiveTab("writing");
    setAnswers({
      writing: "",
      listening: {},
      reading: {},
      translation: "",
    });
    examStorage.clearExamData();
  };

  const handleAnswerChange = (
    section: keyof Answers,
    newAnswer: AnswerValue
  ) => {
    setAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [section]: newAnswer,
      };
      examStorage.saveAnswers(updatedAnswers);
      return updatedAnswers;
    });
  };

  const handleTabChange = (tab: string) => {
    setScrollPositions((prev) => ({
      ...prev,
      [activeTab]: window.scrollY,
    }));
    setActiveTab(tab);
    examStorage.saveState({
      year: selectedYear,
      month: selectedMonth,
      set: selectedSet,
      showControls: true,
      activeTab: tab
    });
    setTimeout(() => {
      window.scrollTo(0, scrollPositions[tab as keyof typeof scrollPositions]);
    }, 0);
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
    <div className="font-[sans-serif]">
      {isLoading ? (
        <LoadingSpinner />
      ) : showControls ? (
        <div>
          <ExamHeader
            title={`${selectedYear}年${selectedMonth}月大学英语${examType}真题（卷${selectedSet}）`}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onReset={handleReset}
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            answers={answers}
          />
          <div className="pt-28 max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm">
              {renderExamContent()}
            </div>
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
