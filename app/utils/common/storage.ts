import type { Answers } from "@/app/types/answers";

interface ExamState {
  year: number;
  month: number;
  set: number;
  showControls: boolean;
  activeTab: string;
  readOnly?: boolean;
}

export const STORAGE_KEY = {
  EXAM_STATE: "examState",
  EXAM_ANSWERS: "currentExamAnswers",
  NEVER_SHOW_CONFIRM: "neverShowSubmitConfirm",
} as const;

export const examStorage = {
  saveState: (state: ExamState) => {
    localStorage.setItem(STORAGE_KEY.EXAM_STATE, JSON.stringify(state));
  },

  saveAnswers: (answers: Answers) => {
    localStorage.setItem(STORAGE_KEY.EXAM_ANSWERS, JSON.stringify(answers));
  },

  clearExamData: () => {
    localStorage.removeItem(STORAGE_KEY.EXAM_STATE);
    localStorage.removeItem(STORAGE_KEY.EXAM_ANSWERS);
  },

  getState: (): ExamState | null => {
    const state = localStorage.getItem(STORAGE_KEY.EXAM_STATE);
    return state ? JSON.parse(state) : null;
  },

  getAnswers: (): Answers | null => {
    const answers = localStorage.getItem(STORAGE_KEY.EXAM_ANSWERS);
    return answers ? JSON.parse(answers) : null;
  },
};
