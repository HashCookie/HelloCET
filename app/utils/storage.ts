interface ExamState {
  year: string;
  month: string;
  set: string;
  showControls: boolean;
  activeTab: string;
}

interface ExamAnswers {
  writing: string;
  listening: Record<number, string>;
  reading: Record<number, string>;
  translation: string;
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

  saveAnswers: (answers: ExamAnswers) => {
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

  getAnswers: (): ExamAnswers | null => {
    const answers = localStorage.getItem(STORAGE_KEY.EXAM_ANSWERS);
    return answers ? JSON.parse(answers) : null;
  },
};
