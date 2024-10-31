import { ListeningQuestion } from "@/app/types/exam";

interface QuestionGroupProps {
  description: string;
  questions: ListeningQuestion[];
}

const QuestionGroup = ({ description, questions }: QuestionGroupProps) => {
  return (
    <div className="mb-8">
      <p className="text-sm text-gray-600 italic mb-4 text-left">{description}</p>
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.number} className="border-b pb-6">
            <h3 className="font-semibold mb-4 text-left">{question.number}.</h3>
            <div className="flex flex-col space-y-3">
              {Object.entries(question.options).map(([key, value]) => (
                <div key={key} className="flex items-start space-x-4 text-left">
                  <div className="flex items-center h-6 min-w-[24px]">
                    <input
                      type="radio"
                      name={`question-${question.number}`}
                      id={`question-${question.number}-${key}`}
                      value={key}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <label
                    htmlFor={`question-${question.number}-${key}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {key}. {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
