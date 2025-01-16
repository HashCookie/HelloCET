import { useEffect, useState } from "react";
import type { ExamRecord, ScoreRecord } from "@/app/types/practice";

export function useScoreRecords(limit?: number, examType?: string) {
  const [records, setRecords] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    const examRecords = JSON.parse(
      localStorage.getItem("examRecords") || "[]"
    ) as ExamRecord[];
    const examRecordsMap = new Map(
      examRecords.map((record) => [record.attemptId, record])
    );

    const sections = ["writing", "listening", "reading", "translation"];
    const recordsMap = new Map<string, ScoreRecord>();

    sections.forEach((section) => {
      const key = `${section}Scores`;
      const sectionRecords = JSON.parse(
        localStorage.getItem(key) || "[]"
      ) as ScoreRecord[];

      sectionRecords.forEach((record) => {
        const examRecord = examRecordsMap.get(record.attemptId);
        if (!examRecord) {
          console.warn(
            `Missing exam record for attemptId: ${record.attemptId}`
          );
          return;
        }

        const existingRecord = recordsMap.get(record.attemptId);
        if (existingRecord) {
          recordsMap.set(record.attemptId, {
            ...existingRecord,
            score: existingRecord.score + record.score,
            completedQuestions:
              existingRecord.completedQuestions + record.completedQuestions,
          });
        } else {
          recordsMap.set(record.attemptId, {
            ...record,
            duration: examRecord.duration,
            seconds: examRecord.seconds,
          } as ScoreRecord);
        }
      });
    });

    let allRecords = Array.from(recordsMap.values());

    allRecords.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (examType) {
      allRecords = allRecords.filter((record) =>
        record.type.includes(examType)
      );
    }

    if (limit) {
      allRecords = allRecords.slice(0, limit);
    }

    setRecords(allRecords);
  }, [limit, examType]);

  const clearRecords = () => {
    const sections = ["writing", "listening", "reading", "translation"];
    sections.forEach((section) => {
      localStorage.removeItem(`${section}Scores`);
    });
    localStorage.removeItem("examRecords");
    setRecords([]);
  };

  return { records, clearRecords };
}
