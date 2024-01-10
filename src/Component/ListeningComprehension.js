import React, { useState, useEffect } from "react";
import styles from "../styles/ListeningComprehension.module.css";
// 假设您有一个AudioPlayer组件来播放音频
import AudioPlayer from "./AudioPlayer";

const ListeningComprehension = () => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // 假设您的 JSON 文件位于 public/questions.json
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions); // 这里需要访问 data.questions
        // 初始化所有问题的答案状态为空字符串
        const initialAnswers = data.questions.reduce((acc, question) => {
          acc[`q${question.number}`] = ""; // 使用 `number` 而不是 `id`
          return acc;
        }, {});
        setSelectedAnswer(initialAnswers);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [`q${questionNumber}`]: option,
    }));
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["listening-comprehension-container"]}>
      <h2>Part2 Listening Comprehension</h2>
      <section>
        <h3>Section A</h3>
        <p>
          Directions: In this section, you will hear three news reports. At the
          end of each news report, you will hear two or three questions. Both
          the news report and the questions will be spoken only once. After you
          hear a question, you must choose the best answer from the four choices
          marked A), B), C) and D). Then mark the corresponding letter on Answer
          Sheet 1 with a single line through the centre.
        </p>
        <AudioPlayer src="path-to-your-audio-file" />
      </section>

      <div className={styles["questions"]}>
        {questions.map((question) => (
          <div className={styles["question"]} key={question.number}>
            <p>{question.number}.</p>
            <ul>
              {Object.entries(question.options).map(([key, text]) => (
                <li key={key}>
                  <input
                    type="radio"
                    id={`q${question.number}-${key}`}
                    name={`q${question.number}`}
                    value={key}
                    checked={selectedAnswer[`q${question.number}`] === key}
                    onChange={() => handleOptionChange(question.number, key)}
                  />
                  <label htmlFor={`q${question.number}-${key}`}>
                    {key}) {text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ListeningComprehension;
