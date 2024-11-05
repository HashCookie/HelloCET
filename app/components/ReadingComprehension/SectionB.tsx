import type { SectionB } from "@/app/types/exam";

interface SectionBProps extends SectionB {
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
  readOnly?: boolean;
}

const SectionB = ({
  passageTitle,
  passages,
  questions,
  answers,
  onAnswerChange,
  readOnly,
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
            <input
              type="text"
              name={`question-${question.number}`}
              value={answers[question.number] || ""}
              onChange={(e) =>
                onAnswerChange(question.number, e.target.value.toUpperCase())
              }
              className={`w-12 text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent uppercase ${
                readOnly ? 'cursor-not-allowed' : ''
              }`}
              maxLength={1}
              readOnly={readOnly}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionB;
