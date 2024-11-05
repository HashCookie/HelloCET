"use client";

import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";

type ReadingData = Pick<ExamPaper, "readingComprehension">;

interface ReadingProps extends ExamComponentProps {
  data: ReadingData | null;
  isLoading: boolean;
  answers: Record<number, string>;
  onAnswerChange: (answers: Record<number, string>) => void;
  readOnly?: boolean;
}

const ReadingComprehension = ({
  data,
  isLoading,
  answers,
  onAnswerChange,
  readOnly,
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
      {data?.readingComprehension && (
        <>
          <SectionA
            passages={data.readingComprehension.sectionA.passages}
            options={data.readingComprehension.sectionA.options}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
          />
          <SectionB
            passageTitle={data.readingComprehension.sectionB.passageTitle}
            passages={data.readingComprehension.sectionB.passages}
            questions={data.readingComprehension.sectionB.questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
          />
          <SectionC
            passagesOne={data.readingComprehension.sectionC.passagesOne}
            questionsOne={data.readingComprehension.sectionC.questionsOne}
            passagesTwo={data.readingComprehension.sectionC.passagesTwo}
            questionsTwo={data.readingComprehension.sectionC.questionsTwo}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            readOnly={readOnly}
          />
        </>
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
