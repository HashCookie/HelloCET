"use client";

import { useRouter } from "next/navigation";
import { formatDateToBeijingTime } from "../../utils/dateConversion";
import { useScoreRecords } from "../hooks/useScoreRecords";

export default function RecentPractice() {
  const { records } = useScoreRecords(5);
  const router = useRouter();

  if (records.length === 0) {
    return <div className="text-center text-gray-500 py-8">暂无练习记录</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() =>
            router.push(
              `/cet4?year=${record.year}&month=${record.month}&set=${record.set}`
            )
          }
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
