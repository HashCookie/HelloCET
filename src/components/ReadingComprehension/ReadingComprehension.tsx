import React, { useState, useEffect } from "react";
import ReadingComprehensionA from "./ReadingComprehensionA";
import ReadingComprehensionB from "./ReadingComprehensionB";
import ReadingComprehensionC from "./ReadingComprehensionC";

interface ReadingComprehensionProps {
  basePath: string;
  updateReadingScore: (score: number, completedQuestions: number) => void;
  updateReadingDuration: (duration: string) => void;
}
interface Answers {
  [key: string]: string;
}

const ReadingComprehension: React.FC<ReadingComprehensionProps> = ({
  basePath,
  updateReadingScore,
  updateReadingDuration,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answers>({});
  const [sectionAData, setSectionAData] = useState(null);
  const [sectionBData, setSectionBData] = useState(null);
  const [sectionCData, setSectionCData] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState<Answers>({});
  const [startTime, setStartTime] = useState<Date>(new Date()); // 设置开始时间

  useEffect(() => {
    if (basePath) {
      // 在开始加载新数据前，重置状态
      setSectionAData(null);
      setSectionBData(null);
      setSectionCData(null);
      setCorrectAnswers({});
      setSelectedAnswer({});
      const paperName = basePath.split("/").slice(-2, -1)[0];
      const testLevel = basePath.includes("CET4") ? "CET4" : "CET6";
      const answerPath = `/answers/${testLevel}/${paperName}.json`;

      const loadData = async () => {
        try {
          // 分别加载题目和答案数据
          const questionResponses = await Promise.all([
            fetch(`${basePath}/ReadingComprehensionA.json`),
            fetch(`${basePath}/ReadingComprehensionB.json`),
            fetch(`${basePath}/ReadingComprehensionC.json`),
          ]);

          questionResponses.forEach((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          });

          const [dataA, dataB, dataC] = await Promise.all(
            questionResponses.map((res) => res.json())
          );

          setSectionAData(dataA);
          setSectionBData(dataB);
          setSectionCData(dataC);

          // 尝试加载答案，如果失败则继续而不抛出错误
          try {
            const answerResponse = await fetch(answerPath);
            if (answerResponse.ok) {
              const answers = await answerResponse.json();
              setCorrectAnswers(answers.ReadingComprehension);
            }
          } catch (error) {
            // 答案加载失败，可能是文件不存在，不处理错误
          }

          // 初始化用户答案
          const initialAnswers: Answers = {};
          [
            ...(dataA?.questions || []),
            ...(dataB?.questions || []),
            ...(dataC?.questions || []),
          ].forEach((question) => {
            const questionNumber = question.number;
            if (typeof questionNumber !== "undefined") {
              initialAnswers[questionNumber.toString()] = "";
            }
          });

          setSelectedAnswer(initialAnswers);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
    }
  }, [basePath]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const handleOptionChange = (questionNumber: number, option: string) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: option,
    }));
  };

  const handleSubmit = () => {
    const end = new Date();

    if (startTime) {
      const durationSeconds = Math.round(
        (end.getTime() - startTime.getTime()) / 1000
      );
      let formattedDuration = "";

      if (durationSeconds < 60) {
        // 小于1分钟，只显示秒
        formattedDuration = `${durationSeconds}秒`;
      } else if (durationSeconds < 3600) {
        // 小于1小时，显示分钟和秒
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        formattedDuration = `${minutes}分钟${seconds
          .toString()
          .padStart(2, "0")}秒`;
      } else {
        // 大于等于1小时，显示小时、分钟和秒
        const hours = Math.floor(durationSeconds / 3600);
        const minutes = Math.floor((durationSeconds % 3600) / 60);
        const seconds = durationSeconds % 60;
        formattedDuration = `${hours}小时${minutes
          .toString()
          .padStart(2, "0")}分钟${seconds.toString().padStart(2, "0")}秒`;
      }

      console.log("耗时:", formattedDuration);
      updateReadingDuration(formattedDuration); // 更新耗时
    }
    // 各题型每题的分数
    const scorePerBlankFillingQuestion = 3.55; // 选词填空每题分数
    const scorePerParagraphMatchingQuestion = 7.1; // 段落匹配每题分数
    const scorePerCarefulReadingQuestion = 14.2; // 仔细阅读每题分数

    // 计算原始阅读分数
    let rawReadingScore = 0;
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      const questionIndex = parseInt(questionNumber); // 直接转换为数字
      const userAnswer = selectedAnswer[questionNumber.toString()];
      const correctAnswer = correctAnswers[questionNumber.toString()];

      if (userAnswer === correctAnswer) {
        // 判断题型并计算分数
        if (questionIndex >= 26 && questionIndex <= 35) {
          rawReadingScore += scorePerBlankFillingQuestion;
        } else if (questionIndex >= 36 && questionIndex <= 45) {
          rawReadingScore += scorePerParagraphMatchingQuestion;
        } else if (questionIndex >= 46 && questionIndex <= 55) {
          rawReadingScore += scorePerCarefulReadingQuestion;
        }
      }
    });

    // 计算完成的题目数量
    const completedQuestions = Object.keys(selectedAnswer).filter(
      (key) => selectedAnswer[key] !== ""
    ).length;

    const roundedScore = Math.round(rawReadingScore * 10) / 10;
    console.log("阅读成绩:", roundedScore);

    // 通过 updateReadingScore 方法更新 App 组件中的 records 状态
    updateReadingScore(roundedScore, completedQuestions);
  };

  if (!sectionAData || !sectionBData || !sectionCData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20 mt-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part3 Reading Comprehension
      </h1>
      <ReadingComprehensionA
        data={sectionAData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <ReadingComprehensionB
        data={sectionBData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <ReadingComprehensionC
        data={sectionCData}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          提交
        </button>
      </div>
    </div>
  );
};

export default ReadingComprehension;
