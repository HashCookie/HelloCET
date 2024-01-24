import React, { useState, useEffect } from "react";
import ReadingComprehensionA from "./ReadingComprehensionA";
import ReadingComprehensionB from "./ReadingComprehensionB";
import ReadingComprehensionC from "./ReadingComprehensionC";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehension = ({ basePath }) => {
  const [sectionAData, setSectionAData] = useState(null);
  const [sectionBData, setSectionBData] = useState(null);
  const [sectionCData, setSectionCData] = useState(null);

  useEffect(() => {
    if (basePath) {
      // 加载 Section A 数据
      fetch(`${basePath}/ReadingComprehensionA.json`)
        .then((response) => response.json())
        .then((data) => setSectionAData(data))
        .catch((error) => console.error("Error loading data:", error));

      // 加载 Section B 数据
      fetch(`${basePath}/ReadingComprehensionB.json`)
        .then((response) => response.json())
        .then((data) => setSectionBData(data))
        .catch((error) => console.error("Error loading data:", error));

      // 加载 Section C 数据
      fetch(`${basePath}/ReadingComprehensionC.json`)
        .then((response) => response.json())
        .then((data) => setSectionCData(data))
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]);

  return (
    <div className={styles.comprehensionContainer}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">Part3 Reading Comprehension</h1>
      <ReadingComprehensionA data={sectionAData} />
      <ReadingComprehensionB data={sectionBData} />
      <ReadingComprehensionC data={sectionCData} />
    </div>
  );
};

export default ReadingComprehension;
