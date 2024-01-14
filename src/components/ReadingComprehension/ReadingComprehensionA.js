import React from 'react';
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionA = ({ data }) => {
  // 如果没有数据，显示加载信息
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>

      {data.passages.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>{paragraph}</p>
      ))}

      <div className={styles.optionsContainer}>
        {Object.entries(data.options).map(([key, value]) => (
          <p key={key} className={styles.optionItem}>{key}) {value}</p>
        ))}
      </div>

      {data.questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <p className={styles.questionTitle}>Question {question.number}</p>
          <div className={styles.optionsButtons}>
            {question.options.map((option, oIndex) => (
              <button key={oIndex} className={styles.optionButton}>{option}</button>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default ReadingComprehensionA;
