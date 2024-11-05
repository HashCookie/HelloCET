import type { SectionA } from "@/app/types/exam";

interface SectionAProps extends SectionA {
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
}

const SectionA = ({
  passages,
  options,
  answers,
  onAnswerChange,
  readOnly,
}: SectionAProps) => {
  const renderPassageWithBlanks = (text: string) => {
    const parts = text.split(/(\s(?:2[6-9]|3[0-5])\s)/g);

    return parts.map((part, index) => {
      const numberMatch = part.trim().match(/^(?:2[6-9]|3[0-5])$/);

      if (numberMatch) {
        const number = parseInt(numberMatch[0]);
        return (
          <span key={index} className="inline-block mx-1">
            <span className="text-gray-500">{number}.</span>
            <input
              type="text"
              name={`question-${number}`}
              value={answers[number] || ""}
              onChange={(e) =>
                onAnswerChange(number, e.target.value.toUpperCase())
              }
              className={`w-12 text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent uppercase ${
                readOnly ? 'cursor-not-allowed' : ''
              }`}
              maxLength={1}
              readOnly={readOnly}
            />
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section A</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        In this section, there is a passage with ten blanks. You are required to
        select one word for each blank from a list of choices given in a word
        bank following the passage. Read the passage through carefully before
        making your choices. Each choice in the bank is identified by a letter.
        Please mark the corresponding letter for each item on Answer Sheet 2
        with a single line through the centre. You may not use any of the words
        in the bank more than once.
      </h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        Questions 26 to 35 are based on the following passage.
      </h3>
      <div className="space-y-4 mb-6 text-left">
        {passages.map((passage, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {renderPassageWithBlanks(passage)}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="flex items-start space-x-2">
            <span className="font-semibold">{key}.</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionA;
