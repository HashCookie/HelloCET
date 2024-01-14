import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionB = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>
      {data.passages.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
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
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingComprehensionB;
