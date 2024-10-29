"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

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
  
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedSet, setSelectedSet] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperData | null>(null);

  const fetchPaperInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();
      setPaperData(data[0]);
      const yearData = data[0]?.years || [];
      setYears(yearData.sort((a: number, b: number) => a - b));
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
      // TODO: 处理加载具体试卷数据的逻辑
    }
  };

  return (
    <div className="font-[sans-serif] space-y-4 text-center">
      {isLoading ? (
        <div>加载中...</div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-4">
          <select 
            className="blue-select"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="">选择年份</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select 
            className="blue-select"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            disabled={!selectedYear}
          >
            <option value="">选择月份</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          
          <select 
            className="blue-select"
            value={selectedSet}
            onChange={(e) => handleSetChange(e.target.value)}
            disabled={!selectedMonth}
          >
            <option value="">选择套数</option>
            {Array.from({length: setCount}, (_, i) => i + 1).map(set => (
              <option key={set} value={set}>第{set}套</option>
            ))}
          </select>
          
          <button
            onClick={handleSubmit}
            className="blue-button"
            disabled={!selectedYear || !selectedMonth || !selectedSet}
          >
            加载数据
          </button>
        </div>
      )}
    </div>
  );
};

export default YearAndSetSelector;
