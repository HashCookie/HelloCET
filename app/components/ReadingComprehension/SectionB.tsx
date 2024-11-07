import type { SectionB } from "@/app/types/exam";

interface SectionBProps extends SectionB {
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
  referenceAnswers?: Array<{
    number: number;
    answer: string;
    explanation?: string;
  }>;
}

const getAnswerStatus = (
  questionNumber: number,
  currentAnswer: string,
  referenceAnswers?: Array<{
    number: number;
    answer: string;
    explanation?: string;
  }>
) => {
  if (!referenceAnswers) return null;

  const referenceAnswer = referenceAnswers.find(
    (a) => a.number === questionNumber
  );
  if (!referenceAnswer) return null;

  return currentAnswer.toUpperCase() === referenceAnswer.answer
    ? "correct"
    : "wrong";
};

const renderInput = (
  number: number,
  value: string,
  onChange: (number: number, answer: string) => void,
  readOnly?: boolean,
  referenceAnswers?: Array<{
    number: number;
    answer: string;
    explanation?: string;
  }>
) => {
  const status = getAnswerStatus(number, value, referenceAnswers);
  const referenceAnswer = referenceAnswers?.find((a) => a.number === number);

  const displayValue =
    readOnly && referenceAnswer
      ? value
        ? status === "wrong"
          ? `${value}|${referenceAnswer.answer}`
          : `${value}✓`
        : referenceAnswer.answer
      : value;

  return (
    <>
      <input
        type="text"
        value={displayValue}
        onChange={(e) => onChange(number, e.target.value.toUpperCase())}
        className={`w-12 text-center border-b-2 ${
          readOnly
            ? status === "correct"
              ? "border-green-500 text-green-600"
              : status === "wrong"
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            : "border-gray-300"
        } focus:border-blue-500 focus:outline-none bg-transparent uppercase ${
          readOnly ? "cursor-not-allowed" : ""
        }`}
        maxLength={
          readOnly && status === "wrong" ? 3 : status === "correct" ? 2 : 1
        }
        readOnly={readOnly}
      />
      {readOnly && referenceAnswer?.explanation && (
        <p className="text-gray-600 mt-1 text-sm">
          解析: {referenceAnswer.explanation}
        </p>
      )}
    </>
  );
};

const SectionB = ({
  passageTitle,
  passages,
  questions,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: SectionBProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section B</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        In this section, you are going to read a passage with ten statements
        attached to it. Each statement contains information given in one of the
        paragraphs. Identify the paragraph from which the information is
        derived. You may choose a paragraph more than once. Each paragraph is
        marked with a letter. Answer the questions by marking the corresponding
        letter on Answer Sheet 2.
      </h3>
      <h4 className="text-md font-medium mb-4 text-center">{passageTitle}</h4>
      <div className="space-y-4 mb-6 text-left">
        {passages.map((passage, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {passage}
          </p>
        ))}
      </div>
      <div className="space-y-6 text-left">
        {questions.map((question) => (
          <div key={question.number} className="border-b pb-4">
            <p className="font-medium mb-3">
              {question.number}. {question.statement}
            </p>
            {renderInput(
              question.number,
              answers[question.number] || "",
              onAnswerChange,
              readOnly,
              referenceAnswers
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionB;
