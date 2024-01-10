import React from "react";
import styles from '../../styles/ReadingComprehension.module.css';


const ReadingComprehension = () => {
  // 假设文章文本和问题已经定义在某处
  const passage = [
    "Trust is fundamental to life. If you can’t trust anything, life becomes intolerable. You can’t have relationships without trust, let alone good ones.",
    'In the workplace, too, trust is 26 . An organization without trust will be full of fear and 27 . If you work for a boss who doesn’t trust their employees to do things right, you’ll have a 28 time. They’ll be checking up on you all the time, correcting "mistakes" and 29 reminding you to do this or that.',
    "Organizations are always trying to cut costs. Think of all the additional tasks caused by lack of trust. Audit (审计) departments only exist because of it. Companies keep large volumes of 31 because they don't trust their suppliers, their contractors or their customers. Probably more than half of all administrative work is only there because of an ever-existing sense that “you can't trust anyone these days.” If even a small part of such valueless work could be 32, the savings would run into millions of dollars.",
  ];
  const options = {
    A: "constantly",
    B: "credible",
    C: "essential",
    D: "exploring",
    E: "gather",
    F: "load",
    G: "miserable",
    H: "pressure",
    I: "properly",
    J: "records",
    K: "removed",
    L: "stacks",
    M: "suspicion",
    N: "tracked",
    O: "watching",
  };
  const questions = [
    // 每个问题是一个对象，包含问题编号和选项
    {
      number: 26,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 27,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 28,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 29,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 30,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 31,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 32,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 33,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 34,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
    {
      number: 35,
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
    },
  ];

  return (
    <div className={styles.comprehensionContainer}>
      <h1>Part3 Reading Comprehension</h1>
      <section className={styles.section}>
        <h2>Section A</h2>
        {passage.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>{paragraph}</p>
        ))}
         <div className={styles.optionsContainer}>
          {Object.entries(options).map(([key, value]) => (
            <p key={key} className={styles.optionItem}>{key}) {value}</p>
          ))}
        </div>
        {questions.map((question) => (
          <div key={question.number} className={styles.questionContainer}>
            <p className={styles.questionTitle}>Question {question.number}</p>
            {question.options.map((option) => (
              <button key={option}>{option}</button>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReadingComprehension;

