"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import type { ListeningQuestion } from "@/app/types/exam";
import QuestionGroup from "@/app/components/Exam/ListeningComprehension/QuestionGroup";
import { SECTION_CONFIG } from "@/app/components/Exam/ListeningComprehension/constants";

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
  examInfo: {
    year: number;
    month: number;
    set: number;
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
    set: number;
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
}: SectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-lg font-bold">{title}</h2>
      <h3 className="mb-6 text-left text-sm text-gray-500">{directions}</h3>

      {groups.map((group, index) => {
        const startNum = String(group.startIndex + 1).padStart(2, "0");
        const endNum = String(group.endIndex).padStart(2, "0");
        const audioRange = `${startNum}${endNum}`;

        const audioUrl = `/api/audio/${audioRange}.mp3?year=${examInfo.year}&month=${examInfo.month}&set=${examInfo.set}&type=${examInfo.type}&range=${audioRange}`;

        return (
          <QuestionGroup
            key={index}
            description={group.description}
            audioUrl={audioUrl}
            questions={questions.slice(group.startIndex, group.endIndex)}
            answers={answers}
            onAnswerChange={onAnswerChange}
            readOnly={readOnly}
            referenceAnswers={referenceAnswers}
          />
        );
      })}
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
    <ExamSection title="Part II Listening Comprehension" isLoading={isLoading}>
      {data && (
        <div className="space-y-8">
          {SECTION_CONFIG.map((section) => (
            <Section
              key={section.title}
              {...section}
              questions={data.listeningComprehension}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              readOnly={readOnly}
              referenceAnswers={referenceAnswers}
              examInfo={examInfo}
            />
          ))}
        </div>
      )}
    </ExamSection>
  );
};

export default ListeningComprehension;
