"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Translation from "@/app/components/CTOE/Translation";
import type { ExamPaper } from "@/app/types/exam";
import { handleTranslationSubmit } from "@/app/utils/submitHandlers";

interface ExamData {
  translation: ExamPaper["translation"];
  year: number;
  month: number;
  set: number;
}

export default function PracticeTranslation() {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const router = useRouter();

  useEffect(() => {
    const fetchRandomPaper = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/papers?type=${examType}`);
        const result = await response.json();
        if (result && result[0]?.papers) {
          const papers = result[0].papers;
          const randomPaper = papers[Math.floor(Math.random() * papers.length)];
          const set = randomPaper.set || 1;

          const translationResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&set=${set}&field=translation`
          );
          const translationData = await translationResponse.json();
          setData({
            translation: translationData.translation,
            year: randomPaper.year,
            month: randomPaper.month,
            set: set,
          });
        }
      } catch (error) {
        console.error("获取翻译题目失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPaper();
  }, [examType]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("请先完成翻译");
      return;
    }

    setIsSubmitting(true);
    try {
      const originalText = data?.translation?.ChinesePassage;
      if (!originalText) {
        throw new Error("获取原文失败");
      }

      const result = await handleTranslationSubmit(answer, originalText);

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

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
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
        </button>
      </div>
      {data?.translation && (
        <div className="prose max-w-none mb-6">
          <div className="text-sm text-gray-500 mb-6">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.year}年{data.month}月第{data.set}套
          </div>
          <Translation
            data={{
              translation: data.translation,
            }}
            isLoading={isLoading}
            answer={answer}
            onAnswerChange={setAnswer}
            referenceAnswer=""
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "评分中..." : "提交评分"}
            </button>
          </div>
          {score !== null && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-semibold mb-2">评分结果</h3>
              <p className="text-gray-700">得分: {score}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
