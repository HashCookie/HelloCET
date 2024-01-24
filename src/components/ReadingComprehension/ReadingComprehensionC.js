import React, { useState } from "react";

const ReadingComprehensionC = ({ data }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = (questionNumber, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionNumber]: selectedOption,
    }));
  };

  const renderQuestions = (questions) =>
    questions.map((question, index) => (
      <div key={index} className="mb-6">
        <p className="font-bold text-lg mb-4">
          Question {question.Number}: {question.Statement}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {question.Options.map((option, oIndex) => {
            const isSelected = selectedAnswers[question.Number] === option.key;
            const buttonStyle = isSelected
              ? "bg-blue-500 text-white" // 选中时的样式
              : "bg-white text-black hover:bg-blue-100"; // 未选中时的样式
            return (
              <button
                key={oIndex}
                className={`px-4 py-2 mt-2 text-left whitespace-normal rounded-lg border border-gray-300 ${buttonStyle}`}
                onClick={() => handleAnswerChange(question.Number, option.key)}
              >
                {option.key}) {option.text}
              </button>
            );
          })}
        </div>
      </div>
    ));

  return (
    <div className="container mx-auto px-1">
      <h2 className="text-xl font-bold text-center mb-6">{data.title}</h2>
      <p>
        <b>Directions:</b>There are 2 passages in this section.Each passage is
        followed by some questions or unfinished statements.For each of them
        there are four choices marked A), B), C) and D). You should decide on
        the best choice and mark the corresponding letter on Answer Sheet 2 with
        a single line through the centre.
      </p>

      <div className="mb-6">
        <h3 className="font-bold text-center">Passage One</h3>
        <h4 className="font-bold">
          Questions 46 to 50 are based on the following passage.
        </h4>
        {data.passagesOne.map((passage, index) => (
          <p key={index} className="mb-4 text-base text-justify">
            {passage}
          </p>
        ))}
        {renderQuestions(data.questionsOne)}
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-center">Passage Two</h3>
        <h4 className="font-bold">
          Questions 51 to 55 are based on the following passage.
        </h4>
        {data.passagesTwo.map((passage, index) => (
          <p key={index} className="mb-4 text-base text-justify">
            {passage}
          </p>
        ))}
        {renderQuestions(data.questionsTwo)}
      </div>
    </div>
  );
};

export default ReadingComprehensionC;
