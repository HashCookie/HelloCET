import React from "react";
import styles from "../../styles/ListeningComprehension.module.css";

const QuestionList = ({ questions, selectedAnswer, onAnswerChange }) => {
  return (
    <div className={styles["questions"]}>
      {questions.map((question) => (
        <div className={styles["question"]} key={question.number}>
          <p className="font-semibold">{question.number}.</p>
          <ul className="list-inside list-decimal">
            {Object.entries(question.options).map(([key, text]) => (
              <li key={key} className="ml-4">
                <input
                  type="radio"
                  id={`q${question.number}-${key}`}
                  name={`q${question.number}`}
                  value={key}
                  checked={selectedAnswer[question.number] === key}
                  onChange={() => onAnswerChange(question.number, key)}
                  className="mr-2"
                />
                <label htmlFor={`q${question.number}-${key}`} className="cursor-pointer">
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
