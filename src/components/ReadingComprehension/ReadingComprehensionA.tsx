import React from "react";

interface Question {
  number: number;
  options: string[];
}

interface Data {
  title: string;
  passages: string[];
  options: { [key: string]: string };
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

  // 生成问题数组
  const questions = Array.from({ length: 10 }, (_, i) => ({
    number: i + 26,
    options: Object.keys(data.options)
  }));

  return (
    <div className="container mx-auto px-1">
      <h2 className="text-xl font-bold text-left mb-6">{data.title}</h2>
      <p className="text-base italic font-serif">
        <b>Directions:</b> In this section, there is a passage with ten blanks.
        You are required to select one word for each blank from a list of
        choices given in a word bank following the passage. Read the passage
        through carefully before making your choices. Each choice in the bank is
        identified by a letter. Please mark the corresponding letter for each
        item on <b>Answer Sheet 2</b> with a single line through the centre. You
        may not use any of the words in the bank more than once.
      </p>
      <b className="block mb-3">
        Questions 26 to 35 are based on the following passage.
      </b>

      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className="text-base text-justify indent-8 mb-1"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(
              /\b(26|27|28|29|30|31|32|33|34|35)\b/g,
              "<strong>$1</strong>"
            ),
          }}
        ></p>
      ))}

      {/* 选项列表 */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Object.entries(data.options).map(([key, value]) => (
          <p
            key={key}
            className="px-4 py-2 rounded-lg border flex justify-center items-center text-center"
          >
            {key}) {value}
          </p>
        ))}
      </div>

      {questions.map((question) => (
        <div key={question.number} className="mb-6">
          <p className="font-bold">Question {question.number}</p>
          <div className="flex flex-wrap -mx-1">
            {question.options.map((option) => {
              const isSelected = selectedAnswer[question.number] === option;
              const buttonStyle = isSelected
                ? "border-blue-500 bg-blue-500 hover:bg-blue-700 text-white" // 选中时的样式
                : "border-gray-300 bg-white hover:bg-blue-100 text-black"; // 未选中时的样式
              return (
                <button
                  key={option}
                  className={`px-4 py-2 m-2 rounded-lg border ${buttonStyle} flex-auto md:flex-none`}
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
