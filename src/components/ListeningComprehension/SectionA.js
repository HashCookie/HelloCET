import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

const SectionA = ({
  year,
  month,
  paperNumber,
  questions,
  selectedAnswer,
  onAnswerChange,
  playingAudio,
  onAudioPlay, 
}) => {
  const audioPathBase = `${process.env.PUBLIC_URL}/listeninglibrary/${year}年${month}月英语四级真题_第${paperNumber}套/`;

  // 题目范围到音频文件名的映射
  const questionRanges = {
    "0-1": "0102.mp3",
    "2-3": "0304.mp3",
    "4-6": "0507.mp3",
    // 根据需要添加更多映射
  };

  return (
    <section>
      <h3 className="font-bold">Section A</h3>
      <p className="font-normal">
        <b>Directions:</b> In this section, you will hear three news reports. At
        the end of each news report, you will hear two or three questions. Both
        the news report and the questions will be spoken only once. After you
        hear a question, you must choose the best answer from the four choices
        marked A), B), C) and D). Then mark the corresponding letter on Answer
        Sheet 1 with a single line through the centre.
      </p>

      {Object.entries(questionRanges).map(([range, audioFile]) => {
        const [start, end] = range.split("-").map(Number);
        const questionSubset = questions.slice(start, end + 1);

        return (
          <React.Fragment key={range}>
            <AudioPlayer
              src={audioPathBase + audioFile}
              playingAudio={playingAudio}
              onAudioPlay={onAudioPlay} // 确保这里传递了正确的 prop
              audioId={`section-a-${audioFile}`} // audioId 应该是唯一的标识符
            />
            <b>
              Questions {start + 1} and {end + 1} are based on the news report
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

export default SectionA;
