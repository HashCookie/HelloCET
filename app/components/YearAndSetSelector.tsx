"use client";

import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import Writing from "./Writing/Writing";
import ListeningComprehension from "./ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./ReadingComprehension/ReadingComprehension";
import Translation from "./CTOE/Translation";
import ExamSelector from "./Selector/ExamSelector";
import LoadingSpinner from "./Common/LoadingSpinner";
import { useExamData } from "@/app/hooks/useExamData";
import type { ExamPaper } from "@/app/types/exam";
import ExamHeader from "./Common/ExamHeader";
import { examStorage } from "@/app/utils/storage";
import RecommendedExams from "./RecommendedExams";
import RecentPractice from "./RecentPractice";
import { useExamState } from "@/app/hooks/useExamState";

const YearAndSelectorContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const {
    showControls,
    years,
    months,
    setCount,
    selectedYear,
    selectedMonth,
    selectedSet,
    activeTab,
    answers,
    isReadOnly,
    isLoading,
    referenceAnswers,
    handleYearChange,
    handleMonthChange,
    handleSetChange,
    handleSubmit,
    handleBack,
    handleAnswerChange,
    handleTabChange,
    resetExam,
  } = useExamState(examType);

  const {
    data: writingData,
    isLoading: writingLoading,
    error: writingError,
  } = useExamData<Pick<ExamPaper, "writing">>(
    "writing",
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const {
    data: listeningData,
    isLoading: listeningLoading,
    error: listeningError,
  } = useExamData<Pick<ExamPaper, "listeningComprehension">>(
    "listeningComprehension",
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const {
    data: readingData,
    isLoading: readingLoading,
    error: readingError,
  } = useExamData<Pick<ExamPaper, "readingComprehension">>(
    "readingComprehension",
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const {
    data: translationData,
    isLoading: translationLoading,
    error: translationError,
  } = useExamData<Pick<ExamPaper, "translation">>(
    "translation",
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const renderExamContent = () => {
    switch (activeTab) {
      case "writing":
        return (
          <Writing
            data={writingData}
            isLoading={writingLoading}
            answer={answers.writing}
            onAnswerChange={(value) => handleAnswerChange("writing", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.writing}
          />
        );
      case "listening":
        return (
          <ListeningComprehension
            data={listeningData}
            isLoading={listeningLoading}
            answers={answers.listening}
            onAnswerChange={(value) => handleAnswerChange("listening", value)}
            readOnly={isReadOnly}
            referenceAnswers={referenceAnswers.listening}
            examInfo={{
              year: selectedYear,
              month: selectedMonth,
              set: selectedSet,
              type: examType,
            }}
          />
        );
      case "reading":
        return (
          <ReadingComprehension
            data={readingData}
            isLoading={readingLoading}
            answers={answers.reading}
            onAnswerChange={(value) => handleAnswerChange("reading", value)}
            readOnly={isReadOnly}
            referenceAnswers={referenceAnswers.reading}
          />
        );
      case "translation":
        return (
          <Translation
            data={translationData}
            isLoading={translationLoading}
            answer={answers.translation}
            onAnswerChange={(value) => handleAnswerChange("translation", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.translation}
          />
        );
      default:
        return null;
    }
  };

  if (writingError || listeningError || readingError || translationError) {
    examStorage.clearExamData();
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="font-medium text-red-800">获取试卷失败</h3>
          <p className="mt-1 text-red-600">
            {writingError || listeningError || readingError || translationError}
          </p>
          <button
            onClick={() => {
              resetExam(true);
              router.push("/");
            }}
            className="mt-4 rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 font-[sans-serif]">
      {isLoading ? (
        <LoadingSpinner />
      ) : showControls ? (
        <div>
          <ExamHeader
            title={`${selectedYear}年${selectedMonth}月大学英语${examType}真题（卷${selectedSet}）`}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onBack={handleBack}
            showBackButton={true}
            year={selectedYear}
            month={selectedMonth}
            set={selectedSet}
            answers={answers}
            readOnly={isReadOnly}
            examType={examType}
          />
          <div className="mx-auto max-w-6xl px-4 pt-28">
            <div className="rounded-lg bg-white shadow-sm">
              {renderExamContent()}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4">
          <ExamSelector
            years={years}
            months={months}
            setCount={setCount}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedSet={selectedSet}
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
            onSetChange={handleSetChange}
            onSubmit={handleSubmit}
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">推荐试卷</h2>
              <RecommendedExams />
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">最近练习</h2>
              <RecentPractice />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const YearAndSetSelector = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <YearAndSelectorContent />
    </Suspense>
  );
};

export default YearAndSetSelector;
