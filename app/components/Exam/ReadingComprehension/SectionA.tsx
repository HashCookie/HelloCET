import type { SectionA } from "@/app/types/exam";

interface SectionAProps extends SectionA {
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
  referenceAnswers?: Array<{ number: number; answer: string }>;
}

const getAnswerStatus = (
  questionNumber: number,
  currentAnswer: string,
  referenceAnswers?: Array<{ number: number; answer: string }>
) => {
  if (!referenceAnswers) return null;

  const referenceAnswer = referenceAnswers.find(
    (a) => a.number === questionNumber
  );
  if (!referenceAnswer) return null;

  if (currentAnswer === referenceAnswer.answer) {
    return "correct";
  }
  return "wrong";
};

const renderInput = (
  number: number,
  value: string,
  onChange: (number: number, answer: string) => void,
  readOnly?: boolean,
  referenceAnswers?: Array<{ number: number; answer: string }>
) => {
  const status = getAnswerStatus(number, value, referenceAnswers);
  const referenceAnswer = referenceAnswers?.find(
    (a) => a.number === number
  )?.answer;

  const displayValue =
    readOnly && referenceAnswer
      ? value
        ? status === "wrong"
          ? `${value}|${referenceAnswer}`
          : `${value}✓`
        : referenceAnswer
      : value;

  return (
    <span className="mx-1 inline-block">
      <span className="text-gray-500">{number}.</span>
      <input
        className={`w-16 border-b-2 text-center ${
          readOnly
            ? status === "correct"
              ? "border-green-500 text-green-600"
              : status === "wrong"
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            : "border-gray-300"
        } bg-transparent uppercase focus:outline-none ${
          readOnly ? "cursor-not-allowed" : ""
        }`}
        maxLength={
          readOnly && status === "wrong" ? 3 : status === "correct" ? 2 : 1
        }
        onChange={(e) => onChange(number, e.target.value.toUpperCase())}
        readOnly={readOnly}
        type="text"
        value={displayValue}
      />
    </span>
  );
};

const SectionA = ({
  passages,
  options,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: SectionAProps) => {
  const renderPassageWithBlanks = (text: string) => {
    const parts = text.split(/(\s(?:2[6-9]|3[0-5])\s)/g);

    return parts.map((part, index) => {
      const numberMatch = part.trim().match(/^(?:2[6-9]|3[0-5])$/);

      if (numberMatch) {
        const number = Number.parseInt(numberMatch[0]);
        return renderInput(
          number,
          answers[number] || "",
          onAnswerChange,
          readOnly,
          referenceAnswers
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mb-8">
      <h3 className="mb-4 font-semibold text-lg">Section A</h3>
      <h3 className="mb-4 text-left text-gray-600 text-sm">
        In this section, there is a passage with ten blanks. You are required to
        select one word for each blank from a list of choices given in a word
        bank following the passage. Read the passage through carefully before
        making your choices. Each choice in the bank is identified by a letter.
        Please mark the corresponding letter for each item on Answer Sheet 2
        with a single line through the centre. You may not use any of the words
        in the bank more than once.
      </h3>
      <h3 className="mb-4 text-left text-gray-600 text-sm">
        Questions 26 to 35 are based on the following passage.
      </h3>
      <div className="mb-6 space-y-4 text-left">
        {passages.map((passage, index) => (
          <p className="text-gray-700 leading-relaxed" key={index}>
            {renderPassageWithBlanks(passage)}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.entries(options).map(([key, value]) => (
          <div className="flex items-start space-x-2" key={key}>
            <span className="font-semibold">{key}.</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionA;
