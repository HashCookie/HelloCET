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
  answers: Record<number, string>;
  onAnswerChange: (answers: Record<number, string>) => void;
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
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, answer: string) => void;
}

const Section = ({
  title,
  directions,
  groups,
  questions,
  answers,
  onAnswerChange,
}: SectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-6">{title}</h2>
      <h3 className="text-sm text-gray-500 mb-6 text-left">{directions}</h3>

      {groups.map((group, index) => (
        <QuestionGroup
          key={index}
          description={group.description}
          questions={questions.slice(group.startIndex, group.endIndex)}
          answers={answers}
          onAnswerChange={onAnswerChange}
        />
      ))}
    </div>
  );
};

const ListeningComprehension = ({
  data,
  isLoading,
  answers,
  onAnswerChange,
}: ListeningProps) => {
  const handleAnswerChange = (questionNumber: number, answer: string) => {
    onAnswerChange({
      ...answers,
      [questionNumber]: answer,
    });
  };

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
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
