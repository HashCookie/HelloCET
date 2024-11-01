"use client";

import ExamSection from "../Common/ExamSection";
import type { ListeningQuestion } from "@/app/types/exam";
import type { ExamComponentProps } from "@/app/types/props";
import QuestionGroup from "./QuestionGroup";
import { SECTION_CONFIG } from "./constants";

interface ListeningData {
  listeningComprehension: ListeningQuestion[];
}

interface ListeningProps extends ExamComponentProps {
  data: ListeningData | null;
  isLoading: boolean;
}

interface SectionProps {
  title: string;
  directions: string;
  groups: {
    description: string;
    startIndex: number;
    endIndex: number;
  }[];
  questions: ListeningQuestion[];
}

const Section = ({ title, directions, groups, questions }: SectionProps) => {
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
          questions={questions.slice(group.startIndex, group.endIndex)}
        />
      ))}
    </div>
  );
};

const ListeningComprehension = ({ data, isLoading }: ListeningProps) => {
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
              questions={data.listeningComprehension}
            />
          ))}
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
