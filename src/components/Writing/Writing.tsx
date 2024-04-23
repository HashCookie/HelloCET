import React, { useState, useEffect } from "react";
import getMoonshotResponse from "../../utils/MoonshotAPI"; // 确保导入路径正确

interface WritingTestPageProps {
  basePath: string;
}

const SYSTEM_PROMPT_CONTENT = `
请根据以下原则直接返回作文的分数，不需要其他反馈。
（接下来是评分原则和标准……）
满分为15分。
4. 评分标准：
   - 2分——条理不清，思路紊乱，语言支离破碎或大部分句子均有错误，且多数为严重错误。
   - 5分——基本切题。表达思想不清楚，连贯性差。有较多的严重语言错误。
   - 8分——基本切题。有些地方表达思想不够清楚，文字勉强连贯；语言错误相当多，其中有一些是严重错误。
   - 11分——切题。表达思想清楚，文字连贯，但有少量语言错误。
   - 14分——切题。表达思想清楚，文字通顺，连贯性较好。基本上无语言错误，仅有个别小错。

注：白卷，作文与题目毫不相关，或只有几个孤立的词而无法表达思想，则给0分。
注：请直接返回一个整数分数，不要包括任何其他解释或评论。
`;

const WritingTestPage: React.FC<WritingTestPageProps> = ({ basePath }) => {
  // 这里添加了 basePath 作为 prop
  const [essay, setEssay] = useState("");
  const [Directions, setDirections] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}Writing.json`)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.Directions);
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 这里使用 basePath 作为依赖

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const handleSubmit = async () => {
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT_CONTENT,
      },
      {
        role: "user",
        content: essay,
      },
    ];

    try {
      const result = await getMoonshotResponse(messages);
      setFeedback(result.choices[0].message.content); // 确保根据返回结构正确访问
    } catch (error) {
      console.error("写作部分评估请求失败:", error);
      setFeedback("无法获取写作反馈，请检查网络或配置。");
    }
  };

  return (
    <div className="container mx-auto px-20 mt-10">
      <div className="text-base md:text-xl lg:text-2xl font-bold font-serif text-center mb-6 flex justify-between items-center">
        <h2>Part I</h2>
        <h1>Writing</h1>
        <h2>(25 minutes)</h2>
      </div>
      <p className="text-base mb-5 italic font-serif">
        <strong>Directions:</strong>
        {Directions}
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
        className="py-2.5 px-5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 block mx-auto"
      >
        提交
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
