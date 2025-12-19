"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import type { Translation } from "@/app/types/exam";

interface TranslationProps {
  data: Translation | null;
  isLoading: boolean;
  answer: string;
  onAnswerChange: (value: string) => void;
  readOnly?: boolean;
  referenceAnswer: string;
}

const Translation = ({
  data,
  isLoading,
  answer,
  onAnswerChange,
  readOnly,
  referenceAnswer,
}: TranslationProps) => (
  <ExamSection isLoading={isLoading} title="Part IV Translation">
    {data && (
      <>
        <div className="mb-6">
          <div className="prose max-w-none text-left">
            <h3 className="mb-6 text-left text-gray-500 text-sm">
              For this part, you are allowed 30 minutes to translate a passage
              from Chinese into English. You should write your answer on Answer
              Sheet 2.
            </h3>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data.ChinesePassage}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <textarea
            className="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="translation"
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="在此输入你的翻译..."
            readOnly={readOnly}
            rows={10}
            value={answer}
          />
        </div>

        {readOnly && referenceAnswer && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-lg">参考译文</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {referenceAnswer}
              </p>
            </div>
          </div>
        )}
      </>
    )}
  </ExamSection>
);

export default Translation;
