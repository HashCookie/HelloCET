"use client";

import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";
import SubmitButton from "../Common/SubmitButton";

type ReadingData = Pick<ExamPaper, "readingComprehension">;

interface ReadingProps extends ExamComponentProps {
  data: ReadingData | null;
  isLoading: boolean;
}

const ReadingComprehension = ({ data, isLoading }: ReadingProps) => {
  return (
    <ExamSection title="Part III Reading Comprehension" isLoading={isLoading}>
      {data?.readingComprehension && (
        <>
          <SectionA
            passages={data.readingComprehension.sectionA.passages}
            options={data.readingComprehension.sectionA.options}
          />
          <SectionB
            passageTitle={data.readingComprehension.sectionB.passageTitle}
            passages={data.readingComprehension.sectionB.passages}
            questions={data.readingComprehension.sectionB.questions}
          />
          <SectionC
            passagesOne={data.readingComprehension.sectionC.passagesOne}
            questionsOne={data.readingComprehension.sectionC.questionsOne}
            passagesTwo={data.readingComprehension.sectionC.passagesTwo}
            questionsTwo={data.readingComprehension.sectionC.questionsTwo}
          />
          <SubmitButton section="reading" />
        </>
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
