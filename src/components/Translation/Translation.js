import React, { useState, useEffect } from "react";
import styles from "../../styles/Translation.module.css"; // 确保路径正确

const Translation = ({ basePath }) => {
  const [Directions, setDirections] = useState("");
  const [ChinesePassage, setChinesePassage] = useState("");

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}/Translation.json`)
        .then(response => response.json())
        .then(data => {
          setDirections(data.Directions);
          setChinesePassage(data.ChinesePassage);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [basePath]); // 依赖数组包含 basePath，确保路径改变时重新加载

  return (
    <div className={styles.container}>
      <h1>Part 4 Translation (30 minutes)</h1>
      <p className={styles.directions}>{Directions}</p>
      <p className={styles.chinesePassage}>{ChinesePassage}</p>
      <textarea
        className={styles.textarea}
        placeholder="Enter your translation here."
      />
    </div>
  );
};

export default Translation;
