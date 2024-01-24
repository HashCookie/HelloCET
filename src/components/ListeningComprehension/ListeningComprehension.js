import React, { useState, useEffect } from "react";
import styles from '../../styles/ListeningComprehension.module.css';
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
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["listeningComprehensionContainer"]}>
      <h2>Part2 Listening Comprehension</h2>
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
      <button onClick={handleSubmit}>提交答案</button>
    </div>
  );
};

export default ListeningComprehension;
