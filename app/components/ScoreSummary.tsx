import { formatDurationFromSeconds } from "@/utils/dateConversion";

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
}

const ScoreSummary = ({ results, duration }: ScoreSummaryProps) => {
  const sections = ["写作", "听力", "阅读", "翻译"];
  const totalScore = results.reduce(
    (sum, result) => sum + (result.data?.score || 0),
    0
  );

  const resultMap = new Map(results.map((result) => [result.section, result]));

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8">考试成绩统计</h1>

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

      <div className="text-center text-gray-600">
        考试用时：{formatDurationFromSeconds(duration)}
      </div>
    </div>
  );
};

export default ScoreSummary;
