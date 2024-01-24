import React, { useState, useEffect } from "react";

const YearAndSetSelector = ({ onSelect }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [set, setSet] = useState("");
  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    if (year) {
      const selectedYearData = data.find((item) => item.year === year);
      setMonths(Object.keys(selectedYearData?.monthsAndSets || {}));
    } else {
      setMonths([]);
    }
    setMonth("");
    setSet("");
  }, [year, data]); // 包含 year 作为依赖项

  useEffect(() => {
    if (month && year) {
      const selectedYearData = data.find((item) => item.year === year);
      setSets(selectedYearData?.monthsAndSets[month] || []);
    } else {
      setSets([]);
    }
    setSet("");
  }, [month, year, data]); // 包含 month 和 year 作为依赖项

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSetChange = (e) => {
    setSet(e.target.value);
  };

  const handleSubmit = () => {
    const basePath = `/data/${year}/${year}年${month}英语四级真题_${set}/`;
    onSelect(basePath);
  };

  return (
    <div className="font-[sans-serif] space-x-4 space-y-4 text-center">
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
        {months.map((m) => (
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
        {sets.map((s) => (
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
  );
};

export default YearAndSetSelector;
