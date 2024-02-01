import React, { useState, useEffect } from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

interface ListeningComprehensionProps {
  basePath: string;
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
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answers>({});
  const [questions, setQuestions] = useState<any[]>([]); // 如果您知道问题的具体类型，可以替换 any
  const [correctAnswers, setCorrectAnswers] = useState<Answers>({});
  const [year, setYear] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const [month, setMonth] = useState("");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  useEffect(() => {
    if (basePath) {
      // 加载试题
      fetch(`${basePath}/ListeningComprehension.json`)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions as Question[]); // 假设data.questions是Question类型的数组
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
    // 各题型每题的分数
    const scorePerShortNewsQuestion = 7.1;
    const scorePerLongConversationQuestion = 7.1;
    const scorePerPassageQuestion = 14.2;

    // 计算原始听力分数
    let rawListeningScore = 0;
    Object.keys(selectedAnswer).forEach((questionNumber) => {
      const questionIndex = parseInt(questionNumber.slice(1)); // 去掉'q'，转换为数字
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

    // 由于没有常模转换数据，直接输出原始分数
    console.log("听力成绩:", rawListeningScore);
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
