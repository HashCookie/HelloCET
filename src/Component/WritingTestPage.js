import React, { useState, useEffect } from "react";
import styles from "../styles/WritingTestPage.module.css";

const WritingTestPage = () => {
  const [essay, setEssay] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    // 模拟从外部加载 JSON 数据
    const mockData = {
      instructions:
        "Directions: For this part, you are allowed 30 minutes to write on the topic Changes in the Way of Education. You should write at least 120 words but no more than 180 words.",
      // 您可以在这里添加更多的数据
    };

    // 设置说明文本
    setInstructions(mockData.instructions);
  }, []);

  const handleInputChange = (e) => {
    setEssay(e.target.value);
  };

  return (
    <div className={styles["writing-test-container"]}>
      <h1>Part1 Writing (30 minutes)</h1>
      <p>{instructions}</p>
      <textarea
        value={essay}
        onChange={handleInputChange}
        placeholder="请输入文本"
        maxLength={180}
      />
      <button onClick={() => console.log(essay)}>提交</button>
    </div>
  );
};

export default WritingTestPage;
