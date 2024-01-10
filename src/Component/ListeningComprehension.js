import React, { useState, useEffect } from "react";
import styles from "../styles/ListeningComprehension.module.css";

// 假设您有一个AudioPlayer组件来播放音频
import AudioPlayer from "./AudioPlayer";

const ListeningComprehension = () => {
  const [selectedAnswer, setSelectedAnswer] = useState({ q1: "", q2: "" });
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    // 假设你的JSON文件位于public/questions.json
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleOptionChange = (question, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [question]: option,
    }));
  };

  if (!questions) {
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
          <div className={styles["question"]} key={question.id}>
            <p>{question.id}.</p>
            <ul>
              {question.options.map((option) => (
                <li key={option.value}>
                  <input
                    type="radio"
                    id={`q${question.id}-${option.value}`}
                    name={`q${question.id}`}
                    value={option.value}
                    checked={selectedAnswer[`q${question.id}`] === option.value}
                    onChange={() =>
                      handleOptionChange(`q${question.id}`, option.value)
                    }
                  />
                  <label htmlFor={`q${question.id}-${option.value}`}>
                    {option.text}
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
