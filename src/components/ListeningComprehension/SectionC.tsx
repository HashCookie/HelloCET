import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

interface Question {
  number: number;
  options: { [key: string]: string };
}

interface SectionCProps {
  year: string;
  month: string;
  paperNumber: string;
  questions: Question[];
  selectedAnswer: { [key: number]: string };
  onAnswerChange: (questionNumber: number, option: string) => void;
  playingAudio: string | null;
  onAudioPlay: (audioId: string | null) => void;
}

const SectionC: React.FC<SectionCProps> = ({
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
  const audioFiles = {
    "15-17": "1618.mp3", // 第一段对应第16题到第18题
    "18-20": "1921.mp3", // 第二段对应第19题到第21题
    "21-24": "2225.mp3", // 第三段对应第22题到第25题
  };

  return (
    <section>
      <h3 className="font-bold mt-5">Section C</h3>
      <p className="text-base mb-5 italic font-serif">
        <b>Directions:</b>In this section, you will hear three passages. At the
        end of each passage, you will hear three or four questions. Both the
        passage and the questions will be spoken only once. After you hear a
        question, you must choose the best answer from the four choices marked
        A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1
        with a single line through the centre.
      </p>

      {Object.entries(audioFiles).map(([range, audioFile], index) => {
        const [start, end] = range.split("-").map((num) => parseInt(num, 10));
        const questionSubset = questions.slice(start, end + 1);

        return (
          <React.Fragment key={index}>
            <AudioPlayer
              src={audioPathBase + audioFile}
              playingAudio={playingAudio}
              onAudioPlay={onAudioPlay}
              audioId={`section-a-${audioFile}`} // audioId 是唯一的标识符
            />
            <b>
              Questions {start + 1} to {end + 1} are based on the passage you
              have just heard.
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

export default SectionC;
