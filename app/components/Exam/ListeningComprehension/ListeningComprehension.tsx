"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import { SECTION_CONFIG } from "@/app/components/Exam/ListeningComprehension/constants";
import QuestionGroup from "@/app/components/Exam/ListeningComprehension/QuestionGroup";
import type { ListeningQuestion } from "@/app/types/exam";

type ListeningData = ListeningQuestion[];

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
  examInfo: {
    year: number;
    month: number;
    setCount: number;
    type: string;
  };
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
  examInfo: {
    year: number;
    month: number;
    setCount: number;
    type: string;
  };
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
  examInfo,
}: SectionProps) => (
  <div className="mb-8">
    <h2 className="mb-6 font-bold text-lg">{title}</h2>
    <h3 className="mb-6 text-left text-gray-500 text-sm">{directions}</h3>

    {groups.map((group, index) => {
      const startNum = String(group.startIndex + 1).padStart(2, "0");
      const endNum = String(group.endIndex).padStart(2, "0");
      const audioRange = `${startNum}${endNum}`;

      const audioUrl = `/api/audio/${audioRange}.mp3?year=${examInfo.year}&month=${examInfo.month}&setCount=${examInfo.setCount}&type=${examInfo.type}&range=${audioRange}`;

      return (
        <QuestionGroup
          answers={answers}
          audioUrl={audioUrl}
          description={group.description}
          key={index}
          onAnswerChange={onAnswerChange}
          questions={questions.slice(group.startIndex, group.endIndex)}
          readOnly={readOnly}
          referenceAnswers={referenceAnswers}
        />
      );
    })}
  </div>
);

const ListeningComprehension = ({
  data,
  isLoading,
  answers,
  onAnswerChange,
  readOnly,
  referenceAnswers,
  examInfo,
}: ListeningProps) => {
  const handleAnswerChange = (questionNumber: number, answer: string) => {
    if (readOnly) return;
    onAnswerChange({
      ...answers,
      [questionNumber]: answer,
    });
  };

  return (
    <ExamSection isLoading={isLoading} title="Part II Listening Comprehension">
      {data && (
        <div className="space-y-8">
          {SECTION_CONFIG.map((section) => (
            <Section
              key={section.title}
              {...section}
              answers={answers}
              examInfo={examInfo}
              onAnswerChange={handleAnswerChange}
              questions={data}
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
