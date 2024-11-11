"use client";

import ExamSection from "../Common/ExamSection";
import type { ListeningQuestion } from "@/app/types/exam";
import QuestionGroup from "./QuestionGroup";
import { SECTION_CONFIG } from "./constants";

interface ListeningData {
  listeningComprehension: ListeningQuestion[];
}

interface ListeningProps {
  data: ListeningData | null;
  isLoading: boolean;
  answers: Record<number, string>;
  onAnswerChange: (answers: Record<number, string>) => void;
  readOnly?: boolean;
  referenceAnswers?: {
    number: number;
    answer: string;
  }[];
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
  readOnly?: boolean;
  referenceAnswers?: {
    number: number;
    answer: string;
  }[];
}

const Section = ({
  title,
  directions,
  groups,
  questions,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
}: SectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-lg font-bold">{title}</h2>
      <h3 className="mb-6 text-left text-sm text-gray-500">{directions}</h3>

      {groups.map((group, index) => (
        <QuestionGroup
          key={index}
          description={group.description}
          audioUrl={`/audio/${title.toLowerCase()}-group-${index + 1}.mp3`}
          questions={questions.slice(group.startIndex, group.endIndex)}
          answers={answers}
          onAnswerChange={onAnswerChange}
          readOnly={readOnly}
          referenceAnswers={referenceAnswers}
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
  readOnly,
  referenceAnswers,
}: ListeningProps) => {
  const handleAnswerChange = (questionNumber: number, answer: string) => {
    if (readOnly) return;
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
              readOnly={readOnly}
              referenceAnswers={referenceAnswers}
            />
          ))}
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
