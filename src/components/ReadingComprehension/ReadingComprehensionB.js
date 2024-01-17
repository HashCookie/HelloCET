import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionB = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>
      <p>
        <b>Directions:</b>In this section, you are going to read a passage with
        ten statements attached to it.Each statement contains information given
        in one of the paragraphs.Identify the paragraph from which the
        information is derived.You may choose a paragraph more than once.Each
        paragraph is marked with a letter.Answer the questions by marking the
        corresponding letter on Answer Sheet 2.
      </p>
      <b>{data.passageTitle}</b>
      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className={styles.paragraph}
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/\b([A-Z]\))/g, "<strong>$1</strong>"),
          }}
        >
          {/* 加粗处理后的段落将在这里渲染 */}
        </p>
      ))}

      {data.questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <p className={styles.questionTitle}>
            {question.Number}. {question.Statement}
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
