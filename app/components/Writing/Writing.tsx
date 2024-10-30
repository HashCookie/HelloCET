"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";

type WritingData = Pick<ExamPaper, "writing">;

const Writing = ({
  year,
  month,
  set,
}: {
  year: string;
  month: string;
  set: string;
}) => {
  const { data, isLoading } = useExamData<WritingData>(
    "writing",
    year,
    month,
    set
  );

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
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="在此输入你的作文..."
            />
          </div>
        </>
      )}
    </ExamSection>
  );
};

export default Writing;
