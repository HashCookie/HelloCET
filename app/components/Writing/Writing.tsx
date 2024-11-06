"use client";

import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import { useState, useEffect } from "react";

type WritingData = Pick<ExamPaper, "writing">;

interface WritingProps
  extends Omit<ExamComponentProps, "year" | "month" | "set"> {
  data: WritingData | null;
  isLoading: boolean;
  answer: string;
  onAnswerChange: (value: string) => void;
  readOnly?: boolean;
  year: string;
  month: string;
  set: string;
}

const Writing = ({
  data,
  isLoading,
  answer,
  onAnswerChange,
  readOnly,
  year,
  month,
  set,
}: WritingProps) => {
  const [referenceAnswer, setReferenceAnswer] = useState<string>("");

  useEffect(() => {
    const fetchReferenceAnswer = async () => {
      if (readOnly && year && month && set) {
        try {
          const response = await fetch(
            `/api/answers?type=CET4&year=${year}&month=${month}&set=${set}&field=writingAnswer`
          );
          const data = await response.json();
          if (data.writingAnswer?.referenceEssay) {
            setReferenceAnswer(data.writingAnswer.referenceEssay);
          }
        } catch (error) {
          console.error("获取写作参考答案失败:", error);
        }
      }
    };

    fetchReferenceAnswer();
  }, [readOnly, year, month, set]);

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
          {readOnly && referenceAnswer && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">参考范文</h3>
              <div className="p-4 bg-gray-50 rounded-md">
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
