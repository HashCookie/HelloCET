import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

const SectionB = ({ questions, selectedAnswer, onAnswerChange }) => {
  return (
    <section>
      <h3 className="font-bold">Section B</h3>
      <p>
        <b>Directions:</b>In this section, you will hear two long conversations. At
        the end of each conversation, you will hear four questions. Both the
        conversation and the questions will be spoken only once. After you hear
        a question, you must choose the best answer from the four choices marked
        A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1
        with a single line through the centre.
      </p>

      <AudioPlayer src="path-to-your-audio-file" />
      <b>
        Questions 8 and 11 are based on the news report you have just heard.
      </b>
      <QuestionList
        questions={questions.slice(7, 11)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
      <AudioPlayer src="path-to-your-audio-file" />
      <b>
        Questions 12 and 15 are based on the news report you have just heard.
      </b>
      <QuestionList
        questions={questions.slice(11, 15)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
    </section>
  );
};

export default SectionB;
