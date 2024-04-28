import React, { useState, useEffect } from "react";
import getMoonshotResponse from "../../utils/MoonshotAPI";

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

const SYSTEM_PROMPT_CONTENT = `
请根据以下原则直接返回作文的分数，不需要其他反馈。
（接下来是评分原则和标准……）
满分为15分。
评分标准：
   - 2分——条理不清，思路紊乱，语言支离破碎或大部分句子均有错误，且多数为严重错误。
   - 5分——基本切题。表达思想不清楚，连贯性差。有较多的严重语言错误。
   - 8分——基本切题。有些地方表达思想不够清楚，文字勉强连贯；语言错误相当多，其中有一些是严重错误。
   - 11分——切题。表达思想清楚，文字连贯，但有少量语言错误。
   - 14分——切题。表达思想清楚，文字通顺，连贯性较好。基本上无语言错误，仅有个别小错。
注：作文与题目毫不相关，或只有几个孤立的词而无法表达思想，则给0分。
注：请直接返回一个整数分数，不要包括任何其他解释或评论。
`;

interface ScoreToPercentageMap {
  [key: number]: number;
}

const scoreToPercentageMap: ScoreToPercentageMap = {
  15: 100,
  14: 94,
  13: 87,
  12: 80,
  11: 74,
  10: 67,
  9: 60,
  8: 54,
  7: 47,
  6: 40,
  5: 34,
  4: 27,
  3: 20,
  2: 14,
  1: 7,
  0: 0,
};

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

const WritingTestPage: React.FC<WritingTestPageProps> = ({
  basePath,
  attemptTimestamp,
  updateWritingScore,
  updateWritingDuration,
}) => {
  const [essay, setEssay] = useState("");
  const [directions, setDirections] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}Writing.json`)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.Directions);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          setFeedback("加载指导方针失败，请检查网络连接。");
        });
    }
  }, [basePath]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const handleSubmit = async () => {
    if (!essay.trim()) {
      setFeedback("请输入一些文本后再提交。");
      return;
    }
    setIsLoading(true);
    const messages = [
      { role: "system", content: SYSTEM_PROMPT_CONTENT },
      { role: "user", content: essay },
    ];

    try {
      const result = await getMoonshotResponse(messages);
      // console.log("Received scoring result:", result);
      if (
        !result.choices ||
        result.choices.length === 0 ||
        !result.choices[0].message
      ) {
        console.error("API response is missing expected data.");
        setFeedback("无法从API获取有效分数。");
        setIsLoading(false);
        return;
      }
      const feedbackContent = result.choices[0].message.content;
      const scoreMatch = feedbackContent.match(/(\b\d+\b)/);
      const rawScore = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;
      const score = scoreToPercentageMap[rawScore] || 0; // 使用映射表直接转换为百分比

      if (!isNaN(score)) {
        const percentage = scoreToPercentageMap[score] || 0; // 使用映射表获取得分率
        updateWritingScore(score, /* completedQuestions */ 1, attemptTimestamp); // 假设完成了1个问题
        const paperName = extractPaperName(basePath);
        const scoreRecord = {
          date: new Date().toISOString(),
          score: score,
          completedQuestions: 1,
          seconds: 25,
          attemptId: attemptTimestamp,
          type: paperName,
        };
        const existingRecords = JSON.parse(
          localStorage.getItem("writingScores") || "[]"
        );
        existingRecords.push(scoreRecord);
        localStorage.setItem("writingScores", JSON.stringify(existingRecords));
        // console.log("Invalid score received.");
        setFeedback(`${percentage}`);
      } else {
        setFeedback("0");
      }
    } catch (error) {
      console.error("写作部分评估请求失败:", error);
      setFeedback("无法获取写作反馈，请检查网络或配置。");
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
      {feedback && (
        <div className="mt-4 text-gray-800 bg-gray-100 p-3 rounded">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default WritingTestPage;
