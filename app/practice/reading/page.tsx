"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import ReadingComprehension from "@/app/components/Exam/ReadingComprehension/ReadingComprehension";
import { useRandomExamData } from "@/app/hooks/useRandomExamData";
import { handleReadingSubmit } from "@/app/utils/api/submitHandlers";
import type { ExamPaper, ExamPaperBase } from "@/app/types/exam";

interface ExamData extends ExamPaperBase {
  readingComprehension: ExamPaper["readingComprehension"];
}

export default function PracticeReading() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const { data, isLoading } = useRandomExamData<ExamData>(
    "readingComprehension"
  );

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      alert("请先完成阅读题目");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await handleReadingSubmit(
        answers,
        examType,
        data?.year || 0,
        data?.month || 0,
        data?.setCount || 1
      );

      if (result.success && result.data?.score !== undefined) {
        setScore(result.data.score);
      } else {
        alert(result.error || "评分失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("评分失败,请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {data?.readingComprehension && (
        <>
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.year}年{data.month}月第{data.setCount}套
          </div>
          <ReadingComprehension
            data={{
              readingComprehension: data.readingComprehension,
            }}
            isLoading={isLoading}
            answers={answers}
            onAnswerChange={setAnswers}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "评分中..." : "提交评分"}
            </button>
          </div>
          {score !== null && (
            <div className="mt-4 rounded-md bg-gray-50 p-4">
              <h3 className="mb-2 text-lg font-semibold">评分结果</h3>
              <p className="text-gray-700">得分: {score}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
