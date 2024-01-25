import React, { useState, useEffect } from "react";
import ReadingComprehensionA from "./ReadingComprehensionA";
import ReadingComprehensionB from "./ReadingComprehensionB";
import ReadingComprehensionC from "./ReadingComprehensionC";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehension = ({ basePath }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [sectionAData, setSectionAData] = useState(null);
  const [sectionBData, setSectionBData] = useState(null);
  const [sectionCData, setSectionCData] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/ReadingComprehensionA.json`)
        .then((response) => response.json())
        .then((data) => setSectionAData(data))
        .catch((error) =>
          console.error("Error loading Section A data:", error)
        );

      fetch(`${basePath}/ReadingComprehensionB.json`)
        .then((response) => response.json())
        .then((data) => setSectionBData(data))
        .catch((error) =>
          console.error("Error loading Section B data:", error)
        );

      fetch(`${basePath}/ReadingComprehensionC.json`)
        .then((response) => response.json())
        .then((data) => setSectionCData(data))
        .catch((error) =>
          console.error("Error loading Section C data:", error)
        );

      fetch(`/answers/2017年6月英语四级真题_第1套.json`) // 假设答案的路径
        .then((response) => response.json())
        .then((data) => setCorrectAnswers(data))
        .catch((error) => console.error("Error loading answers:", error));
    }
  }, [basePath]);

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: option,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    console.log("Selected Answers:", selectedAnswer);
    console.log("Correct Answers:", correctAnswers);

    Object.keys(selectedAnswer).forEach((questionNumber) => {
      const userAnswer = selectedAnswer[questionNumber];
      const correctAnswer = correctAnswers.ReadingComprehension[questionNumber];

      console.log("User Answer:", userAnswer, "Correct Answer:", correctAnswer);

      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });

    console.log("得分:", score);
  };

  if (!sectionAData || !sectionBData || !sectionCData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part3 Reading Comprehension
      </h1>
      <ReadingComprehensionA
        data={sectionAData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />

      <ReadingComprehensionB
        data={sectionBData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <ReadingComprehensionC
        data={sectionCData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          提交答案
        </button>
      </div>
    </div>
  );
};

export default ReadingComprehension;
