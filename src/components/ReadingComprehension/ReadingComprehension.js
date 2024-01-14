import React, { useState, useEffect } from 'react';
import ReadingComprehensionA from './ReadingComprehensionA';
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehension = ({ basePath }) => {
  const [sectionAData, setSectionAData] = useState(null);

  useEffect(() => {
    if (basePath) {
      fetch(`${basePath}ReadingComprehensionA.json`)  // 假设 Section A 的数据在这个文件中
        .then(response => response.json())
        .then(data => {
          setSectionAData(data);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [basePath]);

  if (!sectionAData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comprehensionContainer}>
      <h1>Reading Comprehension</h1>
      <ReadingComprehensionA data={sectionAData} />
    </div>
  );
};

export default ReadingComprehension;
