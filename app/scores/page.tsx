"use client";

import { useState, useEffect } from "react";
import {
  formatDurationFromSeconds,
  formatDateToBeijingTime,
} from "../../utils/dateConversion";

// 定义记录的类型
interface ScoreRecord {
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
  attemptId: string;
  seconds: number;
}

const useScoreRecords = () => {
  const [records, setRecords] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    const loadRecords = () => {
      const combinedDurationInSeconds = new Map<string, number>();
      const combinedScoresMap = new Map<string, ScoreRecord>();

      const transformScores = (scoresString: string | null): ScoreRecord[] => {
        return scoresString ? JSON.parse(scoresString) : [];
      };

      const scoreCategories = [
        "readingScores",
        "listeningScores",
        "writingScores",
        "translationScores",
      ];

      const allScores: ScoreRecord[] = scoreCategories.flatMap((category) =>
        transformScores(localStorage.getItem(category))
      );

      allScores.forEach((record) => {
        const combinedRecord = combinedScoresMap.get(record.attemptId) || {
          date: record.date,
          type: record.type,
          score: 0,
          completedQuestions: 0,
          duration: "0分钟0秒",
          seconds: 0,
          attemptId: record.attemptId,
        };

        combinedRecord.score += record.score;
        combinedRecord.score = parseFloat(combinedRecord.score.toFixed(1));
        combinedRecord.completedQuestions += record.completedQuestions;

        const currentTotalSeconds =
          combinedDurationInSeconds.get(record.attemptId) || 0;
        const newSeconds = record.seconds || 0;
        const updatedTotalSeconds = currentTotalSeconds + newSeconds;
        combinedDurationInSeconds.set(record.attemptId, updatedTotalSeconds);

        combinedRecord.duration =
          formatDurationFromSeconds(updatedTotalSeconds);
        combinedRecord.seconds = updatedTotalSeconds;

        combinedScoresMap.set(record.attemptId, combinedRecord);
      });

      const combinedRecordsArray = Array.from(combinedScoresMap.values());

      combinedRecordsArray.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setRecords(combinedRecordsArray);
    };

    loadRecords();
  }, []);

  const clearRecords = () => {
    [
      "readingScores",
      "listeningScores",
      "writingScores",
      "translationScores",
    ].forEach((category) => {
      localStorage.removeItem(category);
    });
    setRecords([]);
  };

  return { records, clearRecords };
};

const ScoresHistory = () => {
  const { records, clearRecords } = useScoreRecords();

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        成绩记录
      </h2>
      {records.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                    卷子
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                    分数
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                    已完成
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                    耗时
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {formatDateToBeijingTime(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <span className="text-blue-600 font-medium">
                        {record.score}分
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {record.completedQuestions}题
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {record.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={clearRecords}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
            >
              清除数据
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>暂无成绩记录</p>
        </div>
      )}
    </div>
  );
};

export default ScoresHistory;
