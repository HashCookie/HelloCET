"use client";

import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";

type WritingData = Pick<ExamPaper, "writing">;

interface WritingProps extends ExamComponentProps {
  data: WritingData | null;
  isLoading: boolean;
  answer: string;
  onAnswerChange: (value: string) => void;
  readOnly?: boolean;
}

const Writing = ({
  data,
  isLoading,
  answer,
  onAnswerChange,
  readOnly,
}: WritingProps) => {
  return (
    <ExamSection title="Part I Writing" isLoading={isLoading}>
      {data && (
        <>
          <div className="prose max-w-none mb-6 text-left">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {data.writing.Directions}
            </p>
          </div>
          <div className="mt-8">
            <textarea
              id="writing"
              rows={10}
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="在此输入你的作文..."
              readOnly={readOnly}
            />
          </div>
        </>
      )}
    </ExamSection>
  );
};

export default Writing;
