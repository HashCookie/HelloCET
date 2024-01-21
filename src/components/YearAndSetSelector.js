import React, { useState, useEffect } from 'react';

const YearAndSetSelector = ({ onSelect }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [set, setSet] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth('');
    setSet('');
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setSet('');
  };

  const handleSetChange = (e) => {
    setSet(e.target.value);
  };

  const handleSubmit = () => {
    const basePath = `/data/${year}/${year}年${month}英语四级真题_${set}/`;
    onSelect(basePath);
  };

  const years = data.map(item => item.year);
  const months = year ? data.find(item => item.year === year).monthsAndSets : [];
  const sets = month ? months[month] : [];

  return (
    <div>
      <select value={year} onChange={handleYearChange}>
        <option value="">选择年份</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>

      <select value={month} onChange={handleMonthChange}>
        <option value="">选择月份</option>
        {Object.keys(months).map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select value={set} onChange={handleSetChange}>
        <option value="">选择套数</option>
        {sets.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <button onClick={handleSubmit}>加载数据</button>
    </div>
  );
};

export default YearAndSetSelector;
