"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Writing from "./Writing/Writing";
import ListeningComprehension from "./ListeningComprehension/ListeningComprehension";
import ExamSelector from "./Selector/ExamSelector";
import LoadingSpinner from "./Common/LoadingSpinner";
import ControlButtons from "./Common/ControlButtons";

interface PaperData {
  years: number[];
  months: number[];
  papers: {
    year: number;
    month: number;
    setCount: number;
  }[];
}

const YearAndSetSelector = () => {
  const pathname = usePathname();
  const examType = pathname.includes('cet4') ? 'CET4' : 'CET6';
  
  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperData | null>(null);
  
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedSet, setSelectedSet] = useState<string>('');

  const fetchPaperInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();
      setPaperData(data[0]);
      setYears(data[0]?.years.sort((a: number, b: number) => a - b) || []);
    } catch (error) {
      console.error('获取试卷信息失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, [examType]);

  useEffect(() => {
    fetchPaperInfo();
  }, [fetchPaperInfo]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth('');
    setSelectedSet('');
    if (year && paperData) {
      const availableMonths = paperData.papers
        .filter((p) => p.year === parseInt(year))
        .map((p) => p.month);
      setMonths(Array.from(new Set(availableMonths)).sort((a, b) => a - b));
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedSet('');
    if (selectedYear && month && paperData) {
      const sets = paperData.papers
        .filter((p) => 
          p.year === parseInt(selectedYear) && 
          p.month === parseInt(month)
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
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedSet('');
  };

  return (
    <div className="font-[sans-serif] space-y-4 text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : showControls ? (
        <>
          <ControlButtons onReset={handleReset} />
          <Writing 
            year={selectedYear} 
            month={selectedMonth} 
            set={selectedSet} 
          />
          <ListeningComprehension 
            year={selectedYear} 
            month={selectedMonth} 
            set={selectedSet} 
          />  
        </>
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
