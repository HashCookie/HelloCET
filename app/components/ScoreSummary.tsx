import { formatDurationFromSeconds } from "@/utils/dateConversion";

interface SectionResult {
  section: string;
  data: {
    score: number;
  };
  error?: string;
}

interface ScoreSummaryProps {
  results: SectionResult[];
  duration: number;
}

const ScoreSummary = ({ results, duration }: ScoreSummaryProps) => {
  const totalScore = results.reduce((sum, result) => sum + result.data.score, 0);

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
        {results.map((result) => (
          <div key={result.section} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{result.section}</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {result.data.score.toFixed(1)}分
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-600">
        考试用时：{formatDurationFromSeconds(duration)}
      </div>
    </div>
  );
};

export default ScoreSummary;
