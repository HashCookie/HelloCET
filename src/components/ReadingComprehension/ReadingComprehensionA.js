import React, { useState } from "react";

const ReadingComprehensionA = ({ data, onAnswerChange }) => {
  // 用于存储每个问题选中的选项
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // 处理选项改变时的函数
  const handleAnswerChange = (questionNumber, optionKey) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionNumber]: optionKey,
    }));
    // 调用父组件的回调函数来更新父组件的状态
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
      <p className="mb-4 text-base text-justify">
        <b>Directions:</b> In this section, there is a passage with ten blanks.
        You are required to select one word for each blank from a list of
        choices given in a word bank following the passage. Read the passage
        through carefully before making your choices, Each choice in the bank is
        identified by a letter. Please mark the corresponding letter for each
        item on Answer Sheet 2 with a single line through the centre. You may
        not use any of the words in the bank more than once.
      </p>
      <br />

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

      {data.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="font-bold">Question {question.number}</p>
          <div className="flex justify-start space-x-2">
            {question.options.map((option, oIndex) => {
              const isSelected = selectedAnswers[question.number] === option;
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
