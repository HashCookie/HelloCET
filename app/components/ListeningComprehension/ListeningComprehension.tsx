"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";

interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface Question {
  number: number;
  options: Option;
}

interface ListeningData {
  listeningComprehension: Question[];
}

const ListeningComprehension = ({
  year,
  month,
  set,
}: {
  year: string;
  month: string;
  set: string;
}) => {
  const { data, isLoading } = useExamData<ListeningData>(
    "listeningComprehension",
    year,
    month,
    set
  );

  return (
    <ExamSection title="Part II Listening Comprehension" isLoading={isLoading}>
      {data && (
        <div className="space-y-8">
          {data.listeningComprehension.map((question) => (
            <div key={question.number} className="border-b pb-6">
              <h3 className="font-semibold mb-4">Question {question.number}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-start space-x-2">
                    <div className="flex items-center h-6">
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
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
