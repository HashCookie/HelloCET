"use client";

import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import SubmitButton from "../Common/SubmitButton";

type TranslationData = Pick<ExamPaper, "translation">;

interface TranslationProps extends ExamComponentProps {
  data: TranslationData | null;
  isLoading: boolean;
  year: string;
  month: string;
  set: string;
}

const Translation = ({
  data,
  isLoading,
  year,
  month,
  set,
}: TranslationProps) => {
  return (
    <ExamSection title="Part IV Translation" isLoading={isLoading}>
      {data && (
        <>
          <div className="mb-6">
            <div className="prose max-w-none text-left">
              <h3 className="text-sm text-gray-500 mb-6 text-left">
                <span className="font-semibold">Directions:</span> For this
                part, you are allowed 30 minutes to translate a passage from
                Chinese into English. You should write your answer on Answer
                Sheet 2.
              </h3>
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
          <SubmitButton
            section="translation"
            year={year}
            month={month}
            set={set}
            translationData={data.translation}
          />
        </>
      )}
    </ExamSection>
  );
};

export default Translation;
