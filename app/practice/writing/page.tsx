"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Writing from "@/app/components/Exam/Writing/Writing";

interface WritingData {
  Directions: string;
  year?: number;
  month?: number;
}

interface ExamData {
  writing: WritingData;
  year: number;
  month: number;
  setCount: number;
}

export default function PracticeWriting() {
  const [essay, setEssay] = useState("");
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

          const writingResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&setCount=${setCount}&field=writing`
          );
          const writingData = await writingResponse.json();
          setData({
            writing: writingData.writing,
            year: randomPaper.year,
            month: randomPaper.month,
            setCount: setCount,
          });
        }
      } catch (error) {
        console.error("获取写作题目失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPaper();
  }, [examType]);

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
      {data?.writing && (
        <>
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.year}年{data.month}月第{data.setCount}套
          </div>
          <Writing
            data={{ writing: data.writing }}
            isLoading={isLoading}
            answer={essay}
            onAnswerChange={setEssay}
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
