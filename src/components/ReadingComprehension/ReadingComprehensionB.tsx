import React from "react";

interface Question {
  Number: number;
  Statement: string;
  Options: string[]; // 直接使用字符串数组
}

interface Data {
  title: string;
  passageTitle: string;
  passages: string[];
  questions: Question[];
}

interface ReadingComprehensionBProps {
  data: Data;
  selectedAnswer: { [key: number]: string };
  onAnswerChange: (questionNumber: number, option: string) => void;
}

const ReadingComprehensionB: React.FC<ReadingComprehensionBProps> = ({
  data,
  selectedAnswer,
  onAnswerChange,
}) => {
  const handleOptionSelect = (questionNumber: number, option: string) => {
    if (onAnswerChange) {
      onAnswerChange(questionNumber, option);
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
      <h2 className="text-xl font-bold text-left mb-6">{data.title}</h2>
      <p className="text-base italic font-serif">
        <b>Directions:</b> In this section, you are going to read a passage with
        ten statements attached to it. Each statement contains information given
        in one of the paragraphs. Identify the paragraph from which the
        information is derived. You may choose a paragraph more than once. Each
        paragraph is marked with a letter. Answer the questions by marking the
        corresponding letter on <b>Answer Sheet 2</b>.
      </p>

      <div className="text-center mb-2 mt-4">
        <b>{data.passageTitle}</b>
      </div>
      {data.passages.map((paragraph, index) => (
        <p
          key={index}
          className="text-justify indent-8 mb-1"
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
          <div className="flex flex-wrap -mx-1">
            {question.Options.map((option, oIndex) => {
              const isSelected = selectedAnswer[question.Number] === option;
              const buttonClasses = isSelected
                ? "bg-blue-500 hover:bg-blue-700 text-white" // Selected style
                : "bg-white text-black border border-gray-300 hover:bg-blue-100"; // Unselected style
              return (
                <button
                  key={oIndex}
                  className={`px-4 py-2 m-2 rounded-lg border flex-auto md:flex-none ${buttonClasses} focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
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
