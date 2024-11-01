"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ExamPaper } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";
import SectionASkeleton from "./SectionASkeleton";
import SectionBSkeleton from "./SectionBSkeleton";
import SectionCSkeleton from "./SectionCSkeleton";

type ReadingData = Pick<ExamPaper, "readingComprehension">;

const ReadingComprehension = ({ year, month, set }: ExamComponentProps) => {
  const { data, isLoading } = useExamData<ReadingData>(
    "readingComprehension",
    year,
    month,
    set
  );

  return (
    <ExamSection title="Part III Reading Comprehension" isLoading={isLoading}>
      {isLoading ? (
        <>
          <SectionASkeleton />
          <SectionBSkeleton />
          <SectionCSkeleton />
        </>
      ) : (
        data?.readingComprehension && (
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
          </>
        )
      )}
    </ExamSection>
  );
};

export default ReadingComprehension;
