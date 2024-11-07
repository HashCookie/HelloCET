import type { Option, SectionC as SectionCType } from "@/app/types/exam";

interface SectionCProps extends SectionCType {
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
  referenceAnswers?: {
    passageOne: Array<{
      number: number;
      answer: string;
      explanation?: string;
    }>;
    passageTwo: Array<{
      number: number;
      answer: string;
      explanation?: string;
    }>;
  };
}

const getAnswerStatus = (
  questionNumber: number,
  optionKey: string,
  answers: Record<number, string>,
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
  const userAnswer = answers[questionNumber];

  if (optionKey === referenceAnswer?.answer) {
    return "correct";
  } else if (userAnswer && userAnswer === optionKey) {
    return "wrong";
  }
  return null;
};

const renderOption = (
  question: { number: number; options: Option },
  optionKey: keyof Option,
  answers: Record<number, string>,
  onAnswerChange: (questionNumber: number, answer: string) => void,
  readOnly?: boolean,
  referenceAnswers?: Array<{
    number: number;
    answer: string;
    explanation?: string;
  }>
) => {
  const status = getAnswerStatus(
    question.number,
    optionKey,
    answers,
    referenceAnswers
  );
  const isSelected = answers[question.number] === optionKey;

  return (
    <div key={optionKey} className="flex items-start space-x-2">
      <input
        type="radio"
        name={`question-${question.number}`}
        id={`question-${question.number}-${optionKey}`}
        value={optionKey}
        checked={isSelected}
        onChange={() => onAnswerChange(question.number, optionKey)}
        className={`mt-1 ${readOnly ? "cursor-not-allowed" : ""}`}
        disabled={readOnly}
      />
      <label
        htmlFor={`question-${question.number}-${optionKey}`}
        className={`${readOnly ? "cursor-not-allowed" : ""} ${
          status === "correct"
            ? "text-gray-700"
            : status === "wrong"
              ? "text-red-600"
              : "text-gray-700"
        }`}
      >
        {optionKey}. {question.options[optionKey]}
        {status === "correct" && <span className="ml-2 text-green-600">✓</span>}
        {status === "wrong" && <span className="ml-2 text-red-600">✗</span>}
        {!status &&
          readOnly &&
          referenceAnswers?.find((a) => a.number === question.number)
            ?.answer === optionKey && (
            <span className="ml-2 text-green-600">✓</span>
          )}
      </label>
    </div>
  );
};

const SectionC = ({
  passagesOne,
  questionsOne,
  passagesTwo,
  questionsTwo,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: SectionCProps) => {
  const renderQuestions = (
    questions: SectionCType["questionsOne"],
    referenceAnswersSection?: Array<{
      number: number;
      answer: string;
      explanation?: string;
    }>
  ) => (
    <div className="space-y-6 text-left">
      {questions.map((question) => (
        <div key={question.number} className="border-b pb-4">
          <p className="font-medium mb-3">
            {question.number}. {question.statement}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(question.options) as Array<keyof Option>).map((key) =>
              renderOption(
                question,
                key,
                answers,
                onAnswerChange,
                readOnly,
                referenceAnswersSection
              )
            )}
          </div>
          {readOnly &&
            referenceAnswersSection?.find((a) => a.number === question.number)
              ?.explanation && (
              <p className="text-gray-600 mt-2 text-sm">
                解析:{" "}
                {
                  referenceAnswersSection.find(
                    (a) => a.number === question.number
                  )?.explanation
                }
              </p>
            )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section C</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        There are 2 passages in this section. Each passage is followed by some
        questions or unfinished statements. For each of them, there are four
        choices marked A), B), C), and D). You should decide on the best choice
        and mark the corresponding letter on Answer Sheet 2 with a single line
        through the center.
      </h3>

      {/* Passage One */}
      <h3 className="text-md font-medium mb-4 text-center">Passage One</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        Questions 46 to 50 are based on the following passage.
      </h3>
      <div className="mb-8">
        <div className="space-y-4 mb-6 text-left">
          {passagesOne.map((passage, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {passage}
            </p>
          ))}
        </div>
        {renderQuestions(questionsOne, referenceAnswers?.passageOne)}
      </div>

      {/* Passage Two */}
      <h3 className="text-md font-medium mb-4 text-center">Passage Two</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        Questions 51 to 55 are based on the following passage.
      </h3>
      <div className="mb-8">
        <div className="space-y-4 mb-6 text-left">
          {passagesTwo.map((passage, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {passage}
            </p>
          ))}
        </div>
        {renderQuestions(questionsTwo, referenceAnswers?.passageTwo)}
      </div>
    </div>
  );
};

export default SectionC;
