import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { extractPaperName, calculateDuration } from "../../utils/utils";

interface WritingTestPageProps {
  basePath: string;
  attemptTimestamp: string;
  updateWritingScore: (
    score: number,
    completedQuestions: number,
    attemptTimestamp: string
  ) => void;
  updateWritingDuration: (duration: string) => void;
}

const WritingTestPage: React.FC<WritingTestPageProps> = ({
  basePath,
  attemptTimestamp,
  updateWritingScore,
  updateWritingDuration,
}) => {
  const [essay, setEssay] = useState<string>("");
  const [directions, setDirections] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}Writing.json`)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.Directions);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          toast.error("加载指导方针失败，请检查网络连接。");
        });
    }
  }, [basePath]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);

    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handleSubmit = async () => {
    if (!essay.trim()) {
      toast.error("请输入一些文本后再提交。");
      return;
    }
    setIsLoading(true);

    const endTime = new Date();

    try {
      const response = await axios.post(
        "https://vercel-deployment-server-self.vercel.app/score",
        {
          essay: essay,
          title: directions,
        }
      );
      const rawScore = response.data.totalScore;

      if (!isNaN(rawScore)) {
        const duration = startTime
          ? calculateDuration(startTime, endTime)
          : "未知";
        updateWritingDuration(duration);

        const paperName = extractPaperName(basePath);
        const scoreRecord = {
          date: new Date().toISOString(),
          score: rawScore,
          completedQuestions: 1,
          seconds: Math.floor(
            (endTime.getTime() -
              (startTime ? startTime.getTime() : endTime.getTime())) /
              1000
          ),
          attemptId: attemptTimestamp,
          type: paperName,
        };
        const existingRecords = JSON.parse(
          localStorage.getItem("writingScores") || "[]"
        );
        existingRecords.push(scoreRecord);
        localStorage.setItem("writingScores", JSON.stringify(existingRecords));

        updateWritingScore(rawScore, 1, attemptTimestamp);
        toast.success(`你的分数是: ${rawScore}。时间是: ${duration}`);
      } else {
        toast.error("无法从API获取有效分数。");
      }
    } catch (error) {
      console.error("写作部分评估请求失败:", error);
      toast.error("无法获取写作反馈，请检查网络或配置。");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-20 mt-10">
      <div className="text-base md:text-xl lg:text-2xl font-bold font-serif text-center mb-6 flex justify-between items-center">
        <h2>Part I</h2>
        <h1>Writing</h1>
        <h2>(25 minutes)</h2>
      </div>
      <p className="text-base mb-5 italic font-serif">
        <strong>Directions:</strong> {directions}
      </p>
      <textarea
        value={essay}
        onChange={handleInputChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-40 mb-2.5"
        placeholder="Please enter text."
        maxLength={600}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="py-2.5 px-5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 block mx-auto"
      >
        {isLoading ? "正在提交..." : "提交"}
      </button>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default WritingTestPage;
