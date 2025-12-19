"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import SectionA from "@/app/components/Exam/ReadingComprehension/SectionA";
import SectionB from "@/app/components/Exam/ReadingComprehension/SectionB";
import SectionC from "@/app/components/Exam/ReadingComprehension/SectionC";
import type { ReadingComprehension } from "@/app/types/exam";

interface ReadingProps {
  data: ReadingComprehension | null;
  isLoading: boolean;
  answers: Record<number, string>;
  onAnswerChange: (answers: Record<number, string>) => void;
  readOnly?: boolean;
  referenceAnswers?: {
    sectionA: Array<{ number: number; answer: string }>;
    sectionB: Array<{ number: number; answer: string; explanation?: string }>;
    sectionC: {
      passageOne: Array<{
        number: number;
        answer: string;
        explanation?: string;
      }>;
      passageTwo: Array<{
        number: number;
        answer: string;
        explanation?: string;
      }>;
    };
  };
}

const ReadingComprehension = ({
  data,
  isLoading,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: ReadingProps) => {
  const handleAnswerChange = (questionNumber: number, answer: string) => {
    if (readOnly) return;
    onAnswerChange({
      ...answers,
      [questionNumber]: answer,
    });
  };

  return (
    <ExamSection isLoading={isLoading} title="Part III Reading Comprehension">
      {data && (
        <>
          <SectionA
            answers={answers}
            onAnswerChange={handleAnswerChange}
            options={data.sectionA.options}
            passages={data.sectionA.passages}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionA}
          />
          <SectionB
            answers={answers}
            onAnswerChange={handleAnswerChange}
            passages={data.sectionB.passages}
            passageTitle={data.sectionB.passageTitle}
            questions={data.sectionB.questions}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionB}
          />
          <SectionC
            answers={answers}
            onAnswerChange={handleAnswerChange}
            passagesOne={data.sectionC.passagesOne}
            passagesTwo={data.sectionC.passagesTwo}
            questionsOne={data.sectionC.questionsOne}
            questionsTwo={data.sectionC.questionsTwo}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionC}
          />
        </>
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
