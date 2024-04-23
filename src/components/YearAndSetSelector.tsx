import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchData } from "../utils/dataFetchUtils";
import { buildBasePath } from "../utils/pathUtils";
import { filterMonths, filterSets } from "../utils/filterOptions";
import { useNavigate } from "react-router-dom";

interface YearAndSetSelectorProps {
  onSelect: (basePath: string) => void;
  testType: string;
}

interface YearData {
  year: string;
  monthsAndSets: { [month: string]: string[] };
}

const YearAndSetSelector: React.FC<YearAndSetSelectorProps> = ({
  onSelect,
  testType,
}) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [set, setSet] = useState("");
  const [data, setData] = useState<YearData[]>([]);
  const [showControls, setShowControls] = useState(false);
  const navigate = useNavigate();

  const monthOptions = useMemo(() => filterMonths(data, year), [year, data]);
  const setOptions = useMemo(
    () => filterSets(data, year, month),
    [month, year, data]
  );

  useEffect(() => {
    fetchData(testType)
      .then((testData) => setData(testData))
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [testType]);

  useEffect(() => {
    // 当年份改变时，重置月份和套数的选择
    setMonth("");
    setSet("");
  }, [year]);

  useEffect(() => {
    // 当月份改变时，重置套数的选择
    setSet("");
  }, [month]);

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setYear(e.target.value);
    },
    []
  );

  const handleMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMonth(e.target.value);
    },
    []
  );

  const handleSetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSet(e.target.value);
    },
    []
  );

  const handleSubmit = () => {
    const basePath = buildBasePath(testType, year, month, set);
    onSelect(basePath);
    setShowControls(true);
  };

  const handleReset = () => {
    setYear("");
    setMonth("");
    setSet("");
    setShowControls(false); // 重置状态，隐藏控制按钮
    onSelect("");
  };

  const handleBack = () => {
    navigate(-1); // 返回上一级目录
  };

  return (
    <div className="font-[sans-serif] space-x-4 space-y-4 text-center">
      {showControls ? (
        // 如果已经提交，显示重新选择和返回按钮
        <div className="flex justify-end space-x-4 pr-4">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 mt-4 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            重新选择
          </button>
          <button
            onClick={handleBack}
            className="px-6 mt-4 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            返回
          </button>
        </div>
      ) : (
        <div className="flex-wrap justify-center items-center space-x-4 space-y-4">
          <select
            value={year}
            onChange={handleYearChange}
            className="px-1 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            <option value="">选择年份</option>
            {data.map((item) => (
              <option key={item.year} value={item.year}>
                {item.year}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={handleMonthChange}
            className="px-1 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            <option value="">选择月份</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={set}
            onChange={handleSetChange}
            className="px-1 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            <option value="">选择套数</option>
            {setOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            加载数据
          </button>
        </div>
      )}
    </div>
  );
};

export default YearAndSetSelector;
