import { useExamData } from "@/app/hooks/useExamData";
import type {
  ListeningQuestion,
  Writing,
  ReadingComprehension,
  Translation,
} from "@/app/types/exam";

type ExamSectionType = {
  writing: Writing;
  listeningComprehension: ListeningQuestion[];
  readingComprehension: ReadingComprehension;
  translation: Translation;
};

type ExamSectionResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useExamSection<K extends keyof ExamSectionType>(
  field: K,
  selectedYear: number,
  selectedMonth: number,
  selectedSet: number
): ExamSectionResult<ExamSectionType[K]> {
  const result = useExamData<ExamSectionType[K]>(
    field,
    selectedYear,
    selectedMonth,
    selectedSet
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error,
  };
}
