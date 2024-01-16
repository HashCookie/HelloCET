import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

const SectionC = ({ questions, selectedAnswer, onAnswerChange }) => {
  return (
    <section>
      <h3>Section C</h3>
      <p>
        <b>Directions:</b>In this section, you will hear three passages. At the end of
        each passage, you will hear three or four questions. Both the passage
        and the questions will be spoken only once. After you hear a question,
        you must choose the best answer from the four choices marked A), B), C)
        and D). Then mark the corresponding letter on Answer Sheet 1 with a
        single line through the centre.
      </p>

      <AudioPlayer src="path-to-your-audio-file" />
      <b>
        Questions 16 and 18 are based on the news report you have just heard.
      </b>
      <QuestionList
        questions={questions.slice(15, 18)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
      <AudioPlayer src="path-to-your-audio-file" />
      <b>
        Questions 19 and 21 are based on the news report you have just heard.
      </b>
      <QuestionList
        questions={questions.slice(18, 21)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
      <AudioPlayer src="path-to-your-audio-file" />
      <b>
        Questions 22 and 25 are based on the news report you have just heard.
      </b>
      <QuestionList
        questions={questions.slice(21, 25)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={onAnswerChange}
      />
    </section>
  );
};

export default SectionC;
