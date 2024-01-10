import React from "react";
import styles from '../../styles/ListeningComprehension.module.css';

const QuestionList = ({ questions, selectedAnswer, onAnswerChange }) => {
  return (
    <div className={styles["questions"]}>
      {questions.map((question) => (
        <div className={styles["question"]} key={question.number}>
          <p>{question.number}.</p>
          <ul>
            {Object.entries(question.options).map(([key, text]) => (
              <li key={key}>
                <input
                  type="radio"
                  id={`q${question.number}-${key}`}
                  name={`q${question.number}`}
                  value={key}
                  checked={selectedAnswer[`q${question.number}`] === key}
                  onChange={() => onAnswerChange(question.number, key)}
                />
                <label htmlFor={`q${question.number}-${key}`}>
                  {key}) {text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
