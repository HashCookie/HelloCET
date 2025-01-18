import type { StoredScore } from "@/app/types/score";

// 考试记录基础信息
export interface ExamRecord {
  attemptId: string;
  duration: string;
  seconds: number;
  date: string;
  type: string;
}

// 练习记录
export interface PracticeRecord {
  type: string;
  score: number;
  date: string;
  duration: string;
  year?: number;
  month?: number;
  setCount?: number;
  attemptId: string;
}

// 分数记录映射
export interface ScoresMap {
  writing: StoredScore[];
  listening: StoredScore[];
  reading: StoredScore[];
  translation: StoredScore[];
}

// 单个部分的成绩结果
export interface SectionResult {
  section: string;
  data?: {
    score: number;
  };
  error?: string;
}

// 成绩汇总属性
export interface ScoreSummaryProps {
  results: SectionResult[];
  duration: number;
  examType: string;
}

// 成绩记录
export interface ScoreRecord extends StoredScore {
  attemptId: string;
  type: string;
  score: number;
  date: string;
  duration: string;
  completedQuestions: number;
}

// 练习记录查询参数
export interface PracticeQueryParams {
  limit?: number;
  examType?: string;
  startDate?: string;
  endDate?: string;
}
