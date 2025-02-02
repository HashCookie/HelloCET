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
    <ExamSection title="Part III Reading Comprehension" isLoading={isLoading}>
      {data && (
        <>
          <SectionA
            passages={data.sectionA.passages}
            options={data.sectionA.options}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionA}
          />
          <SectionB
            passageTitle={data.sectionB.passageTitle}
            passages={data.sectionB.passages}
            questions={data.sectionB.questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionB}
          />
          <SectionC
            passagesOne={data.sectionC.passagesOne}
            questionsOne={data.sectionC.questionsOne}
            passagesTwo={data.sectionC.passagesTwo}
            questionsTwo={data.sectionC.questionsTwo}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers?.sectionC}
          />
        </>
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
