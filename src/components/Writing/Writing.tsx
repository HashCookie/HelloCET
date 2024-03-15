import React, { useState, useEffect } from "react";

interface WritingTestPageProps {
  basePath: string;
}

const WritingTestPage: React.FC<WritingTestPageProps> = ({ basePath }) => {
  // 这里添加了 basePath 作为 prop
  const [essay, setEssay] = useState("");
  const [Directions, setDirections] = useState("");

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

  return (
    <div className="w-4/5 mx-auto p-5">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part1 Writing
      </h1>
      <p className="text-base mb-5">
        <strong>Directions:</strong>
        {Directions}
      </p>
      <textarea
        value={essay}
        onChange={handleInputChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-40 mb-2.5"
        placeholder="Please enter text."
        maxLength={180}
      />
      <button
        onClick={() => console.log(essay)}
        className="py-2.5 px-5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 block mx-auto"
      >
        提交
      </button>
    </div>
  );
};

export default WritingTestPage;
