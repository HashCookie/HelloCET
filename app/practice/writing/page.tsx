"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
      {data?.writing ? (
        <div className="prose max-w-none mb-6 text-left">
          <div className="text-sm text-gray-500 mb-6">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.writing.year}年{data.writing.month}月第1套
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.writing.Directions}
          </p>
          <div className="mt-8">
            <textarea
              id="practice-writing"
              rows={12}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="在此输入你的作文..."
            />
          </div>
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
      ) : null}
    </ExamSection>
  );
}
