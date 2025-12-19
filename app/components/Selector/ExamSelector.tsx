import { useRouter } from "next/navigation";

interface ExamSelectorProps {
  years: number[];
  months: number[];
  setCount: number[];
  selectedYear: number;
  selectedMonth: number;
  selectedSet: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onSetChange: (setCount: number) => void;
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
  onSubmit,
}: ExamSelectorProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <select
        className="blue-select"
        onChange={(e) => onYearChange(Number(e.target.value))}
        value={selectedYear}
      >
        <option value="">选择年份</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className="blue-select"
        disabled={!selectedYear}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        value={selectedMonth}
      >
        <option value="">选择月份</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        className="blue-select"
        disabled={!selectedMonth}
        onChange={(e) => onSetChange(Number(e.target.value))}
        value={selectedSet}
      >
        <option value="">选择套数</option>
        {setCount.map((setCount) => (
          <option key={setCount} value={setCount}>
            第{setCount}套
          </option>
        ))}
      </select>

      <button
        className="blue-button"
        disabled={!(selectedYear && selectedMonth && selectedSet)}
        onClick={onSubmit}
      >
        加载数据
      </button>

      <button
        className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
        onClick={() => router.push("/")}
      >
        返回首页
      </button>
    </div>
  );
};

export default ExamSelector;
