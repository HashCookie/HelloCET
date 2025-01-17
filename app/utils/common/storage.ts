import type { Answers } from "@/app/types/answers";
import type { ExamPaperBase } from "@/app/types/exam";

interface ExamState extends ExamPaperBase {
  showControls: boolean;
  activeTab: string;
  readOnly?: boolean;
}

export const STORAGE_KEY = {
  EXAM_STATE: "examState",
  EXAM_ANSWERS: "currentExamAnswers",
  NEVER_SHOW_CONFIRM: "neverShowSubmitConfirm",
} as const;

const EXAM_EXPIRY_TIME = 24 * 60 * 60 * 1000;

interface StorageData<T> {
  data: T;
  timestamp: number;
}

export const examStorage = {
  saveState: (state: ExamState) => {
    const storageData: StorageData<ExamState> = {
      data: state,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY.EXAM_STATE, JSON.stringify(storageData));
  },

  saveAnswers: (answers: Answers) => {
    localStorage.setItem(STORAGE_KEY.EXAM_ANSWERS, JSON.stringify(answers));
  },

  clearExamData: () => {
    localStorage.removeItem(STORAGE_KEY.EXAM_STATE);
    localStorage.removeItem(STORAGE_KEY.EXAM_ANSWERS);
  },

  getState: (): ExamState | null => {
    const storageData = localStorage.getItem(STORAGE_KEY.EXAM_STATE);
    if (!storageData) return null;

    const { data, timestamp } = JSON.parse(
      storageData
    ) as StorageData<ExamState>;
    const now = Date.now();

    if (now - timestamp > EXAM_EXPIRY_TIME) {
      localStorage.removeItem(STORAGE_KEY.EXAM_STATE);
      return null;
    }

    return data;
  },

  getAnswers: (): Answers | null => {
    const answers = localStorage.getItem(STORAGE_KEY.EXAM_ANSWERS);
    return answers ? JSON.parse(answers) : null;
  },
};
