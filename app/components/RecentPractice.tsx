"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PracticeRecord {
  examType: string;
  year: string;
  month: string;
  set: string;
  completionRate: number;
  lastAccessed: string;
}

export default function RecentPractice() {
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedRecords = localStorage.getItem("practiceRecords");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  if (records.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        暂无练习记录
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.slice(0, 3).map((record, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => router.push(`/${record.examType.toLowerCase()}?year=${record.year}&month=${record.month}&set=${record.set}`)}
        >
          <div>
            <h4 className="font-medium text-gray-900">
              {record.year}年{record.month}月第{record.set}套
            </h4>
            <p className="text-sm text-gray-500">
              完成度: {record.completionRate}% | {record.lastAccessed}
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700">
            继续练习
          </button>
        </div>
      ))}
    </div>
  );
}
