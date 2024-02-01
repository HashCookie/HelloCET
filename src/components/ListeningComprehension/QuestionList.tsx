import React from "react";
import styles from "../../styles/ListeningComprehension.module.css";

// 定义问题的接口
interface Question {
  number: number;
  options: { [key: string]: string };
}

// 定义QuestionList组件的props的接口
interface QuestionListProps {
  questions: Question[];
  selectedAnswer: { [key: number]: string };
  onAnswerChange: (questionNumber: number, option: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedAnswer,
  onAnswerChange,
}) => {
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
                <label
                  htmlFor={`q${question.number}-${key}`}
                  className="cursor-pointer"
                >
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
