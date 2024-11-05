"use client";

import { useRouter, usePathname } from "next/navigation";
import { formatDateToBeijingTime } from "../../utils/dateConversion";
import { useScoreRecords } from "../hooks/useScoreRecords";

interface PracticeRecord {
  type: string;
  score: number;
  date: string;
  duration: string;
  year?: string;
  month?: string;
  set?: string;
}

export default function RecentPractice() {
  const router = useRouter();
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const { records } = useScoreRecords(5, examType);

  const handleRecordClick = (record: PracticeRecord) => {
    const yearMatch = record.type.match(/(\d{4})年/);
    const monthMatch = record.type.match(/(\d{1,2})月/);
    const setMatch = record.type.match(/卷(\d+)/);

    const year = yearMatch ? yearMatch[1] : "";
    const month = monthMatch ? monthMatch[1] : "";
    const set = setMatch ? setMatch[1] : "1";

    if (!year || !month) {
      console.warn("无法从试卷标题解析出年份或月份");
      return;
    }

    const lowerCaseExamType = examType.toLowerCase();
    router.push(`/${lowerCaseExamType}?year=${year}&month=${month}&set=${set}`);
  };

  if (records.length === 0) {
    return <div className="text-center text-gray-500 py-8">暂无练习记录</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div
          key={index}
          onClick={() => handleRecordClick(record)}
          className="p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{record.type}</h4>
            <span className="text-blue-600 font-medium">
              {record.score.toFixed(1)}分
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {formatDateToBeijingTime(record.date)} | 用时: {record.duration}
          </div>
        </div>
      ))}
    </div>
  );
}
