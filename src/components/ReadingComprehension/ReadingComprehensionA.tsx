import React from "react";

interface Question {
  number: number;
  options: string[];
}

interface Data {
  title: string;
  passages: string[];
  options: { [key: string]: string };
  questions: Question[];
}

interface ReadingComprehensionAProps {
  data: Data;
  selectedAnswer: { [key: number]: string };
  onAnswerChange: (questionNumber: number, optionKey: string) => void;
}

const ReadingComprehensionA: React.FC<ReadingComprehensionAProps> = ({
  data,
  selectedAnswer,
  onAnswerChange,
}) => {
  // 处理选项改变时的函数
  const handleAnswerChange = (questionNumber: number, optionKey: string) => {
    if (onAnswerChange) {
      onAnswerChange(questionNumber, optionKey);
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1">
      <h2 className="text-xl font-bold text-center mb-6">{data.title}</h2>
      <p className="mb-4 text-base text-justify">{/* 说明文字 */}</p>
      <br />

      {/* 文章段落 */}
      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className="mb-4 text-base text-justify"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(
              /\b(26|27|28|29|30|31|32|33|34|35)\b/g,
              "<strong>$1</strong>"
            ),
          }}
        ></p>
      ))}

      {/* 选项列表 */}
      <div className="mb-6">
        {Object.entries(data.options).map(([key, value]) => (
          <p
            key={key}
            className="inline-block mr-3 mb-1 px-4 py-2 rounded-lg border"
          >
            {key}) {value}
          </p>
        ))}
      </div>

      {/* 问题列表 */}
      {data.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="font-bold">Question {question.number}</p>
          <div className="flex justify-start space-x-2">
            {question.options.map((option, oIndex) => {
              const isSelected = selectedAnswer[question.number] === option;
              const buttonStyle = isSelected
                ? "bg-blue-500 text-white" // 选中时的样式
                : "bg-white text-black border border-gray-300 hover:bg-blue-100"; // 未选中时的样式
              return (
                <button
                  key={oIndex}
                  className={`px-4 py-2 rounded-lg ${buttonStyle}`}
                  onClick={() => handleAnswerChange(question.number, option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingComprehensionA;
