import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import { formatDateToBeijingTime } from "@/app/utils/common/dateConversion";
import { examStorage } from "@/app/utils/common/storage";
import type { Answers } from "@/app/types/answers";
import type {
  ExamRecord,
  PracticeRecord,
  ScoresMap,
} from "@/app/types/practice";
import type { StoredScore } from "@/app/types/score";

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
  const setMatch = type.match(/卷(\d+)/);

  return {
    year: yearMatch ? Number(yearMatch[1]) : 0,
    month: monthMatch ? Number(monthMatch[1]) : 0,
    set: setMatch ? Number(setMatch[1]) : 1,
  };
};

const getScoreFromStorage = (
  attemptId: string,
  type: string,
  section: string
): number => {
  const scores = JSON.parse(
    localStorage.getItem(`${section}Scores`) || "[]"
  ) as StoredScore[];
  return (
    scores.find((s) => s.attemptId === attemptId && s.type === type)?.score || 0
  );
};

const matchScoreRecord = (
  scores: StoredScore[],
  attemptId: string,
  type: string
) => {
  return scores.find((s) => s.attemptId === attemptId && s.type === type);
};

const getExamAnswers = (
  record: PracticeRecord
): {
  answers: Answers;
  hasAnswers: boolean;
} => {
  const allScores: ScoresMap = {
    writing: JSON.parse(localStorage.getItem("writingScores") || "[]"),
    listening: JSON.parse(localStorage.getItem("listeningScores") || "[]"),
    reading: JSON.parse(localStorage.getItem("readingScores") || "[]"),
    translation: JSON.parse(localStorage.getItem("translationScores") || "[]"),
  };

  const writingRecord = matchScoreRecord(
    allScores.writing,
    record.attemptId,
    record.type
  );
  const listeningRecord = matchScoreRecord(
    allScores.listening,
    record.attemptId,
    record.type
  );
  const readingRecord = matchScoreRecord(
    allScores.reading,
    record.attemptId,
    record.type
  );
  const translationRecord = matchScoreRecord(
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
    const { year, month, set } = parseExamInfo(record.type);
    if (!year || !month) {
      console.warn("无法从试卷标题解析出年份或月份");
      return "";
    }
    return `/${examType.toLowerCase()}?year=${year}&month=${month}&set=${set}&readOnly=true`;
  };

  if (records.length === 0) {
    return <div className="py-8 text-center text-gray-500">暂无练习记录</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => {
        const examRecord = JSON.parse(
          localStorage.getItem("examRecords") || "[]"
        ).find((r: ExamRecord) => r.attemptId === record.attemptId);

        const scores = {
          writing: getScoreFromStorage(
            record.attemptId,
            record.type,
            "writing"
          ),
          listening: getScoreFromStorage(
            record.attemptId,
            record.type,
            "listening"
          ),
          reading: getScoreFromStorage(
            record.attemptId,
            record.type,
            "reading"
          ),
          translation: getScoreFromStorage(
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
              const { year, month, set } = parseExamInfo(record.type);
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
                set,
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
