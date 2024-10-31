"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";

type ReadingData = Pick<ExamPaper, "readingComprehension">;

const ReadingComprehension = ({ year, month, set }: ExamComponentProps) => {
  const { data, isLoading } = useExamData<ReadingData>(
    "readingComprehension",
    year,
    month,
    set
  );

  return (
    <ExamSection title="Part III Reading Comprehension" isLoading={isLoading}>
      {data?.readingComprehension && (
        <>
          {/* Section A */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Section A</h3>
            <div className="space-y-4 mb-6 text-left">
              {data.readingComprehension.sectionA.passages.map(
                (passage, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {passage}
                  </p>
                )
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(data.readingComprehension.sectionA.options).map(
                ([key, value]) => (
                  <div key={key} className="flex items-start space-x-2">
                    <span className="font-semibold">{key}.</span>
                    <span>{value}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Section B */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Section B</h3>
            <h4 className="text-md font-medium mb-4">
              {data.readingComprehension.sectionB.passageTitle}
            </h4>
            <div className="space-y-4 mb-6 text-left">
              {data.readingComprehension.sectionB.passages.map(
                (passage, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {passage}
                  </p>
                )
              )}
            </div>
            <div className="space-y-6 text-left">
              {data.readingComprehension.sectionB.questions.map((question) => (
                <div key={question.number} className="border-b pb-4">
                  <p className="font-medium mb-3">
                    {question.number}. {question.statement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section C */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Section C</h3>
            <h3 className="text-sm text-gray-600 mb-4 text-left">
              <span className="font-semibold">Directions:</span> There are 2
              passages in this section. Each passage is followed by some
              questions or unfinished statements. For each of them, there are
              four choices marked A), B), C), and D). You should decide on the
              best choice and mark the corresponding letter on Answer Sheet 2
              with a single line through the center.
            </h3>
            <h3 className="text-md font-medium mb-4 text-left">Passage One</h3>
            <h3 className="text-sm text-gray-600 mb-4 text-left">
              Questions 46 to 50 are based on the following passage.
            </h3>

            {/* 第一篇文章 (46-50) */}
            <div className="mb-8">
              <div className="space-y-4 mb-6 text-left">
                {data.readingComprehension.sectionC.passagesOne.map(
                  (passage, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {passage}
                    </p>
                  )
                )}
              </div>
              <div className="space-y-6 text-left">
                {data.readingComprehension.sectionC.questionsOne.map(
                  (question) => (
                    <div key={question.number} className="border-b pb-4">
                      <p className="font-medium mb-3">
                        {question.number}. {question.statement}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(question.options).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-start space-x-2"
                            >
                              <input
                                type="radio"
                                name={`question-${question.number}`}
                                id={`question-${question.number}-${key}`}
                                value={key}
                                className="mt-1"
                              />
                              <label
                                htmlFor={`question-${question.number}-${key}`}
                              >
                                {key}. {value}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <h3 className="text-md font-medium mb-4 text-left">Passage Two</h3>
            <h3 className="text-sm text-gray-600 mb-4 text-left">
              Questions 51 to 55 are based on the following passage.
            </h3>
            {/* 第二篇文章 (51-55) */}
            <div className="mb-8">
              <div className="space-y-4 mb-6 text-left">
                {data.readingComprehension.sectionC.passagesTwo.map(
                  (passage, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {passage}
                    </p>
                  )
                )}
              </div>
              <div className="space-y-6 text-left">
                {data.readingComprehension.sectionC.questionsTwo.map(
                  (question) => (
                    <div key={question.number} className="border-b pb-4">
                      <p className="font-medium mb-3">
                        {question.number}. {question.statement}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(question.options).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-start space-x-2"
                            >
                              <input
                                type="radio"
                                name={`question-${question.number}`}
                                id={`question-${question.number}-${key}`}
                                value={key}
                                className="mt-1"
                              />
                              <label
                                htmlFor={`question-${question.number}-${key}`}
                              >
                                {key}. {value}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
