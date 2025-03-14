import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTabControl } from "@/app/hooks/exam/useTabControl";
import { usePaperStore } from "@/app/hooks/usePaperData";
import { examStorage } from "@/app/utils/common/storage";
import type { Answers } from "@/app/types/answers";

type AnswerValue = Answers[keyof Omit<Answers, "attemptId">];

const INITIAL_ANSWERS: Answers = {
  writing: "",
  listening: {},
  reading: {},
  translation: "",
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

const generateSetNumbers = (count: number) =>
  Array.from({ length: count }, (_, i) => i + 1);

export function useExamState(examType: string) {
  const searchParams = useSearchParams();
  const { paperData, loading, fetchPaperData } = usePaperStore();

  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState<number[]>([]);
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
      const count = sets?.setCount || 0;
      setSetCount(generateSetNumbers(count));
    }
  }, [paperData, selectedYear, selectedMonth]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(0);
    setSelectedSet(0);
    setActiveTab("writing");
    setAnswers(INITIAL_ANSWERS);
    setSetCount([]);
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
      const sets = paperData.papers.find(
        (p) => p.year === selectedYear && p.month === month
      );
      const count = sets?.setCount || 0;
      setSetCount(generateSetNumbers(count));
    }
  };

  const handleSetChange = (setCount: number) => {
    setSelectedSet(setCount);
  };

  const handleSubmit = useCallback(() => {
    if (selectedYear && selectedMonth && selectedSet) {
      setShowControls(true);
      examStorage.saveState({
        year: selectedYear,
        month: selectedMonth,
        setCount: selectedSet,
        showControls: true,
        activeTab,
        readOnly: isReadOnly,
      });
    }
  }, [selectedYear, selectedMonth, selectedSet, activeTab, isReadOnly]);

  const resetExam = (clearReadOnly = false) => {
    const baseUrl = window.location.pathname;
    window.history.replaceState({}, "", baseUrl);

    setShowControls(false);
    if (clearReadOnly) setIsReadOnly(false);
    setSelectedYear(0);
    setSelectedMonth(0);
    setSelectedSet(1);
    setSetCount([]);
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
          `/api/answers?type=${examType}&year=${selectedYear}&month=${selectedMonth}&setCount=${selectedSet}`
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

  useEffect(() => {
    if (!paperData) {
      fetchPaperData(examType);
    } else {
      const sortedYears = paperData.years.sort((a, b) => a - b);
      setYears(sortedYears);
      updateMonthsAndSets();
    }
  }, [examType, paperData, fetchPaperData, updateMonthsAndSets]);

  useEffect(() => {
    if (isReadOnly && selectedYear && selectedMonth && selectedSet) {
      fetchReferenceAnswers();
    }
  }, [
    isReadOnly,
    selectedYear,
    selectedMonth,
    selectedSet,
    fetchReferenceAnswers,
  ]);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedState = examStorage.getState();
      const savedAnswers = examStorage.getAnswers();

      if (savedState) {
        setSelectedYear(savedState.year);
        setSelectedMonth(savedState.month);
        setSelectedSet(savedState.setCount);
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
    const setCount = searchParams.get("setCount");
    const readOnly = searchParams.get("readOnly");

    if (year && month && setCount) {
      setSelectedYear(Number(year));
      setSelectedMonth(Number(month));
      setSelectedSet(Number(setCount));
      setIsReadOnly(readOnly === "true");
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
