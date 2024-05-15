import React, { useState, useEffect } from "react";

interface TranslationProps {
  basePath: string;
}

const Translation: React.FC<TranslationProps> = ({ basePath }) => {
  const [ChinesePassage, setChinesePassage] = useState("");
  const [userTranslation, setUserTranslation] = useState("");
  const [score, setScore] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/Translation.json`)
        .then((response) => response.json())
        .then((data) => {
          setChinesePassage(data.ChinesePassage);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          setFeedback("加载翻译段落失败，请检查网络连接。");
        });
    }
  }, [basePath]);

  const handleTranslationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserTranslation(e.target.value);
  };

  const handleScoreTranslation = async () => {
    if (!userTranslation.trim()) {
      setFeedback("请输入一些文本后再提交。");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.moonshot.cn/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk-sVCo4m4VhPql8CrIxaFzFdr6wsiB5mrgkkab3AKe6TMgtTIH`,
          },
          body: JSON.stringify({
            model: "moonshot-v1-32k",
            messages: [
              {
                role: "system",
                content: `你是一个专业的大学生四六级考试翻译评分助手。你的任务是根据用户提供的翻译内容打分。请确保一定用户输入的翻译 ${userTranslation} 是英文，如果不是英文则直接给0分。请根据翻译的准确性、流畅性和用词得当性进行评分，满分为106.5。请只返回一个整数分数，不需要任何解释。`,
              },
              {
                role: "user",
                content: `${ChinesePassage} \n\n用户的翻译是：${userTranslation}\n\n,请确保一定用户输入的翻译 ${userTranslation} 是英文，如果不是英文则直接给0分。请为此翻译打分，只返回评分分数。`,
              },
            ],
            temperature: 0.3,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const scoreContent = data.choices[0].message.content.trim();
        setScore(scoreContent);
        // setFeedback(`你的分数是: ${scoreContent}`);
      } else {
        setFeedback("无法从API获取有效分数。");
      }
    } catch (error) {
      console.error("翻译评分请求失败:", error);
      setFeedback("无法获取翻译评分，请检查网络或配置。");
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
        className="py-2.5 px-5 mt-4 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 block mx-auto"
        onClick={handleScoreTranslation}
        disabled={isLoading}
      >
        {isLoading ? "正在提交..." : "提交"}
      </button>
      {feedback && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>{feedback}</p>
        </div>
      )}
      {score && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3>{score}</h3>
        </div>
      )}
    </div>
  );
};

export default Translation;
