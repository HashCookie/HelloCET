import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

const SectionB = ({
  year,
  month,
  paperNumber,
  questions,
  selectedAnswer,
  onAnswerChange,
}) => {
  const audioPathBase = `${process.env.PUBLIC_URL}/listeninglibrary/${year}年${month}月英语四级真题_第${paperNumber}套/`;

  // 题目范围到音频文件名的映射
  const audioFiles = {
    "7-10": "0811.mp3", // 假设第一段长对话对应第8题到第11题
    "11-14": "1215.mp3", // 假设第二段长对话对应第12题到第15题
  };

  return (
    <section>
      <h3 className="font-bold">Section B</h3>
      <p>
        <b>Directions:</b>In this section, you will hear two long conversations.
        At the end of each conversation, you will hear four questions. Both the
        conversation and the questions will be spoken only once. After you hear
        a question, you must choose the best answer from the four choices marked
        A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1
        with a single line through the centre.
      </p>

      {Object.entries(audioFiles).map(([range, audioFile], index) => {
        const [start, end] = range.split("-").map((num) => parseInt(num, 10));
        const questionSubset = questions.slice(start, end + 1);

        return (
          <React.Fragment key={index}>
            <AudioPlayer src={audioPathBase + audioFile} />
            <b>
              Questions {start + 1} to {end + 1} are based on the conversation
              you have just heard.
            </b>
            <QuestionList
              questions={questionSubset}
              selectedAnswer={selectedAnswer}
              onAnswerChange={onAnswerChange}
            />
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default SectionB;
