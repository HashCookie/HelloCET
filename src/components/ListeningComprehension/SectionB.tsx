import React from "react";
import QuestionList from "./QuestionList";
import AudioPlayer from "./AudioPlayer";

interface Question {
  number: number;
  options: { [key: string]: string };
}

interface SectionBProps {
  year: string;
  month: string;
  paperNumber: string;
  questions: Question[];
  selectedAnswer: { [key: number]: string };
  onAnswerChange: (questionNumber: number, option: string) => void;
  playingAudio: string | null;
  onAudioPlay: (audioId: string | null) => void;
}

const SectionB: React.FC<SectionBProps> = ({
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

  const audioFiles = {
    "7-10": "0811.mp3",
    "11-14": "1215.mp3",
  };

  return (
    <section>
      <h3 className="font-bold mt-5">Section B</h3>
      <p className="text-base mb-5 italic font-serif">
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
            <div className="flex items-center">
              <b>
                Questions {start + 1} to {end + 1} are based on the conversation
                you have just heard.
              </b>
              <AudioPlayer
                src={audioPathBase + audioFile}
                playingAudio={playingAudio}
                onAudioPlay={onAudioPlay}
                audioId={`section-a-${audioFile}`}
              />
            </div>
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
