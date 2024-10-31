"use client";

import { useExamData } from "@/app/hooks/useExamData";
import ExamSection from "../Common/ExamSection";
import type { ListeningQuestion } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import QuestionGroup from "./QuestionGroup";
import { SECTION_CONFIG } from "./constants";

interface ListeningData {
  listeningComprehension: ListeningQuestion[];
}

interface SectionProps {
  title: string;
  directions: string;
  groups: {
    description: string;
    startIndex: number;
    endIndex: number;
  }[];
  year: string;
  month: string;
  set: string;
}

const Section = ({
  title,
  directions,
  groups,
  year,
  month,
  set,
}: SectionProps) => {
  const { data } = useExamData<ListeningData>(
    "listeningComprehension",
    year,
    month,
    set
  );

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-6">{title}</h2>
      <h3 className="text-sm text-gray-500 mb-6 text-left">
        <span className="font-semibold">Directions:</span> {directions}
      </h3>

      {groups.map((group, index) => (
        <QuestionGroup
          key={index}
          description={group.description}
          questions={
            data?.listeningComprehension.slice(
              group.startIndex,
              group.endIndex
            ) || []
          }
        />
      ))}
    </div>
  );
};

const ListeningComprehension = ({ year, month, set }: ExamComponentProps) => {
  const { data, isLoading } = useExamData<ListeningData>(
    "listeningComprehension",
    year,
    month,
    set
  );

  return (
    <ExamSection title="Part II Listening Comprehension" isLoading={isLoading}>
      {data && (
        <div className="space-y-8">
          {SECTION_CONFIG.map((section) => (
            <Section
              key={section.title}
              title={section.title}
              directions={section.directions}
              groups={section.groups}
              year={year}
              month={month}
              set={set}
            />
          ))}
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
