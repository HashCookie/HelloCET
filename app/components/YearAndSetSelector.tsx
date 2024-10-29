"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const YearAndSetSelector = () => {
  const pathname = usePathname();
  const examType = pathname.includes('cet4') ? 'CET4' : 'CET6';
  
  const [showControls, setShowControls] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [setCount, setSetCount] = useState(0);
  
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedSet, setSelectedSet] = useState<string>('');

  const fetchPaperInfo = useCallback(async (year?: string, month?: string) => {
    let url = `/api/papers?type=${examType}`;
    if (year) url += `&year=${year}`;
    if (month) url += `&month=${month}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (!year) {
        setYears(data[0]?.years.sort((a: number, b: number) => a - b) || []);
      } else if (!month) {
        setMonths(data[0]?.months.sort((a: number, b: number) => a - b) || []);
      } else {
        setSetCount(data[0]?.setCount || 0);
      }
    } catch (error) {
      console.error('获取试卷信息失败:', error);
    }
  }, [examType]);

  useEffect(() => {
    fetchPaperInfo();
  }, [fetchPaperInfo]);

  const handleYearChange = async (year: string) => {
    setSelectedYear(year);
    setSelectedMonth('');
    setSelectedSet('');
    if (year) {
      await fetchPaperInfo(year);
    }
  };

  const handleMonthChange = async (month: string) => {
    setSelectedMonth(month);
    setSelectedSet('');
    if (selectedYear && month) {
      await fetchPaperInfo(selectedYear, month);
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

  return (
    <div className="font-[sans-serif] space-y-4 text-center">
      {showControls ? (
        <div className="flex justify-end space-x-4 pr-4">
          <button 
            className="blue-button mt-4"
            onClick={() => setShowControls(false)}
          >
            重新选择
          </button>
          <button className="blue-button mt-4">返回</button>
        </div>
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
