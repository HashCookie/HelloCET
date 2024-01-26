import React, { useState, useEffect } from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

const ListeningComprehension = ({ basePath }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  // 新增两个状态来保存年份和试卷编号
  const [year, setYear] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  // 新增一个状态来保存月份
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (basePath) {
      // 加载试题
      fetch(`${basePath}/ListeningComprehension.json`)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions);
          // 初始化用户答案
          const initialAnswers = data.questions.reduce((acc, question) => {
            acc[`q${question.number}`] = "";
            return acc;
          }, {});
          setSelectedAnswer(initialAnswers);

          // 提取试卷名称
          const paperName = basePath.split("/").slice(-2, -1)[0];
          const answerPath = `/answers/${paperName}.json`;

          // 加载答案
          fetch(answerPath)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setCorrectAnswers(data.ListeningComprehension);
            })
            .catch((error) => console.error("Error loading answers:", error));
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 只在 basePath 改变时运行

  // 当basePath变化时，解析年份、月份和试卷编号
  useEffect(() => {
    if (basePath) {
      const matches = basePath.match(/(\d{4})年(\d+)月英语四级真题_第(\d+)套/);
      if (matches) {
        setYear(matches[1]);
        setMonth(matches[2]); // 使用第二个捕获组来获取月份
        setPaperNumber(matches[3]); // 使用第三个捕获组来获取试卷编号
      }
    }
  }, [basePath]);

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: option, // 直接使用 questionNumber 作为键
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      const userAnswer = selectedAnswer[questionNumber];
      const correctAnswer = correctAnswers[questionNumber]; // 直接使用 questionNumber 作为键
      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });
    console.log("得分:", score);
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part2 Listening Comprehension
      </h1>
      <SectionA
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <SectionB
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <SectionC
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <div className="flex items-center justify-center">
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

export default ListeningComprehension;
