"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ListeningComprehension from "@/app/components/ListeningComprehension/ListeningComprehension";
import type { ListeningQuestion } from "@/app/types/exam";
import { handleListeningSubmit } from "@/app/utils/submitHandlers";

interface ExamData {
  listeningComprehension: ListeningQuestion[];
  year: number;
  month: number;
  set: number;
}

export default function PracticeListening() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
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

          const listeningResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&set=${set}&field=listeningComprehension`
          );
          const listeningData = await listeningResponse.json();
          setData({
            listeningComprehension: listeningData.listeningComprehension,
            year: randomPaper.year,
            month: randomPaper.month,
            set: set,
          });
        }
      } catch (error) {
        console.error("获取听力题目失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPaper();
  }, [examType]);

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      alert("请先完成听力题目");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await handleListeningSubmit(
        answers,
        examType,
        data?.year || 0,
        data?.month || 0,
        data?.set || 1
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

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
      {data?.listeningComprehension && (
        <div className="prose mb-6 max-w-none">
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-semibold">试卷来源：</span>
            {examType} {data.year}年{data.month}月第{data.set}套
          </div>
          <ListeningComprehension
            data={{
              listeningComprehension: data.listeningComprehension,
            }}
            isLoading={isLoading}
            answers={answers}
            onAnswerChange={setAnswers}
            examInfo={{
              year: data.year.toString(),
              month: data.month.toString(),
              set: data.set.toString(),
              type: examType,
            }}
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
        </div>
      )}
    </div>
  );
}
