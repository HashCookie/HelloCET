"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ListeningQuestion } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";

interface ListeningData {
  listeningComprehension: ListeningQuestion[];
}

const ListeningComprehension = ({ year, month, set }: ExamComponentProps) => {
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
          {/* Section A: Questions 1-7 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-6">Section A</h2>
            <h3 className="text-sm text-gray-500 mb-6 text-left">
              <span className="font-semibold">Directions:</span> In this
              section, you will hear three news reports. At the end of each news
              report, you will hear two or three questions. Both the news report
              and the questions will be spoken only once. After you hear a
              question, you must choose the best answer from the four choices
              marked A), B), C) and D). Then mark the corresponding letter on
              Answer Sheet 1 with a single line through the centre.
            </h3>

            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 1 and 2 are based on the news report you have just
                heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(0, 2).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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

            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 3 and 4 are based on the news report you have just
                heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(2, 4).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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

            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 5 and 7 are based on the news report you have just
                heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(4, 7).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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
          </div>

          {/* Section B: Questions 8-15 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-6">Section B</h2>
            <h3 className="text-sm text-gray-500 mb-6 text-left">
              <span className="font-semibold">Directions:</span> In this
              section, you will hear two long conversations. At the end of each
              conversation, you will hear four questions. Both the conversation
              and the questions will be spoken only once. After you hear a
              question, you must choose the best answer from the four choices
              marked A), B), C) and D). Then mark the corresponding letter on
              Answer Sheet 1 with a single line through the centre.
            </h3>

            {/* Conversation 1: Questions 8-11 */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 8 to 11 are based on the conversation you have just
                heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(7, 11).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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

            {/* Conversation 2: Questions 12-15 */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 12 to 15 are based on the conversation you have just
                heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(11, 15).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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
          </div>

          {/* Section C */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-6">Section C</h2>
            <h3 className="text-sm text-gray-500 mb-6 text-left">
              <span className="font-semibold">Directions:</span> In this
              section, you will hear three passages. At the end of each passage,
              you will hear three or four questions. Both the passage and the
              questions will be spoken only once. After you hear a question, you
              must choose the best answer from the four choices marked A), B),
              C) and D). Then mark the corresponding letter on Answer Sheet 1
              with a single line through the centre.
            </h3>

            {/* Passage 1: Questions 16-18 */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 16 to 18 are based on the passage you have just heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(15, 18).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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

            {/* Passage 2: Questions 19-21 */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 19 to 21 are based on the passage you have just heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(18, 21).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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

            {/* Passage 3: Questions 22-25 */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 italic mb-4 text-left">
                Questions 22 to 25 are based on the passage you have just heard.
              </p>
              <div className="space-y-8">
                {data.listeningComprehension.slice(21, 25).map((question) => (
                  <div key={question.number} className="border-b pb-6">
                    <h3 className="font-semibold mb-4 text-left">
                      {question.number}.
                    </h3>
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
                            className="text-sm font-medium text-gray-700 text-left"
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
          </div>
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
