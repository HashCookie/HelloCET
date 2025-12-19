import AudioPlayer from "@/app/components/Exam/ListeningComprehension/AudioPlayer";
import type { ListeningQuestion } from "@/app/types/exam";

interface QuestionGroupProps {
  description: string;
  audioUrl: string;
  questions: ListeningQuestion[];
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
  referenceAnswers?: {
    number: number;
    answer: string;
  }[];
}

const QuestionGroup = ({
  description,
  audioUrl,
  questions,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: QuestionGroupProps) => {
  const getAnswerStatus = (questionNumber: number, optionKey: string) => {
    if (!(readOnly && referenceAnswers)) return null;

    const referenceAnswer = referenceAnswers.find(
      (a) => a.number === questionNumber
    );
    const userAnswer = answers[questionNumber];

    if (optionKey === referenceAnswer?.answer) {
      return "correct";
    }
    if (userAnswer && userAnswer === optionKey) {
      return "wrong";
    }
    return null;
  };

  return (
    <div className="mb-8">
      <AudioPlayer audioUrl={audioUrl} title={description} />
      <div className="mt-6 space-y-8">
        {questions.map((question) => (
          <div className="border-b pb-6" key={question.number}>
            <h3 className="mb-4 text-left font-semibold">{question.number}.</h3>
            <div className="flex flex-col space-y-3">
              {Object.entries(question.options).map(([key, value]) => {
                const status = getAnswerStatus(question.number, key);
                const isSelected = answers[question.number] === key;

                return (
                  <label
                    className={`flex cursor-pointer items-start space-x-4 text-left ${
                      readOnly ? "cursor-not-allowed" : ""
                    }`}
                    key={key}
                    onClick={(e) => {
                      if (!readOnly) {
                        e.preventDefault();
                        onAnswerChange(question.number, key);
                      }
                    }}
                  >
                    <div className="flex h-6 min-w-[24px] items-center">
                      <input
                        checked={isSelected}
                        className={readOnly ? "cursor-not-allowed" : ""}
                        disabled={readOnly}
                        name={`question-${question.number}`}
                        onChange={() => onAnswerChange(question.number, key)}
                        type="radio"
                        value={key}
                      />
                    </div>
                    <div
                      className={`flex-1 font-medium text-sm ${
                        status === "correct"
                          ? "text-gray-700"
                          : status === "wrong"
                            ? "text-red-600"
                            : "text-gray-700"
                      }`}
                    >
                      {key}. {value}
                      {status === "correct" && (
                        <span className="ml-2 text-green-600">✓</span>
                      )}
                      {status === "wrong" && (
                        <span className="ml-2 text-red-600">✗</span>
                      )}
                      {!status &&
                        readOnly &&
                        referenceAnswers?.find(
                          (a) => a.number === question.number
                        )?.answer === key && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
