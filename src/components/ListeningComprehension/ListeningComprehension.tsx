import React, { useState, useEffect } from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

interface ListeningComprehensionProps {
  basePath: string;
  updateListeningScore: (score: number, totalQuestionsDone: number) => void;
  updateListeningDuration: (duration: string) => void;
}

interface Question {
  number: number;
  // 如果还有其他属性，请在这里添加
}

interface Answers {
  [key: string]: string;
}

const ListeningComprehension: React.FC<ListeningComprehensionProps> = ({
  basePath,
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
          const answerPath = `/answers/${paperName}.json`;

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
      [questionNumber]: option, // 直接使用 questionNumber 作为键
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
      updateListeningDuration(formattedDuration); // 更新耗时
    }
    // 各题型每题的分数
    const scorePerShortNewsQuestion = 7.1;
    const scorePerLongConversationQuestion = 7.1;
    const scorePerPassageQuestion = 14.2;

    // 计算原始听力分数
    let rawListeningScore = 0;
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      // 因为现在questionNumber是直接从selectedAnswer的键获取的，所以不需要去掉'q'
      const questionIndex = parseInt(questionNumber); // 直接转换为数字
      const userAnswer = selectedAnswer[questionNumber];
      const correctAnswer = correctAnswers[questionNumber];

      if (userAnswer === correctAnswer) {
        // 判断题型并计算分数
        if (questionIndex <= 7) {
          rawListeningScore += scorePerShortNewsQuestion;
        } else if (questionIndex <= 15) {
          rawListeningScore += scorePerLongConversationQuestion;
        } else {
          rawListeningScore += scorePerPassageQuestion;
        }
      }
    });

    const totalQuestionsDone = Object.keys(selectedAnswer).filter(
      (key) => selectedAnswer[key] !== ""
    ).length;
    const roundedScore = Math.round(rawListeningScore * 10) / 10;
    console.log("听力成绩:", roundedScore);
    updateListeningScore(roundedScore, totalQuestionsDone);
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        Part2 Listening Comprehension
      </h1>
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
          提交答案
        </button>
      </div>
    </div>
  );
};

export default ListeningComprehension;
