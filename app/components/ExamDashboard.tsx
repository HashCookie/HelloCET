"use client";

import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import ExamHeader from "@/app/components/Common/ExamHeader";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";
import Translation from "@/app/components/Exam/CTOE/Translation";
import ListeningComprehension from "@/app/components/Exam/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "@/app/components/Exam/ReadingComprehension/ReadingComprehension";
import Writing from "@/app/components/Exam/Writing/Writing";
import RecentPractice from "@/app/components/RecentPractice";
import RecommendedExams from "@/app/components/RecommendedExams";
import ExamSelector from "@/app/components/Selector/ExamSelector";
import { useExamSection } from "@/app/hooks/useExamSection";
import { useExamState } from "@/app/hooks/useExamState";
import { examStorage } from "@/app/utils/common/storage";

const useExamSections = (
  selectedYear: number,
  selectedMonth: number,
  selectedSet: number
) => {
  const writing = useExamSection(
    "writing",
    selectedYear,
    selectedMonth,
    selectedSet
  );
  const listening = useExamSection(
    "listeningComprehension",
    selectedYear,
    selectedMonth,
    selectedSet
  );
  const reading = useExamSection(
    "readingComprehension",
    selectedYear,
    selectedMonth,
    selectedSet
  );
  const translation = useExamSection(
    "translation",
    selectedYear,
    selectedMonth,
    selectedSet
  );

  const sections = { writing, listening, reading, translation };

  return {
    ...sections,
    hasError: Object.values(sections).some((section) => section.error),
  };
};

const ExamDashboard = () => {
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

  const { writing, listening, reading, translation, hasError } =
    useExamSections(selectedYear, selectedMonth, selectedSet);

  const renderExamContent = () => {
    switch (activeTab) {
      case "writing":
        return (
          <Writing
            answer={answers.writing}
            data={writing.data}
            isLoading={writing.isLoading}
            onAnswerChange={(value) => handleAnswerChange("writing", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.writing}
          />
        );
      case "listening":
        return (
          <ListeningComprehension
            answers={answers.listening}
            data={listening.data}
            examInfo={{
              year: selectedYear,
              month: selectedMonth,
              setCount: selectedSet,
              type: examType,
            }}
            isLoading={listening.isLoading}
            onAnswerChange={(value) => handleAnswerChange("listening", value)}
            readOnly={isReadOnly}
            referenceAnswers={referenceAnswers.listening}
          />
        );
      case "reading":
        return (
          <ReadingComprehension
            answers={answers.reading}
            data={reading.data}
            isLoading={reading.isLoading}
            onAnswerChange={(value) => handleAnswerChange("reading", value)}
            readOnly={isReadOnly}
            referenceAnswers={referenceAnswers.reading}
          />
        );
      case "translation":
        return (
          <Translation
            answer={answers.translation}
            data={translation.data}
            isLoading={translation.isLoading}
            onAnswerChange={(value) => handleAnswerChange("translation", value)}
            readOnly={isReadOnly}
            referenceAnswer={referenceAnswers.translation}
          />
        );
      default:
        return null;
    }
  };

  if (hasError) {
    examStorage.clearExamData();
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="font-medium text-red-800">获取试卷失败</h3>
          <p className="mt-1 text-red-600">{hasError}</p>
          <button
            className="mt-4 rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
            onClick={() => {
              resetExam(true);
              router.push("/");
            }}
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
            activeTab={activeTab}
            answers={answers}
            attemptId={answers.attemptId}
            examType={examType}
            month={selectedMonth}
            onBack={handleBack}
            onTabChange={handleTabChange}
            readOnly={isReadOnly}
            setCount={selectedSet}
            showBackButton={true}
            title={`${selectedYear}年${selectedMonth}月大学英语${examType}真题（卷${selectedSet}）`}
            year={selectedYear}
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
            months={months}
            onMonthChange={handleMonthChange}
            onSetChange={handleSetChange}
            onSubmit={handleSubmit}
            onYearChange={handleYearChange}
            selectedMonth={selectedMonth}
            selectedSet={selectedSet}
            selectedYear={selectedYear}
            setCount={setCount}
            years={years}
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-xl">推荐试卷</h2>
              <RecommendedExams />
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-xl">最近练习</h2>
              <RecentPractice />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExamDashboardWrapper = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <ExamDashboard />
  </Suspense>
);

export default ExamDashboardWrapper;
