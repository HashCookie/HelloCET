import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import { formatDateToBeijingTime } from "@/app/utils/common/dateConversion";
import { examRecordStorage } from "@/app/utils/common/examRecordStorage";
import { examStorage } from "@/app/utils/common/storage";
import type { Answers } from "@/app/types/answers";
import type { ExamRecord, PracticeRecord } from "@/app/types/practice";

interface SectionScores {
  writing: number;
  listening: number;
  reading: number;
  translation: number;
}

interface PracticeRecordCardProps {
  record: PracticeRecord;
  examRecord?: ExamRecord;
  scores: SectionScores;
}

const parseExamInfo = (type: string) => {
  const yearMatch = type.match(/(\d{4})年/);
  const monthMatch = type.match(/(\d{1,2})月/);
  const setCountMatch = type.match(/卷(\d+)/);

  return {
    year: yearMatch ? Number(yearMatch[1]) : 0,
    month: monthMatch ? Number(monthMatch[1]) : 0,
    setCount: setCountMatch ? Number(setCountMatch[1]) : 1,
  };
};

const getExamAnswers = (record: PracticeRecord) => {
  const allScores = examRecordStorage.getAllSectionScores();

  const writingRecord = examRecordStorage.findScoreRecord(
    allScores.writing,
    record.attemptId,
    record.type
  );
  const listeningRecord = examRecordStorage.findScoreRecord(
    allScores.listening,
    record.attemptId,
    record.type
  );
  const readingRecord = examRecordStorage.findScoreRecord(
    allScores.reading,
    record.attemptId,
    record.type
  );
  const translationRecord = examRecordStorage.findScoreRecord(
    allScores.translation,
    record.attemptId,
    record.type
  );

  const answers: Answers = {
    writing: writingRecord?.answer || "",
    listening: listeningRecord?.answers || {},
    reading: readingRecord?.answers || {},
    translation: translationRecord?.answer || "",
    attemptId: record.attemptId,
  };

  const hasAnswers = !!(
    answers.writing ||
    Object.keys(answers.listening).length > 0 ||
    Object.keys(answers.reading).length > 0 ||
    answers.translation
  );

  return { answers, hasAnswers };
};

const PracticeRecordCard = ({
  record,
  examRecord,
  scores,
}: PracticeRecordCardProps) => (
  <div className="cursor-pointer rounded bg-gray-50 p-4 transition-colors hover:bg-gray-100">
    <div className="mb-2 flex items-center justify-between">
      <h4 className="font-medium text-gray-900">{record.type}</h4>
      <span className="font-medium text-blue-600">
        {record.score.toFixed(1)}分
      </span>
    </div>
    <div className="mb-2 flex flex-wrap gap-2 text-sm text-gray-600">
      <span>写作: {scores.writing.toFixed(1)}</span>
      <span>听力: {scores.listening.toFixed(1)}</span>
      <span>阅读: {scores.reading.toFixed(1)}</span>
      <span>翻译: {scores.translation.toFixed(1)}</span>
    </div>
    <div className="text-sm text-gray-500">
      {formatDateToBeijingTime(record.date)} | 用时:{" "}
      {examRecord?.duration || record.duration}
    </div>
  </div>
);

export default function RecentPractice() {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const { records } = useScoreRecords(5, examType);

  const getExamLink = (record: PracticeRecord) => {
    const { year, month, setCount } = parseExamInfo(record.type);
    if (!year || !month) {
      console.warn("无法从试卷标题解析出年份或月份");
      return "";
    }
    return `/${examType.toLowerCase()}?year=${year}&month=${month}&set=${setCount}&readOnly=true`;
  };

  if (records.length === 0) {
    return <div className="py-8 text-center text-gray-500">暂无练习记录</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => {
        const examRecord = examRecordStorage
          .getExamRecords()
          .find((r: ExamRecord) => r.attemptId === record.attemptId);

        const scores = {
          writing: examRecordStorage.getScoreByAttemptId(
            record.attemptId,
            record.type,
            "writing"
          ),
          listening: examRecordStorage.getScoreByAttemptId(
            record.attemptId,
            record.type,
            "listening"
          ),
          reading: examRecordStorage.getScoreByAttemptId(
            record.attemptId,
            record.type,
            "reading"
          ),
          translation: examRecordStorage.getScoreByAttemptId(
            record.attemptId,
            record.type,
            "translation"
          ),
        };

        return (
          <Link
            key={index}
            href={getExamLink(record)}
            onClick={async (e) => {
              const { year, month, setCount } = parseExamInfo(record.type);
              if (!year || !month) {
                e.preventDefault();
                return;
              }

              const { answers, hasAnswers } = getExamAnswers(record);
              if (!hasAnswers) {
                console.warn("未找到任何答案记录");
                return;
              }

              await examStorage.saveState({
                year,
                month,
                setCount,
                showControls: true,
                activeTab: "writing",
                readOnly: true,
              });

              await examStorage.saveAnswers(answers);
            }}
          >
            <PracticeRecordCard
              record={record}
              examRecord={examRecord}
              scores={scores}
            />
          </Link>
        );
      })}
    </div>
  );
}
