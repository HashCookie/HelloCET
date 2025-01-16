"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExamSection from "@/app/components/Common/ExamSection";

interface WritingData {
  Directions: string;
  year?: number;
  month?: number;
}

interface ExamData {
  writing: WritingData;
}

export default function PracticeWriting() {
  const [essay, setEssay] = useState("");
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

          const writingResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&set=1&field=writing`
          );
          const writingData = await writingResponse.json();
          setData({
            writing: {
              ...writingData.writing,
              year: randomPaper.year,
              month: randomPaper.month,
            },
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

  const handleBack = () => {
    router.push("/");
  };

  return (
    <ExamSection title="写作练习" isLoading={isLoading}>
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg
            className="mr-1 h-5 w-5"
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
      {data?.writing ? (
        <div className="prose mb-6 max-w-none text-left">
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.writing.year}年{data.writing.month}月第1套
          </div>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {data.writing.Directions}
          </p>
          <div className="mt-8">
            <textarea
              id="practice-writing"
              rows={12}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="在此输入你的作文..."
            />
          </div>
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
        </div>
      ) : null}
    </ExamSection>
  );
}
