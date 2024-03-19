import React, { useState, useEffect } from "react";

interface TranslationProps {
  basePath: string;
}

const Translation: React.FC<TranslationProps> = ({ basePath }) => {
  const [ChinesePassage, setChinesePassage] = useState("");

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/Translation.json`)
        .then((response) => response.json())
        .then((data) => {
          setChinesePassage(data.ChinesePassage);
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 依赖数组包含 basePath，确保路径改变时重新加载

  return (
    <div className="container mx-auto px-20 mt-10">
      <div className="text-xl md:text-xl lg:text-2xl font-serif font-bold text-center mb-6 flex justify-between items-center">
        <h2>Part IV</h2>
        <h1>Translation</h1>
        <h2>(30 minutes)</h2>
      </div>
      <p className="text-base italic font-serif">
        <b>Directions:</b>
        For this part, you are allowed 30 minutes to translate a passage from
        Chinese into English. You should write your answer on Answer Sheet 2.
      </p>
      <p className="mb-4 text-base text-justify">{ChinesePassage}</p>
      <textarea
        className="block p-2.5 w-full text-sm h-32 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your translation here."
      />
    </div>
  );
};

export default Translation;
