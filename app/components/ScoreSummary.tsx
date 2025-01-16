import { useRouter } from "next/navigation";
import { formatDurationFromSeconds } from "@/app/utils/common/dateConversion";
import { examStorage } from "@/app/utils/common/storage";
import type { ScoreRecord, ScoreSummaryProps } from "@/app/types/practice";

const ScoreSummary = ({ results, duration, examType }: ScoreSummaryProps) => {
  const router = useRouter();
  const defaultPath = `/${examType.toLowerCase()}`;
  const sections = ["写作", "听力", "阅读", "翻译"];
  const totalScore = results.reduce(
    (sum, result) => sum + (result.data?.score || 0),
    0
  );

  const resultMap = new Map(results.map((result) => [result.section, result]));

  const handleViewAnswers = async () => {
    const examRecords = JSON.parse(localStorage.getItem("examRecords") || "[]");
    if (examRecords.length === 0) {
      console.warn("未找到考试记录");
      return;
    }

    const latestRecord = examRecords[examRecords.length - 1];
    const yearMatch = latestRecord.type.match(/(\d{4})年/);
    const monthMatch = latestRecord.type.match(/(\d{1,2})月/);
    const setMatch = latestRecord.type.match(/卷(\d+)/);

    const year = yearMatch ? yearMatch[1] : "";
    const month = monthMatch ? monthMatch[1] : "";
    const set = setMatch ? setMatch[1] : "1";

    if (!year || !month) {
      console.warn("无法从试卷标题解析出年份或月份");
      return;
    }

    const allScores = {
      writing: JSON.parse(localStorage.getItem("writingScores") || "[]"),
      listening: JSON.parse(localStorage.getItem("listeningScores") || "[]"),
      reading: JSON.parse(localStorage.getItem("readingScores") || "[]"),
      translation: JSON.parse(
        localStorage.getItem("translationScores") || "[]"
      ),
    };

    const matchRecord = (scores: ScoreRecord[]) => {
      return scores.find((s) => s.attemptId === latestRecord.attemptId);
    };

    const writingRecord = matchRecord(allScores.writing);
    const listeningRecord = matchRecord(allScores.listening);
    const readingRecord = matchRecord(allScores.reading);
    const translationRecord = matchRecord(allScores.translation);

    await examStorage.saveState({
      year,
      month,
      set,
      showControls: true,
      activeTab: "writing",
      readOnly: true,
    });

    await examStorage.saveAnswers({
      writing: writingRecord?.answer || "",
      listening: listeningRecord?.answers || {},
      reading: readingRecord?.answers || {},
      translation: translationRecord?.answer || "",
    });

    router.push(
      `/${examType.toLowerCase()}?year=${year}&month=${month}&set=${set}&readOnly=true`
    );
  };

  return (
    <div className="relative mx-auto my-8 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-2 text-center text-2xl font-bold">
        {examType}考试成绩统计
      </h1>

      <div className="mb-8 text-center">
        <div className="mb-2 text-4xl font-bold text-blue-600">
          {totalScore.toFixed(1)}
        </div>
        <div className="text-gray-500">总分</div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const result = resultMap.get(section);
          return (
            <div key={section} className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">{section}</h3>
              {result?.data ? (
                <div className="mb-2 text-2xl font-bold text-blue-600">
                  {result.data.score.toFixed(1)}分
                </div>
              ) : (
                <div className="mb-2 text-lg text-gray-400">未作答</div>
              )}
              {result?.error && (
                <div className="text-sm text-red-500">{result.error}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mb-8 text-center text-gray-600">
        考试用时：{formatDurationFromSeconds(duration)}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => router.push(defaultPath)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          返回试卷列表
        </button>
        <button
          onClick={handleViewAnswers}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
        >
          查看答案
        </button>
      </div>
    </div>
  );
};

export default ScoreSummary;
