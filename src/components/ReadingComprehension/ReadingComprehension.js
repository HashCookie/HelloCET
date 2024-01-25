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
      const paperName = basePath.split("/").slice(-2, -1)[0];
      const answerPath = `/answers/${paperName}.json`;

      const loadData = async () => {
        try {
          const responses = await Promise.all([
            fetch(`${basePath}/ReadingComprehensionA.json`),
            fetch(`${basePath}/ReadingComprehensionB.json`),
            fetch(`${basePath}/ReadingComprehensionC.json`),
            fetch(answerPath),
          ]);
          const [dataA, dataB, dataC, answers] = await Promise.all(
            responses.map((res) => res.json())
          );

          setSectionAData(dataA);
          setSectionBData(dataB);
          setSectionCData(dataC);
          setCorrectAnswers(answers.ReadingComprehension);

          // 初始化用户答案
          const initialAnswers = {};
          [
            ...(dataA?.questions || []),
            ...(dataB?.questions || []),
            ...(dataC?.questions || []),
          ].forEach((question) => {
            initialAnswers[question.number] = "";
          });
          setSelectedAnswer(initialAnswers);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
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
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      if (selectedAnswer[questionNumber] === correctAnswers[questionNumber]) {
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
