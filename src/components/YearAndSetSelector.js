import React, { useState } from 'react';

const YearAndSetSelector = ({ onSelect }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [set, setSet] = useState('');

  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  const months = ['6月', '12月'];
  const sets = ['第1套', '第2套', '第3套'];

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
    const basePath = `/data/${year}/${year}年${month}英语四级真题 ${set}/`;
    onSelect(basePath);
  };

  return (
    <div>
      <select value={year} onChange={handleYearChange}>
        <option value="">选择年份</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>

      <select value={month} onChange={handleMonthChange}>
        <option value="">选择月份</option>
        {months.map(m => <option key={m} value={m}>{m}</option>)}
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
