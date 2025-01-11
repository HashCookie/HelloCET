// 本地存储的成绩数据格式
export interface StoredScore {
  type: string;
  score: number;
  answer?: string;
  answers?: Record<number, string>;
  attemptId?: string;
  completedQuestions?: number;
  date?: string;
}

// API 响应的成绩数据
export interface ScoreData {
  score: number;
  totalQuestions?: number;
  accuracy?: number;
  totalScore?: number;
  details?: unknown;
}

// 单个部分的结果
export interface SectionResult {
  section: string;
  data: ScoreData;
  error?: string;
}

// 完整考试结果
export interface ExamResult {
  results: SectionResult[];
  duration: number;
  examType: string;
}

// 完整成绩记录
export interface ScoreRecord extends StoredScore {
  duration: string;
  seconds: number;
  date: string;
  attemptId: string;
  completedQuestions: number;
}
