import React, { useState, useEffect } from "react";
import styles from '../../styles/ListeningComprehension.module.css';
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

const ListeningComprehension = ({ basePath }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/listeningComprehensionQuestions.json`)
        .then(response => response.json())
        .then(data => {
          setQuestions(data.questions);
          const initialAnswers = data.questions.reduce((acc, question) => {
            acc[`q${question.number}`] = "";
            return acc;
          }, {});
          setSelectedAnswer(initialAnswers);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [basePath]);

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [`q${questionNumber}`]: option,
    }));
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
    </div>
  );
};

export default ListeningComprehension;
