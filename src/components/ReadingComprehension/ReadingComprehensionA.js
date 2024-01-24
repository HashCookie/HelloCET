import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehensionA = ({ data }) => {
  // 如果没有数据，显示加载信息
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h2>{data.title}</h2>
      <p>
        <b>Directions:</b> In this section, there is a passage with ten blanks.
        You are required to select one word for each blank from a list of
        choices given in a word bank following the passage. Read the passage
        through carefully before making your choices, Each choice in the bank is
        identified by a letter. Please mark the corresponding letter for each
        item on Answer Sheet 2 with a single line through the centre. You may
        not use any of the words in the bank more than once.
      </p>
      <br />

      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className={styles.paragraph}
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(
              /\b(26|27|28|29|30|31|32|33|34|35)\b/g,
              "<strong>$1</strong>"
            ),
          }}
        >
          {/* HTML tags inside paragraph will be rendered */}
        </p>
      ))}

      <div className={styles.optionsContainer}>
        {Object.entries(data.options).map(([key, value]) => (
          <p key={key} className={styles.optionItem}>
            {key}) {value}
          </p>
        ))}
      </div>

      {data.questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <p className={styles.questionTitle}>Question {question.number}</p>
          <div className={styles.optionsButtons}>
            {question.options.map((option, oIndex) => (
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

export default ReadingComprehensionA;
