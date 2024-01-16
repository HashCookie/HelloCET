import React, { useState, useEffect } from "react";
import styles from "../../styles/Writing.module.css";

const WritingTestPage = ({ basePath }) => {
  // 这里添加了 basePath 作为 prop
  const [essay, setEssay] = useState("");
  const [Directions, setDirections] = useState("");

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}Writing.json`)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.Directions);
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 这里使用 basePath 作为依赖

  const handleInputChange = (e) => {
    setEssay(e.target.value);
  };

  return (
    <div className={styles["writing-test-container"]}>
      <h1>Part1 Writing (30 minutes)</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: Directions.replace(/(Directions:)/, "<strong>$1</strong>"),
        }}
      ></p>
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
