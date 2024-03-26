import React, { useState, useEffect } from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

interface ListeningComprehensionProps {
  basePath: string;
  attemptTimestamp: string;
  updateListeningScore: (
    score: number,
    completedQuestions: number,
    attemptTimestamp: string
  ) => void;
  updateListeningDuration: (duration: string) => void;
}

interface Question {
  number: number;
}

interface Answers {
  [key: string]: string;
}

const ListeningComprehension: React.FC<ListeningComprehensionProps> = ({
  basePath,
  attemptTimestamp,
  updateListeningScore,
  updateListeningDuration,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answers>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Answers>({});
  const [year, setYear] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const [month, setMonth] = useState("");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (basePath) {
      // 加载试题
      fetch(`${basePath}/ListeningComprehension.json`)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions as Question[]); // data.questions是Question类型的数组
          // 初始化用户答案
          const initialAnswers = data.questions.reduce(
            (acc: Answers, question: Question) => {
              acc[`q${question.number}`] = "";
              return acc;
            },
            {}
          );
          setSelectedAnswer(initialAnswers);

          // 提取试卷名称
          const paperName = basePath.split("/").slice(-2, -1)[0];
          const testLevel = basePath.includes("CET4") ? "CET4" : "CET6";
          const answerPath = `/answers/${testLevel}/${paperName}.json`;

          // 加载答案
          fetch(answerPath)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setCorrectAnswers(data.ListeningComprehension);
            })
            .catch((error) => console.error("Error loading answers:", error));
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [basePath]); // 只在 basePath 改变时运行

  // 当basePath变化时，解析年份、月份和试卷编号
  useEffect(() => {
    if (basePath) {
      const matches = basePath.match(/(\d{4})年(\d+)月英语四级真题_第(\d+)套/);
      if (matches) {
        setYear(matches[1]);
        setMonth(matches[2]); // 使用第二个捕获组来获取月份
        setPaperNumber(matches[3]); // 使用第三个捕获组来获取试卷编号
      }
    }
  }, [basePath]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // 在回调函数中设置当前播放的音频ID
  const handleAudioPlay = (audioId: string | null) => {
    setPlayingAudio(audioId);
  };

  const handleOptionChange = (questionNumber: number, option: string) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: option,
    }));
  };
  const extractPaperName = (basePath:string) => {
    const regex = /(\d{4})年(\d+)月英语四级真题_第(\d+)套/;
    const match = basePath.match(regex);
    if (match) {
      const [, year, month, setNumber] = match;
      return `英语四级${year}年${month}月第${setNumber}套`;
    }
    return "未知试卷";
  };

  const handleSubmit = () => {
    const end = new Date();
    let durationInSeconds = 0;

    if (startTime) {
      durationInSeconds = Math.round(
        (end.getTime() - startTime.getTime()) / 1000
      );

      let formattedDuration = "";
      if (durationInSeconds < 60) {
        formattedDuration = `${durationInSeconds}秒`;
      } else if (durationInSeconds < 3600) {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        formattedDuration = `${minutes}分钟${seconds
          .toString()
          .padStart(2, "0")}秒`;
      } else {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        formattedDuration = `${hours}小时${minutes
          .toString()
          .padStart(2, "0")}分钟${seconds.toString().padStart(2, "0")}秒`;
      }

      updateListeningDuration(formattedDuration);
    }

    // 计算原始听力分数
    let rawListeningScore = 0;
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      const questionIndex = parseInt(questionNumber.replace("q", ""), 10);
      const userAnswer = selectedAnswer[questionNumber];
      const correctAnswer = correctAnswers[questionNumber];

      if (userAnswer === correctAnswer) {
        if (questionIndex <= 7) {
          rawListeningScore += 7.1;
        } else if (questionIndex <= 15) {
          rawListeningScore += 7.1;
        } else {
          rawListeningScore += 14.2;
        }
      }
    });

    const completedQuestions = Object.keys(selectedAnswer).filter(
      (key) => selectedAnswer[key] !== ""
    ).length;
    const roundedScore = Math.round(rawListeningScore * 10) / 10;
    updateListeningScore(roundedScore, completedQuestions, attemptTimestamp);

    const paperName = extractPaperName(basePath);

    // 保存成绩到localStorage
    const scoreRecord = {
      date: new Date().toISOString(),
      score: roundedScore,
      completedQuestions,
      seconds: durationInSeconds,
      attemptId: attemptTimestamp,
      type: paperName,
    };
    const existingRecords = JSON.parse(
      localStorage.getItem("listeningScores") || "[]"
    );
    existingRecords.push(scoreRecord);
    localStorage.setItem("listeningScores", JSON.stringify(existingRecords));
  };

  return (
    <div className="container mx-auto px-20 mt-10">
      <div className="text-base md:text-xl lg:text-2xl font-bold font-serif text-center mb-6 flex justify-between items-center">
        <h2>Part II</h2>
        <h1>Listening Comprehension</h1>
        <h2>(30 minutes)</h2>
      </div>
      <SectionA
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
        playingAudio={playingAudio}
        onAudioPlay={handleAudioPlay}
      />
      <SectionB
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
        playingAudio={playingAudio}
        onAudioPlay={handleAudioPlay}
      />
      <SectionC
        year={year}
        month={month}
        paperNumber={paperNumber}
        questions={questions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
        playingAudio={playingAudio}
        onAudioPlay={handleAudioPlay}
      />
      <div className="flex items-center justify-center">
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

export default ListeningComprehension;
