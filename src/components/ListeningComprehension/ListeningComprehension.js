import React, { useState, useEffect } from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

const ListeningComprehension = ({ basePath }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    if (basePath) {
      // 加载试题
      fetch(`${basePath}/ListeningComprehension.json`)
        .then(response => response.json())
        .then(data => {
          setQuestions(data.questions);
          // 初始化用户答案
          const initialAnswers = data.questions.reduce((acc, question) => {
            acc[`q${question.number}`] = "";
            return acc;
          }, {});
          setSelectedAnswer(initialAnswers);
        })
        .catch(error => console.error('Error loading data:', error));
  
      // 加载答案
      fetch(`/answers/2017年6月英语四级真题_第1套.json`) // 更新为正确的路径
        .then(response => response.json())
        .then(data => {
          setCorrectAnswers(data.ListeningComprehension); // 确保答案结构与此一致
        })
        .catch(error => console.error('Error loading answers:', error));
    }
    console.log("Loaded correct answers:", correctAnswers);
  }, [basePath]);
  

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: option,  // 直接使用 questionNumber 作为键
    }));
  };  
  

  const handleSubmit = () => {
    let score = 0;
    Object.keys(selectedAnswer).forEach(questionNumber => {
      const userAnswer = selectedAnswer[questionNumber];
      const correctAnswer = correctAnswers[questionNumber]; // 直接使用 questionNumber 作为键
      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });
    console.log("得分:", score);
  };
  
  

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-20">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">Part2 Listening Comprehension</h1>
      <SectionA
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <SectionB
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <SectionC
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <div className="flex items-center justify-center">
      <button onClick={handleSubmit} className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">提交答案</button>
      </div>
    </div>
  );
};

export default ListeningComprehension;
