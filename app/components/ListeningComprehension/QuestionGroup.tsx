import { ListeningQuestion } from "@/app/types/exam";

interface QuestionGroupProps {
  description: string;
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
  questions,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: QuestionGroupProps) => {
  const getAnswerStatus = (questionNumber: number, optionKey: string) => {
    if (!readOnly || !referenceAnswers) return null;

    const referenceAnswer = referenceAnswers.find(
      (a) => a.number === questionNumber
    );
    const userAnswer = answers[questionNumber];

    if (optionKey === referenceAnswer?.answer && userAnswer === optionKey) {
      return "correct";
    } else if (userAnswer && userAnswer === optionKey) {
      return "wrong";
    } else if (!userAnswer && optionKey === referenceAnswer?.answer) {
      return "wrong";
    }
    return null;
  };

  return (
    <div className="mb-8">
      <p className="text-sm text-gray-600 not-italic mb-4 text-left">
        {description}
      </p>
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.number} className="border-b pb-6">
            <h3 className="font-semibold mb-4 text-left">{question.number}.</h3>
            <div className="flex flex-col space-y-3">
              {Object.entries(question.options).map(([key, value]) => {
                const status = getAnswerStatus(question.number, key);
                return (
                  <div
                    key={key}
                    className="flex items-start space-x-4 text-left"
                  >
                    <div className="flex items-center h-6 min-w-[24px]">
                      <input
                        type="radio"
                        name={`question-${question.number}`}
                        value={key}
                        checked={answers[question.number] === key}
                        onChange={() => onAnswerChange(question.number, key)}
                        disabled={readOnly}
                        className={`h-4 w-4 border-gray-300 ${
                          readOnly ? "cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <label
                      className={`flex-1 text-sm font-medium ${
                        status === "correct"
                          ? "text-green-600"
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
                    </label>
                  </div>
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
