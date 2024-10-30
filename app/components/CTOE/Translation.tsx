"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";

type TranslationData = Pick<ExamPaper, "translation">;

const Translation = ({
  year,
  month,
  set,
}: {
  year: string;
  month: string;
  set: string;
}) => {
  const { data, isLoading } = useExamData<TranslationData>(
    "translation",
    year,
    month,
    set
  );

  return (
    <ExamSection title="Part IV Translation" isLoading={isLoading}>
      {data && (
        <>
          <div className="mb-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.translation.ChinesePassage}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <textarea
              id="translation"
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="在此输入你的翻译..."
            />
          </div>
        </>
      )}
    </ExamSection>
  );
};

export default Translation;
