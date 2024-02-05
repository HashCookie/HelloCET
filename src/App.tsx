import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import YearAndSetSelector from "./components/YearAndSetSelector";
import Writing from "./components/Writing/Writing";
import ListeningComprehension from "./components/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./components/ReadingComprehension/ReadingComprehension";
import Translation from "./components/Translation/Translation";
import ContactForm from "./pages/ContactForm";
import ScoreStatistics, { TableRecord } from "./components/ScoreStatistics";

function App() {
  const [basePath, setBasePath] = useState("");
  const [records, setRecords] = useState<TableRecord[]>([]); // 添加records的状态

  const updateListeningScore = (score: number) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.category === "分数") {
          return { ...record, listeningTest: `${score} | 248.5` };
        }
        return record;
      });
    });
  };

  const updateReadingScore = (score: number) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.category === "分数") {
          return {
            ...record,
            readingTest: `${score} | ${record.readingTest.split(" | ")[1]}`,
          };
        }
        return record;
      });
    });
  };

  useEffect(() => {
    // 假设这个函数是异步的并且返回一个Promise，它解析为TableRecord类型的数组
    const fetchRecords = async (): Promise<TableRecord[]> => {
      return [
        {
          category: "时间",
          writingTest: "",
          listeningTest: "",
          readingTest: "",
          translationTest: "",
        },
        {
          category: "题目",
          writingTest: "0 | 1",
          listeningTest: "0 | 25",
          readingTest: "0 | 30",
          translationTest: "0 | 1",
        },
        {
          category: "分数",
          writingTest: "0 | 106.5",
          listeningTest: "0 | 248.5",
          readingTest: "0 | 248.5",
          translationTest: "0 | 106.5",
        },
      ];
    };

    if (basePath) {
      fetchRecords()
        .then((data) => {
          setRecords(data);
        })
        .catch((error) => {
          console.error("Failed to fetch records:", error);
        });
    }
  }, [basePath]); // 当basePath更新时获取数据

  const handleSelect = (path: string) => {
    console.log("Selected basePath:", path);
    setBasePath(path);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/cet4"
          element={
            <YearAndSetSelector onSelect={handleSelect} testType="CET4" />
          }
        />
        <Route
          path="/cet6"
          element={
            <YearAndSetSelector onSelect={handleSelect} testType="CET6" />
          }
        />
        <Route path="/feedback" element={<ContactForm />} />
      </Routes>
      {basePath && (
        <>
          <Writing basePath={basePath} />
          <ListeningComprehension
            basePath={basePath}
            updateListeningScore={updateListeningScore}
          />
          <ReadingComprehension
            basePath={basePath}
            updateReadingScore={updateReadingScore}
          />

          <Translation basePath={basePath} />
          <ScoreStatistics records={records} />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
