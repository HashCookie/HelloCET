import { useState, useCallback, useEffect } from "react";
import { examStorage } from "@/app/utils/common/storage";
import type { Answers } from "@/app/types/answers";
import { useSearchParams } from "next/navigation";
import { useTabControl } from "@/app/hooks/exam/useTabControl";

interface PaperData {
  years: number[];
  months: number[];
  papers: {
    year: number;
    month: number;
    setCount: number;
  }[];
}

type AnswerValue = Answers[keyof Omit<Answers, "attemptId">];

const INITIAL_ANSWERS: Answers = {
  writing: "",
  listening: {},
  reading: {},
  translation: "",
  attemptId: undefined,
} as const;

const INITIAL_REFERENCE_ANSWERS = {
  writing: "",
  translation: "",
  listening: [],
  reading: {
    sectionA: [],
    sectionB: [],
    sectionC: {
      passageOne: [],
      passageTwo: [],
    },
  },
};

export function useExamState(examType: string) {
  const searchParams = useSearchParams();

  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperData | null>(null);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [referenceAnswers, setReferenceAnswers] = useState(
    INITIAL_REFERENCE_ANSWERS
  );

  const { activeTab, setActiveTab, handleTabChange } = useTabControl(
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const fetchPaperInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();
      const sortedYears =
        data[0]?.years.sort((a: number, b: number) => a - b) || [];

      setPaperData(data[0]);
      setYears(sortedYears);
    } catch (error) {
      console.error("获取试卷信息失败:", error);
    } finally {
      setIsLoading(false);
    }
  }, [examType]);

  const updateMonthsAndSets = useCallback(() => {
    if (!paperData || !selectedYear) return;

    const availableMonths = paperData.papers
      .filter((p) => p.year === parseInt(selectedYear))
      .map((p) => p.month);

    setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));

    if (selectedMonth) {
      const sets = paperData.papers.find(
        (p) =>
          p.year === parseInt(selectedYear) &&
          p.month === parseInt(selectedMonth)
      );
      setSetCount(sets?.setCount || 0);
    }
  }, [paperData, selectedYear, selectedMonth]);

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

  const resetExam = (clearReadOnly = false) => {
    const baseUrl = window.location.pathname;
    window.history.replaceState({}, "", baseUrl);

    setShowControls(false);
    if (clearReadOnly) setIsReadOnly(false);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedSet("");
    setActiveTab("writing");
    setAnswers(INITIAL_ANSWERS);
    examStorage.clearExamData();
  };

  const handleBack = () => resetExam(true);

  const handleAnswerChange = (
    section: keyof Omit<Answers, "attemptId">,
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

  const setAttemptId = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      attemptId: id,
    }));
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
          listening: data.listeningAnswers || [],
          reading: data.readingAnswers || {},
        });
      } catch (error) {
        console.error("获取参考答案失败:", error);
      }
    }
  }, [isReadOnly, selectedYear, selectedMonth, selectedSet, examType]);

  // Effects
  useEffect(() => {
    fetchPaperInfo();
  }, [fetchPaperInfo]);

  useEffect(() => {
    updateMonthsAndSets();
  }, [updateMonthsAndSets]);

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
  }, [searchParams, setActiveTab]);

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

  useEffect(() => {
    if (showControls) {
      fetchReferenceAnswers();
    }
  }, [showControls, fetchReferenceAnswers]);

  return {
    // 状态
    showControls,
    years,
    months,
    setCount,
    selectedYear,
    selectedMonth,
    selectedSet,
    activeTab,
    answers,
    isReadOnly,
    isLoading,
    referenceAnswers,

    // 处理函数
    handleYearChange,
    handleMonthChange,
    handleSetChange,
    handleSubmit,
    handleBack,
    handleAnswerChange,
    handleTabChange,
    resetExam,
    setAttemptId,
  };
}
