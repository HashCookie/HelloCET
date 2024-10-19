"use client";

import { useState, useEffect } from "react";
import { Table } from "@radix-ui/themes";
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
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>日期</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>卷子</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>分数</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>已完成</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>耗时</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((record, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {formatDateToBeijingTime(record.date)}
                  </Table.Cell>
                  <Table.Cell>{record.type}</Table.Cell>
                  <Table.Cell>{record.score}分</Table.Cell>
                  <Table.Cell>{record.completedQuestions}</Table.Cell>
                  <Table.Cell>{record.duration}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={clearRecords}
            >
              清除数据
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">暂无成绩记录</p>
      )}
    </div>
  );
};

export default ScoresHistory;
