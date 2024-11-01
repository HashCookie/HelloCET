interface Question {
  number: number;
  statement: string;
}

interface SectionBProps {
  passageTitle: string;
  passages: string[];
  questions: Question[];
}

const SectionB = ({ passageTitle, passages, questions }: SectionBProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section B</h3>
      <h4 className="text-md font-medium mb-4">{passageTitle}</h4>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionB;