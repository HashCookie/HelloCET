import { Suspense } from "react";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";
import ScoresHistory from "@/app/components/ScoresHistory";
import AverageScore from "@/app/components/statistics/AverageScore";
import HighestScore from "@/app/components/statistics/HighestScore";
import RecentProgress from "@/app/components/statistics/RecentProgress";
import SubjectScoreDistribution from "@/app/components/statistics/SubjectScoreDistribution";
import TotalPracticeCount from "@/app/components/statistics/TotalPracticeCount";
import TotalPracticeTime from "@/app/components/statistics/TotalPracticeTime";

export default function ScoresPage() {
  return (
    <div className="mx-auto my-10 max-w-6xl p-5">
      <div className="relative mb-6">
        <a
          className="inline-flex items-center rounded-full p-2 transition-colors hover:bg-gray-100"
          href="/"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </a>
      </div>

      <div className="mb-10 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-3xl text-transparent">
          成绩统计
        </h1>
        <p className="mt-2 text-gray-600">查看你的练习记录和进步轨迹</p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
          <div className="mb-2 font-medium text-blue-600 text-sm">
            总练习次数
          </div>
          <div className="font-bold text-2xl text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <TotalPracticeCount />
            </Suspense>
          </div>
        </div>

        <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
          <div className="mb-2 font-medium text-purple-600 text-sm">平均分</div>
          <div className="font-bold text-2xl text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <AverageScore />
            </Suspense>
          </div>
        </div>

        <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
          <div className="mb-2 font-medium text-green-600 text-sm">最高分</div>
          <div className="font-bold text-2xl text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <HighestScore />
            </Suspense>
          </div>
        </div>

        <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
          <div className="mb-2 font-medium text-orange-600 text-sm">
            总练习时长
          </div>
          <div className="font-bold text-2xl text-gray-800">
            <Suspense fallback={<LoadingSpinner />}>
              <TotalPracticeTime />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800 text-lg">
            各科目得分分布
          </h3>
          <Suspense fallback={<LoadingSpinner />}>
            <SubjectScoreDistribution />
          </Suspense>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800 text-lg">
            近期进步趋势
          </h3>
          <Suspense fallback={<LoadingSpinner />}>
            <RecentProgress />
          </Suspense>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800 text-lg">
          详细练习记录
        </h3>
        <Suspense fallback={<LoadingSpinner />}>
          <ScoresHistory />
        </Suspense>
      </div>
    </div>
  );
}
