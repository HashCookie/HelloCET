import { useState, useEffect } from "react";
import { formatDurationFromSeconds } from "../../utils/dateConversion";

export interface ScoreRecord {
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
  attemptId: string;
  seconds: number;
  examType?: string;
  year?: string;
  month?: string;
  set?: string;
}

export function useScoreRecords(limit?: number, type?: string) {
  const [records, setRecords] = useState<ScoreRecord[]>([]);

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
      const examType = record.type.includes("CET4") ? "CET4" : "CET6";

      if (type && examType !== type) {
        return;
      }

      const combinedRecord = combinedScoresMap.get(paperKey) || {
        date: record.date,
        type: record.type,
        score: 0,
        completedQuestions: 0,
        duration: "0分钟0秒",
        seconds: 0,
        attemptId: record.attemptId,
        examType,
        year: "",
        month: "",
        set: "",
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
      combinedRecord.duration = formatDurationFromSeconds(
        combinedRecord.seconds
      );

      combinedScoresMap.set(paperKey, combinedRecord);
    });

    const combinedRecordsArray = Array.from(combinedScoresMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setRecords(
      limit ? combinedRecordsArray.slice(0, limit) : combinedRecordsArray
    );
  }, [limit, type]);

  const clearRecords = () => {
    const scoreCategories = [
      "readingScores",
      "listeningScores",
      "writingScores",
      "translationScores",
    ];
    scoreCategories.forEach((category) => {
      localStorage.removeItem(category);
    });
    setRecords([]);
  };

  return { records, clearRecords };
}
