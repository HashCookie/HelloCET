import React, { useState, useEffect } from "react";
import styles from "../../styles/Translation.module.css"; // 确保路径正确

const Translation = () => {
  const [directions, setDirections] = useState("");

  useEffect(() => {
    // 假设这是您要加载的文本
    const text =
      "Directions: For this part, you are allowed 30 minutes to translate a passage from Chinese into English. You should write your answer on Answer Sheet 2.";
    setDirections(text);
  }, []); // 空数组确保了效果只在组件加载时运行一次

  return (
    <div className={styles.container}>
      <h1>Part 4 Translation (30 minutes)</h1>
      <p className={styles.directions}>{directions}</p>
      <textarea
        className={styles.textarea}
        placeholder="Enter your translation here."
      />
    </div>
  );
};

export default Translation;
