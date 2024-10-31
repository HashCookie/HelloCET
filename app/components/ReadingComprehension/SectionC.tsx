import type { Option, SectionC as SectionCType } from "@/app/types/exam";

const SectionC = ({
  passagesOne,
  questionsOne,
  passagesTwo,
  questionsTwo,
}: SectionCType) => {
  const renderQuestions = (questions: SectionCType["questionsOne"]) => (
    <div className="space-y-6 text-left">
      {questions.map((question) => (
        <div key={question.number} className="border-b pb-4">
          <p className="font-medium mb-3">
            {question.number}. {question.statement}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(question.options) as Array<keyof Option>).map(
              (key) => (
                <div key={key} className="flex items-start space-x-2">
                  <input
                    type="radio"
                    name={`question-${question.number}`}
                    id={`question-${question.number}-${key}`}
                    value={key}
                    className="mt-1"
                  />
                  <label htmlFor={`question-${question.number}-${key}`}>
                    {key}. {question.options[key]}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section C</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        <span className="font-semibold">Directions:</span> There are 2 passages
        in this section...
      </h3>

      {/* Passage One */}
      <h3 className="text-md font-medium mb-4 text-left">Passage One</h3>
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
        {renderQuestions(questionsOne)}
      </div>

      {/* Passage Two */}
      <h3 className="text-md font-medium mb-4 text-left">Passage Two</h3>
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
        {renderQuestions(questionsTwo)}
      </div>
    </div>
  );
};

export default SectionC;
