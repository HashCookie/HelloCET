import ScoresHistory from "../components/ScoresHistory";
import { Suspense } from "react";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import TotalPracticeCount from "../components/statistics/TotalPracticeCount";
import AverageScore from "../components/statistics/AverageScore";
import HighestScore from "../components/statistics/HighestScore";
import TotalPracticeTime from "../components/statistics/TotalPracticeTime";
import SubjectScoreDistribution from "../components/statistics/SubjectScoreDistribution";
import RecentProgress from "../components/statistics/RecentProgress";

export default function ScoresPage() {
  return (
    <div className="max-w-6xl mx-auto my-10 p-5">
      <div className="relative mb-6">
        <a
          href="/"
          className="inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          成绩统计
        </h1>
        <p className="mt-2 text-gray-600">查看你的练习记录和进步轨迹</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
          <div className="text-blue-600 text-sm font-medium mb-2">
            总练习次数
          </div>
          <div className="text-2xl font-bold text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <TotalPracticeCount />
            </Suspense>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
          <div className="text-purple-600 text-sm font-medium mb-2">平均分</div>
          <div className="text-2xl font-bold text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <AverageScore />
            </Suspense>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <div className="text-green-600 text-sm font-medium mb-2">最高分</div>
          <div className="text-2xl font-bold text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <HighestScore />
            </Suspense>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
          <div className="text-orange-600 text-sm font-medium mb-2">
            总练习时长
          </div>
          <div className="text-2xl font-bold text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <TotalPracticeTime />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            各科目得分分布
          </h3>
          <Suspense fallback={<LoadingSpinner />}>
            <SubjectScoreDistribution />
          </Suspense>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            近期进步趋势
          </h3>
          <Suspense fallback={<LoadingSpinner />}>
            <RecentProgress />
          </Suspense>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          详细练习记录
        </h3>
        <Suspense fallback={<LoadingSpinner />}>
          <ScoresHistory />
        </Suspense>
      </div>
    </div>
  );
}
