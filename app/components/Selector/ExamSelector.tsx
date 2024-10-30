interface ExamSelectorProps {
  years: number[];
  months: number[];
  setCount: number;
  selectedYear: string;
  selectedMonth: string;
  selectedSet: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onSetChange: (set: string) => void;
  onSubmit: () => void;
}

const ExamSelector = ({
  years,
  months,
  setCount,
  selectedYear,
  selectedMonth,
  selectedSet,
  onYearChange,
  onMonthChange,
  onSetChange,
  onSubmit
}: ExamSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <select 
        className="blue-select"
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="">选择年份</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      <select 
        className="blue-select"
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
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
        onChange={(e) => onSetChange(e.target.value)}
        disabled={!selectedMonth}
      >
        <option value="">选择套数</option>
        {Array.from({length: setCount}, (_, i) => i + 1).map(set => (
          <option key={set} value={set}>第{set}套</option>
        ))}
      </select>
      
      <button
        onClick={onSubmit}
        className="blue-button"
        disabled={!selectedYear || !selectedMonth || !selectedSet}
      >
        加载数据
      </button>
    </div>
  );
};

export default ExamSelector;
