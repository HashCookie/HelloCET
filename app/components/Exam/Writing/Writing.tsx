"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import type { Writing } from "@/app/types/exam";

interface WritingProps {
  data: Writing | null;
  isLoading: boolean;
  answer: string;
  onAnswerChange: (value: string) => void;
  readOnly?: boolean;
  referenceAnswer: string;
}

const Writing = ({
  data,
  isLoading,
  answer,
  onAnswerChange,
  readOnly,
  referenceAnswer,
}: WritingProps) => (
  <ExamSection isLoading={isLoading} title="Part I Writing">
    {data && (
      <>
        <div className="prose mb-6 max-w-none text-left">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {data.Directions}
          </p>
        </div>
        <div className="mt-8">
          <textarea
            className="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="writing"
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="在此输入你的作文..."
            readOnly={readOnly}
            rows={10}
            value={answer}
          />
        </div>
        {readOnly && referenceAnswer && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-lg">参考范文</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="whitespace-pre-wrap">{referenceAnswer}</p>
            </div>
          </div>
        )}
      </>
    )}
  </ExamSection>
);

export default Writing;
