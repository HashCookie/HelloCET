"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";
import Writing from "@/app/components/Exam/Writing/Writing";
import { useRandomExamData } from "@/app/hooks/useRandomExamData";

interface WritingData {
  writing: {
    Directions: string;
  };
  year: number;
  month: number;
  setCount: number;
}

export default function PracticeWriting() {
  const [essay, setEssay] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const { data: examData, isLoading } =
    useRandomExamData<WritingData>("writing");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async () => {
    if (!essay.trim()) {
      alert("请先完成写作");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/writing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          essay,
          examType,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setScore(result.score);
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
      {examData && (
        <>
          <div className="mb-6 text-gray-500 text-sm">
            <span className="font-semibold">试卷来源：</span>
            {examType} {examData.year}年{examData.month}月第{examData.setCount}
            套
          </div>
          <Writing
            answer={essay}
            data={examData.writing}
            isLoading={isLoading}
            onAnswerChange={setEssay}
            referenceAnswer=""
          />
          <div className="mt-4 flex justify-end">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "评分中..." : "提交评分"}
            </button>
          </div>
          {score !== null && (
            <div className="mt-4 rounded-md bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-lg">评分结果</h3>
              <p className="text-gray-700">得分: {score}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
