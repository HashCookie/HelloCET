"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
import RecommendedExams from "./RecommendedExams";
import RecentPractice from "./RecentPractice";

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

const YearAndSelectorContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const INITIAL_ANSWERS = {
    writing: "",
    listening: {},
    reading: {},
    translation: "",
  };

  const INITIAL_SCROLL_POSITIONS = {
    writing: 0,
    listening: 0,
    reading: 0,
    translation: 0,
  };

  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [scrollPositions, setScrollPositions] = useState(
    INITIAL_SCROLL_POSITIONS
  );

  const [isReadOnly, setIsReadOnly] = useState(false);

  const [referenceAnswers, setReferenceAnswers] = useState({
    writing: "",
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

  useEffect(() => {
    const loadSavedData = async () => {
      const savedState = examStorage.getState();
      const savedAnswers = examStorage.getAnswers();

      if (savedState) {
        setSelectedYear(savedState.year);
        setSelectedMonth(savedState.month);
        setSelectedSet(savedState.set);
        setShowControls(savedState.showControls);
        setActiveTab(savedState.activeTab);
        setIsReadOnly(savedState.readOnly || false);
      }

      if (savedAnswers) {
        setAnswers(savedAnswers);
      }
    };

    loadSavedData();
  }, [searchParams]);

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

  const handleSubmit = useCallback(() => {
    if (selectedYear && selectedMonth && selectedSet) {
      setShowControls(true);
      examStorage.saveState({
        year: selectedYear,
        month: selectedMonth,
        set: selectedSet,
        showControls: true,
        activeTab,
      });
    }
  }, [selectedYear, selectedMonth, selectedSet, activeTab]);

  useEffect(() => {
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const set = searchParams.get("set");

    if (year && month && set) {
      setSelectedYear(year);
      setSelectedMonth(month);
      setSelectedSet(set);
      handleSubmit();
    }
  }, [searchParams, handleSubmit]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth("");
    setSelectedSet("");
    setActiveTab("writing");
    setAnswers(INITIAL_ANSWERS);
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

  const resetExam = (clearReadOnly = false) => {
    const baseUrl = window.location.pathname;
    window.history.replaceState({}, "", baseUrl);

    setShowControls(false);
    if (clearReadOnly) setIsReadOnly(false);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedSet("");
    setActiveTab("writing");
    setScrollPositions(INITIAL_SCROLL_POSITIONS);
    setAnswers(INITIAL_ANSWERS);
    examStorage.clearExamData();
  };

  const handleReset = () => resetExam();
  const handleBack = () => resetExam(true);

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
      activeTab: tab,
    });
    setTimeout(() => {
      window.scrollTo(0, scrollPositions[tab as keyof typeof scrollPositions]);
    }, 0);
  };

  const fetchReferenceAnswers = useCallback(async () => {
    if (isReadOnly && selectedYear && selectedMonth && selectedSet) {
      try {
        const response = await fetch(
          `/api/answers?type=${examType}&year=${selectedYear}&month=${selectedMonth}&set=${selectedSet}`
        );
        const data = await response.json();
        setReferenceAnswers({
          writing: data.writingAnswer?.referenceEssay || "",
          translation: data.translationAnswer?.referenceTranslation || "",
        });
      } catch (error) {
        console.error("获取参考答案失败:", error);
      }
    }
  }, [isReadOnly, selectedYear, selectedMonth, selectedSet, examType]);

  useEffect(() => {
    if (showControls) {
      fetchReferenceAnswers();
    }
  }, [showControls, fetchReferenceAnswers]);

  const renderExamContent = () => {
    switch (activeTab) {
      case "writing":
        return (
          <Writing
            data={writingData}
            isLoading={writingLoading}
            answer={answers.writing}
            onAnswerChange={(value) => handleAnswerChange("writing", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.writing}
          />
        );
      case "listening":
        return (
          <ListeningComprehension
            data={listeningData}
            isLoading={listeningLoading}
            answers={answers.listening}
            onAnswerChange={(value) => handleAnswerChange("listening", value)}
            readOnly={isReadOnly}
          />
        );
      case "reading":
        return (
          <ReadingComprehension
            data={readingData}
            isLoading={readingLoading}
            answers={answers.reading}
            onAnswerChange={(value) => handleAnswerChange("reading", value)}
            readOnly={isReadOnly}
          />
        );
      case "translation":
        return (
          <Translation
            data={translationData}
            isLoading={translationLoading}
            answer={answers.translation}
            onAnswerChange={(value) => handleAnswerChange("translation", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.translation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-[sans-serif] mt-5">
      {isLoading ? (
        <LoadingSpinner />
      ) : showControls ? (
        <div>
          <ExamHeader
            title={`${selectedYear}年${selectedMonth}月大学英语${examType}真题（卷${selectedSet}）`}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onReset={handleReset}
            onBack={handleBack}
            showBackButton={true}
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            answers={answers}
            readOnly={isReadOnly}
            examType={examType}
          />
          <div className="pt-28 max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm">
              {renderExamContent()}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">推荐试卷</h2>
              <RecommendedExams />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">最近练习</h2>
              <RecentPractice />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const YearAndSetSelector = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <YearAndSelectorContent />
    </Suspense>
  );
};

export default YearAndSetSelector;
