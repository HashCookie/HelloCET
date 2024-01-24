import React, { useState } from "react";

const ReadingComprehensionB = ({ data }) => {
  // 储存每个问题的选中答案
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // 处理选项选择的函数
  const handleOptionSelect = (questionNumber, option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionNumber]: option,
    }));
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
        <b>Directions:</b>In this section, you are going to read a passage with
        ten statements attached to it.Each statement contains information given
        in one of the paragraphs.Identify the paragraph from which the
        information is derived.You may choose a paragraph more than once.Each
        paragraph is marked with a letter.Answer the questions by marking the
        corresponding letter on Answer Sheet 2.
      </p>
      <div className="text-center mb-4">
        <b>{data.passageTitle}</b>
      </div>
      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className="mb-4 text-base text-justify"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/\b([A-Z]\))/g, "<strong>$1</strong>"),
          }}
        ></p>
      ))}

      {data.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="font-bold">
            {question.Number}. {question.Statement}
          </p>
          <div className="flex flex-wrap space-x-2">
            {question.Options.map((option, oIndex) => {
              // 检查该选项是否被选中
              const isSelected = selectedAnswers[question.Number] === option;
              // 选中的选项使用蓝色背景，否则使用透明背景
              const buttonClasses = isSelected
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-white text-black border border-gray-300 hover:bg-blue-100";
              return (
                <button
                  key={oIndex}
                  className={`px-4 py-2 mt-2 rounded-lg border ${buttonClasses}`}
                  onClick={() => handleOptionSelect(question.Number, option)}
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

export default ReadingComprehensionB;
