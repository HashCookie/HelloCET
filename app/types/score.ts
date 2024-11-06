export interface SectionResult {
  section: string;
  data: {
    score: number;
    totalQuestions?: number;
    wrongAnswers?: number[];
    accuracy?: number;
  };
  error?: string;
}

export interface ExamResultData {
  results: SectionResult[];
  duration: number;
  examType: string;
}
