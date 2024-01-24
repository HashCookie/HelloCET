import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionC = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const renderQuestions = (questions) =>
    questions.map((question, index) => (
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
    ));

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>
      <p>
        <b>Directions:</b>There are 2 passages in this section.Each passage is followed
        by some questions or unfinished statements.For each of them there are
        four choices marked A), B), C) and D). You should decide on the best
        choice and mark the corresponding letter on Answer Sheet 2 with a single
        line through the centre.
      </p>

      <div className={styles.passageContainer}>
        <h3>Passage One</h3>
        <h4>Questions 46 to 50 are based on the following passage.</h4>
        {data.passagesOne.map((passage, index) => (
          <p key={index} className={styles.paragraph}>
            {passage}
          </p>
        ))}
        {renderQuestions(data.questionsOne)}
      </div>

      <div className={styles.passageContainer}>
        <h3>Passage Two</h3>
        <h4>Questions 51 to 55 are based on the following passage.</h4>
        {data.passagesTwo.map((passage, index) => (
          <p key={index} className={styles.paragraph}>
            {passage}
          </p>
        ))}
        {renderQuestions(data.questionsTwo)}
      </div>
    </div>
  );
};

export default ReadingComprehensionC;
