import React, { useState, useEffect } from "react";

const Translation = ({ basePath }) => {
  const [Directions, setDirections] = useState("");
  const [ChinesePassage, setChinesePassage] = useState("");

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/Translation.json`)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.Directions);
          setChinesePassage(data.ChinesePassage);
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 依赖数组包含 basePath，确保路径改变时重新加载

  return (
    <div className="container mx-auto px-20 py-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part 4 Translation
      </h1>
      <p className="mb-4 text-base text-justify">{Directions}</p>
      <p className="mb-4 text-base text-justify">{ChinesePassage}</p>
      <textarea
        className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your translation here."
      />
    </div>
  );
};

export default Translation;
