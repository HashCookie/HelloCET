import { formatDurationFromSeconds } from "@/utils/dateConversion";
import { useRouter } from "next/navigation";
import { examStorage } from "@/app/utils/storage";

interface SectionResult {
  section: string;
  data?: {
    score: number;
  };
  error?: string;
}

interface ScoreSummaryProps {
  results: SectionResult[];
  duration: number;
  examType: string;
}

interface ScoreRecord {
  attemptId: string;
  type: string;
  answer?: string;
  answers?: Record<number, string>;
  score: number;
  date: string;
  duration: string;
  completedQuestions: number;
}

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
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold text-center mb-2">
        {examType}考试成绩统计
      </h1>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {totalScore.toFixed(1)}
        </div>
        <div className="text-gray-500">总分</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {sections.map((section) => {
          const result = resultMap.get(section);
          return (
            <div key={section} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{section}</h3>
              {result?.data ? (
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {result.data.score.toFixed(1)}分
                </div>
              ) : (
                <div className="text-lg text-gray-400 mb-2">未作答</div>
              )}
              {result?.error && (
                <div className="text-sm text-red-500">{result.error}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center text-gray-600 mb-8">
        考试用时：{formatDurationFromSeconds(duration)}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => router.push(defaultPath)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          返回试卷列表
        </button>
        <button
          onClick={handleViewAnswers}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
        >
          查看答案
        </button>
      </div>
    </div>
  );
};

export default ScoreSummary;
