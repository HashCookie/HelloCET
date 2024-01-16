import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

const SectionA = ({ questions, selectedAnswer, onAnswerChange }) => {
  return (
    <section>
      <h3>Section A</h3>
      <p>
        <b>Directions:</b>In this section, you will hear three news reports. At the
        end of each news report, you will hear two or three questions. Both the
        news report and the questions will be spoken only once. After you hear a
        question, you must choose the best answer from the four choices marked
        A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1
        with a single line through the centre.
      </p>

      <AudioPlayer src="path-to-your-audio-file" />
      <b>Questions 1 and 2 are based on the news report you have just heard.</b>
      <QuestionList
        questions={questions.slice(0, 2)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />

      <AudioPlayer src="path-to-your-audio-file" />
      <b>Questions 3 and 4 are based on the news report you have just heard.</b>
      <QuestionList
        questions={questions.slice(2, 4)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />

      <AudioPlayer src="path-to-your-audio-file" />
      <b>Questions 5 and 7 are based on the news report you have just heard.</b>
      <QuestionList
        questions={questions.slice(4, 7)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
    </section>    
  );
};

export default SectionA;
