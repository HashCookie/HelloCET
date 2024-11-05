"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDurationFromSeconds, formatDateToBeijingTime } from "../../utils/dateConversion";

interface ScoreRecord {
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
  attemptId: string;
  seconds: number;
  examType: string;
  year: string;
  month: string;
  set: string;
}

export default function RecentPractice() {
  const [records, setRecords] = useState<ScoreRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const transformScores = (scoresString: string | null): ScoreRecord[] => {
      return scoresString ? JSON.parse(scoresString) : [];
    };

    const scoreCategories = [
      "readingScores",
      "listeningScores",
      "writingScores",
      "translationScores",
    ];

    const allScores = scoreCategories.flatMap((category) =>
      transformScores(localStorage.getItem(category))
    );

    const combinedScoresMap = new Map<string, ScoreRecord>();

    allScores.forEach((record) => {
      const paperKey = record.attemptId;
      
      const combinedRecord = combinedScoresMap.get(paperKey) || {
        date: record.date,
        type: record.type,
        score: 0,
        completedQuestions: 0,
        duration: "0分钟0秒",
        seconds: 0,
        attemptId: record.attemptId,
        examType: record.type.includes('CET4') ? 'CET4' : 'CET6',
        year: '',
        month: '',
        set: ''
      };

      if (!combinedRecord.year) {
        const paperInfo = record.type.match(/(\d{4})年(\d{1,2})月.*?第(\d+)套/);
        if (paperInfo) {
          const [, year, month, set] = paperInfo;
          combinedRecord.year = year;
          combinedRecord.month = month;
          combinedRecord.set = set;
        }
      }

      combinedRecord.score += record.score;
      combinedRecord.score = parseFloat(combinedRecord.score.toFixed(1));
      combinedRecord.completedQuestions += record.completedQuestions;
      combinedRecord.seconds += record.seconds || 0;
      combinedRecord.duration = formatDurationFromSeconds(combinedRecord.seconds);

      combinedScoresMap.set(paperKey, combinedRecord);
    });

    const mergedRecords = Array.from(combinedScoresMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    setRecords(mergedRecords);
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
      {records.map((record, index) => (
        <div 
          key={index} 
          className="p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => router.push(`/cet4?year=${record.year}&month=${record.month}&set=${record.set}`)}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">
              {record.type}
            </h4>
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
