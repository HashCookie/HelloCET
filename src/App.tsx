import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import YearAndSetSelector from "./components/YearAndSetSelector";
import Writing from "./components/Writing/Writing";
import ListeningComprehension from "./components/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./components/ReadingComprehension/ReadingComprehension";
import Translation from "./components/Translation/Translation";
import ContactForm from "./pages/ContactForm";
import ScoreStatistics, { TableRecord } from "./components/ScoreStatistics";
import HeroSection from "./pages/HeroSection";
import ScoresHistory from "./pages/ScoresHistory";
import { v4 as uuidv4 } from "uuid";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { extractPaperDetails } from "./utils/parseUtils";
import { fetchRecords } from "./utils/dataUtils";

function MainApp() {
  const [basePath, setBasePath] = useState("");
  const [records, setRecords] = useState<TableRecord[]>([]);
  const [attemptTimestamp, setAttemptTimestamp] = useState("");
  let location = useLocation();

  useEffect(() => {
    // 当路由变化时重置basePath
    if (location.pathname === "/") {
      setBasePath("");
    }
  }, [location]);

  useEffect(() => {
    if (basePath) {
      setAttemptTimestamp(uuidv4());
    } else {
      setAttemptTimestamp(""); // 重置时间戳
    }
  }, [basePath]);

  const updateListeningScore = useCallback(
    (score: number, totalQuestionsDone: number, attemptTimestamp: string) => {
      setRecords((prevRecords) => {
        return prevRecords.map((record) => {
          if (record.category === "分数") {
            return {
              ...record,
              listeningTest: `${score} | 248.5`,
              listeningTimestamp: attemptTimestamp,
            };
          } else if (record.category === "题目") {
            // 更新完成的题目数量
            return {
              ...record,
              listeningTest: `${totalQuestionsDone} | 25`,
              listeningTimestamp: attemptTimestamp,
            };
          }
          return record;
        });
      });
    },
    []
  );

  const updateReadingScore = useCallback(
    (score: number, completedQuestions: number, attemptTimestamp: string) => {
      setRecords((prevRecords) => {
        return prevRecords.map((record) => {
          if (record.category === "分数") {
            return {
              ...record,
              readingTest: `${score} | ${record.readingTest.split(" | ")[1]}`,
              readingTimestamp: attemptTimestamp,
            };
          } else if (record.category === "题目") {
            return {
              ...record,
              readingTest: `${completedQuestions} | ${
                record.readingTest.split(" | ")[1]
              }`,
              readingTimestamp: attemptTimestamp,
            };
          }
          return record;
        });
      });
    },
    []
  );

  const updateWritingScore = useCallback(
    (score: number, completedQuestions: number, attemptTimestamp: string) => {
      console.log(
        `Updating writing score: ${score}, Completed Questions: ${completedQuestions}`
      );
      setRecords((prevRecords) => {
        return prevRecords.map((record) => {
          if (record.category === "分数") {
            return {
              ...record,
              writingTest: `${score} | ${record.writingTest.split(" | ")[1]}`,
              writingTimestamp: attemptTimestamp,
            };
          } else if (record.category === "题目") {
            return {
              ...record,
              writingTest: `${completedQuestions} | ${
                record.writingTest.split(" | ")[1]
              }`,
              writingTimestamp: attemptTimestamp,
            };
          }
          return record;
        });
      });
    },
    []
  );
  const updateWritingDuration = useCallback((duration: string) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.category === "时间") {
          return { ...record, WritingTest: `${duration}` };
        }
        return record;
      });
    });
  }, []);

  const updateListeningDuration = useCallback((duration: string) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.category === "时间") {
          return { ...record, listeningTest: `${duration}` };
        }
        return record;
      });
    });
  }, []);

  const updateReadingDuration = useCallback((duration: string) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.category === "时间") {
          return { ...record, readingTest: `${duration}` };
        }
        return record;
      });
    });
  }, []);

  useEffect(() => {
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

  const renderPaperName = () => {
    if (!basePath) return "";
    return extractPaperDetails(basePath);
  };

  const isHomePage = location.pathname === "/"; // 判断是否是首页

  return (
    <>
      {isHomePage && (
        // 只有在首页时才渲染这个背景
        <div className="main">
          <div className="gradient"></div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col h-screen bg-white">
              <Header />
              <HeroSection />
            </div>
          }
        />
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
        <Route path="/scores" element={<ScoresHistory />} />
      </Routes>
      {basePath && (
        <>
          <div className="mt-10 text-center font-mono font-bold text-xl md:text-2xl lg:text-3xl">
            {renderPaperName()}
          </div>
          <Writing
            basePath={basePath}
            attemptTimestamp={attemptTimestamp}
            updateWritingScore={updateWritingScore}
            updateWritingDuration={updateWritingDuration}
          />
          <ListeningComprehension
            basePath={basePath}
            attemptTimestamp={attemptTimestamp}
            updateListeningScore={updateListeningScore}
            updateListeningDuration={updateListeningDuration}
          />
          <ReadingComprehension
            basePath={basePath}
            attemptTimestamp={attemptTimestamp}
            updateReadingScore={updateReadingScore}
            updateReadingDuration={updateReadingDuration}
          />
          <Translation basePath={basePath} />
          <ScoreStatistics records={records} />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Theme>
        <MainApp />
        <SpeedInsights />
      </Theme>
    </BrowserRouter>
  );
}

export default App;
