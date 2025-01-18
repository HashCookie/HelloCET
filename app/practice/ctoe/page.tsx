"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Translation from "@/app/components/Exam/CTOE/Translation";
import { handleTranslationSubmit } from "@/app/utils/api/submitHandlers";
import type { ExamPaper } from "@/app/types/exam";

interface ExamData {
  translation: ExamPaper["translation"];
  year: number;
  month: number;
  setCount: number;
}

export default function PracticeTranslation() {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  useEffect(() => {
    const fetchRandomPaper = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/papers?type=${examType}`);
        const result = await response.json();
        if (result && result[0]?.papers) {
          const papers = result[0].papers;
          const randomPaper = papers[Math.floor(Math.random() * papers.length)];
          const setCount = randomPaper.setCount || 1;

          const translationResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&setCount=${setCount}&field=translation`
          );
          const translationData = await translationResponse.json();
          setData({
            translation: translationData.translation,
            year: randomPaper.year,
            month: randomPaper.month,
            setCount: setCount,
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

  return (
    <>
      {data?.translation && (
        <>
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.year}年{data.month}月第{data.setCount}套
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
