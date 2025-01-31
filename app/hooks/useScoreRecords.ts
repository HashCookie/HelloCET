import { useEffect, useState } from "react";
import { examRecordStorage } from "@/app/utils/common/examRecordStorage";
import type { ScoreRecord } from "@/app/types/practice";

const SECTIONS = ["writing", "listening", "reading", "translation"] as const;

export function useScoreRecords(limit?: number, examType?: string) {
  const [records, setRecords] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    const examRecords = examRecordStorage.getExamRecords();
    const examRecordsMap = new Map(
      examRecords.map((record) => [record.attemptId, record])
    );

    const recordsMap = new Map<string, ScoreRecord>();

    SECTIONS.forEach((section) => {
      const sectionRecords = examRecordStorage.getSectionScores(section);

      sectionRecords.forEach((record) => {
        const examRecord = examRecordsMap.get(record.attemptId!);
        if (!examRecord) {
          console.warn(
            `Missing exam record for attemptId: ${record.attemptId}`
          );
          return;
        }

        const existingRecord = recordsMap.get(record.attemptId!);
        if (existingRecord) {
          recordsMap.set(record.attemptId!, {
            ...existingRecord,
            score: existingRecord.score + record.score,
            completedQuestions:
              existingRecord.completedQuestions + record.completedQuestions!,
          });
        } else {
          recordsMap.set(record.attemptId!, {
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
    examRecordStorage.clearAllRecords();
    setRecords([]);
  };

  return { records, clearRecords };
}
