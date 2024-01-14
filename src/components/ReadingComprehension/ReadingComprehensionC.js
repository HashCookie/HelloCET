import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionC = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>
      {data.passages.map((passage, index) => (
        <p key={index} className={styles.paragraph}>
          {passage}
        </p>
      ))}
      {data.questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <p className={styles.questionTitle}>
            Question {question.Number}: {question.Statement}
          </p>
          <div className={styles.optionsButtons}>
            {question.Options.map((option, oIndex) => (
              <button key={oIndex} className={styles.optionButton}>
                {option.key}) {option.text}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingComprehensionC;
