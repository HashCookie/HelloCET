import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { scoreTranslation } from "../../utils/MoonshotAPI";

interface TranslationProps {
  basePath: string;
  attemptTimestamp: string;
  updateTranslationScore: (
    score: number,
    completedQuestions: number,
    attemptTimestamp: string
  ) => void;
  updateTranslationDuration: (duration: string) => void;
}

const extractPaperName = (basePath: string) => {
  const regex = /(\d{4})年(\d+)月英语(四级|六级)真题_第(\d+)套/;
  const match = basePath.match(regex);
  if (match) {
    const [, year, month, level, setNumber] = match;
    const levelName = level === "四级" ? "英语四级" : "英语六级";
    return `${levelName}${year}年${month}月第${setNumber}套`;
  }
  return "未知试卷";
};

const Translation: React.FC<TranslationProps> = ({
  basePath,
  attemptTimestamp,
  updateTranslationScore,
  updateTranslationDuration,
}) => {
  const [ChinesePassage, setChinesePassage] = useState("");
  const [userTranslation, setUserTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/Translation.json`)
        .then((response) => response.json())
        .then((data) => {
          setChinesePassage(data.ChinesePassage);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          toast.error("加载指导方针失败，请检查网络连接。");
        });
    }
  }, [basePath]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const handleTranslationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserTranslation(e.target.value);
  };

  const calculateDuration = (start: Date, end: Date): string => {
    const durationInSeconds = Math.round(
      (end.getTime() - start.getTime()) / 1000
    );

    let formattedDuration = "";
    if (durationInSeconds < 60) {
      formattedDuration = `${durationInSeconds}秒`;
    } else if (durationInSeconds < 3600) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      formattedDuration = `${minutes}分钟${seconds
        .toString()
        .padStart(2, "0")}秒`;
    } else {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;
      formattedDuration = `${hours}小时${minutes
        .toString()
        .padStart(2, "0")}分钟${seconds.toString().padStart(2, "0")}秒`;
    }

    return formattedDuration;
  };

  const handleScoreTranslation = async () => {
    if (!userTranslation.trim()) {
      toast.error("请输入一些文本后再提交。");
      return;
    }
    setIsLoading(true);

    try {
      const scoreContent = await scoreTranslation(
        ChinesePassage,
        userTranslation
      );
      const score = parseFloat(scoreContent);

      if (!isNaN(score)) {
        const endTime = new Date();
        const duration = startTime
          ? calculateDuration(startTime, endTime)
          : "未知";
        updateTranslationDuration(duration);

        const paperName = extractPaperName(basePath);
        const scoreRecord = {
          date: new Date().toISOString(),
          score,
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
          localStorage.getItem("translationScores") || "[]"
        );
        existingRecords.push(scoreRecord);
        localStorage.setItem(
          "translationScores",
          JSON.stringify(existingRecords)
        );

        updateTranslationScore(score, 1, attemptTimestamp);
        toast.success(`你的分数是: ${score}。时间是: ${duration}`);
      } else {
        toast.error("无法从API获取有效分数。");
      }
    } catch (error) {
      console.error("翻译部分评估请求失败:", error);
      toast.error("无法获取翻译反馈，请检查网络或配置。");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-20 mt-10">
      <div className="text-xl md:text-xl lg:text-2xl font-serif font-bold text-center mb-6 flex justify-between items-center">
        <h2>Part IV</h2>
        <h1>Translation</h1>
        <h2>(30 minutes)</h2>
      </div>
      <p className="text-base italic font-serif">
        <b>Directions:</b> For this part, you are allowed 30 minutes to
        translate a passage from Chinese into English. You should write your
        answer on Answer Sheet 2.
      </p>
      <p className="mb-4 text-base text-justify">{ChinesePassage}</p>
      <textarea
        className="block p-2.5 w-full text-sm h-32 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your translation here."
        value={userTranslation}
        onChange={handleTranslationChange}
      />
      <button
        className="py-2.5 px-5 mt-4 mb-8 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 block mx-auto"
        onClick={handleScoreTranslation}
        disabled={isLoading}
      >
        {isLoading ? "正在提交..." : "提交"}
      </button>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Translation;
