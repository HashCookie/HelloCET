import React from "react";
import {
  passageA,
  options,
  questionsA,
  passageB,
  questionsB,
  PassageOne,
  questionsOne,
  passageTwo,
  questionsTwo,
} from "./data";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehension = () => {
  return (
    <div className={styles.comprehensionContainer}>
      {/* Section A */}
      <h1>Part3 Reading Comprehension</h1>
      <section className={styles.section}>
        <h2>Section A</h2>
        {passageA.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        <div className={styles.optionsContainer}>
          {Object.entries(options).map(([key, value]) => (
            <p key={key} className={styles.optionItem}>
              {key}) {value}
            </p>
          ))}
        </div>
        {questionsA.map((question) => (
          <div key={question.number} className={styles.questionContainer}>
            <p className={styles.questionTitle}>Question {question.number}</p>
            {question.options.map((option) => (
              <button key={option}>{option}</button>
            ))}
          </div>
        ))}
      </section>

      {/* Section B */}
      <section className={styles.section}>
        <h2>Section B</h2>
        {passageB.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {questionsB.map((question) => (
          <div key={question.Number} className={styles.questionContainer}>
            {/* 渲染问题描述 */}
            <p className={styles.questionTitle}>
              {question.Number}: {question.Statement}
            </p>
            <div className={styles.optionsContainer}>
              {/* 只渲染选项的标识符 */}
              {question.Options.map((optionKey) => (
                <button key={optionKey} className={styles.optionButton}>
                  {optionKey}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Section C */}
      <section className={styles.section}>
        <h2>Section C</h2>
        <p>
          <b>Directions:</b>There are 2 passages in this section. Each passage
          is followed by some questions or unfinished statements. For each of
          them there are four choices marked A), B), C) and D). You should
          decide on the best choice and mark the corresponding letter on Answer
          Sheet 2 with a single line through the centre.
        </p>

        {/* Passage One */}
        <b>Passage One</b>
        <br />
        <b>Questions 46 to 50 are based on the following passage.</b>
        {PassageOne.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {questionsOne.map((question) => (
          <div key={question.Number} className={styles.questionContainer}>
            <p className={styles.questionTitle}>
              {question.Number}: {question.Statement}
            </p>
            <div className={styles.optionsContainer}>
              {question.Options.map((option) => (
                <button key={option.key} className={styles.optionButton}>
                  {option.key}) {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Passage Two */}
        <b>Passage Two</b>
        <br />
        <b>Questions 51 to 55 are based on the following passage.</b>
        {passageTwo.map((paragraph, index) => (
          <p key={`passageTwo-${index}`} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {questionsTwo.map((question) => (
          <div
            key={`questionD-${question.Number}`}
            className={styles.questionContainer}
          >
            <p className={styles.questionTitle}>
              {question.Number}: {question.Statement}
            </p>
            <div className={styles.optionsContainer}>
              {question.Options.map((option) => (
                <button
                  key={`optionD-${option.key}`}
                  className={styles.optionButton}
                >
                  {option.key}) {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReadingComprehension;
