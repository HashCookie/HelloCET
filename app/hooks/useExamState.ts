import { useState, useCallback, useEffect } from "react";
import { examStorage } from "@/app/utils/common/storage";
import type { Answers } from "@/app/types/answers";
import { useSearchParams } from "next/navigation";
import { useTabControl } from "@/app/hooks/exam/useTabControl";
import { usePaperStore } from "@/app/hooks/usePaperData";

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
  const { paperData, loading, fetchPaperData } = usePaperStore();

  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedSet, setSelectedSet] = useState<number>(1);
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

  const updateMonthsAndSets = useCallback(() => {
    if (!paperData || !selectedYear) return;

    const availableMonths = paperData.papers
      .filter((p) => p.year === selectedYear)
      .map((p) => p.month);

    setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));

    if (selectedMonth) {
      const sets = paperData.papers.find(
        (p) => p.year === selectedYear && p.month === selectedMonth
      );
      setSetCount(sets?.setCount || 0);
    }
  }, [paperData, selectedYear, selectedMonth]);

  useEffect(() => {
    if (!paperData) {
      fetchPaperData(examType);
    } else {
      const sortedYears = paperData.years.sort((a, b) => a - b);
      setYears(sortedYears);
      updateMonthsAndSets();
    }
  }, [examType, paperData, fetchPaperData, updateMonthsAndSets]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(0);
    setSelectedSet(0);
    setActiveTab("writing");
    setAnswers(INITIAL_ANSWERS);
    if (year && paperData) {
      const availableMonths = paperData.papers
        .filter((p) => p.year === year)
        .map((p) => p.month);
      setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));
    }
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setSelectedSet(0);
    if (selectedYear && month && paperData) {
      const sets = paperData.papers.filter(
        (p) => p.year === selectedYear && p.month === month
      );
      setSetCount(sets[0]?.setCount || 0);
    }
  };

  const handleSetChange = (set: number) => {
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
    setSelectedYear(0);
    setSelectedMonth(0);
    setSelectedSet(1);
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
    if (showControls) {
      fetchReferenceAnswers();
    }
  }, [showControls, fetchReferenceAnswers]);

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
      setSelectedYear(Number(year));
      setSelectedMonth(Number(month));
      setSelectedSet(Number(set));
      handleSubmit();
    }
  }, [searchParams, handleSubmit]);

  return {
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
    isLoading: loading,
    referenceAnswers,
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
