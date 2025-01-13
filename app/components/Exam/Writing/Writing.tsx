"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";

type WritingData = Pick<ExamPaper, "writing">;

interface WritingProps {
  data: WritingData | null;
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
}: WritingProps) => {
  return (
    <ExamSection title="Part I Writing" isLoading={isLoading}>
      {data && (
        <>
          <div className="prose mb-6 max-w-none text-left">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
              {data.writing.Directions}
            </p>
          </div>
          <div className="mt-8">
            <textarea
              id="writing"
              rows={10}
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="在此输入你的作文..."
              readOnly={readOnly}
            />
          </div>
          {readOnly && referenceAnswer && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">参考范文</h3>
              <div className="rounded-md bg-gray-50 p-4">
                <p className="whitespace-pre-wrap">{referenceAnswer}</p>
              </div>
            </div>
          )}
        </>
      )}
    </ExamSection>
  );
};

export default Writing;
