import type { ExamRecord, ScoresMap } from "@/app/types/practice";
import type { StoredScore } from "@/app/types/score";

const SECTIONS = ["writing", "listening", "reading", "translation"] as const;
type Section = (typeof SECTIONS)[number];

export const examRecordStorage = {
  getExamRecords(): ExamRecord[] {
    return JSON.parse(localStorage.getItem("examRecords") || "[]");
  },

  getSectionScores(section: Section): StoredScore[] {
    return JSON.parse(localStorage.getItem(`${section}Scores`) || "[]");
  },

  getAllSectionScores(): ScoresMap {
    return SECTIONS.reduce((acc, section) => {
      acc[section] = this.getSectionScores(section);
      return acc;
    }, {} as ScoresMap);
  },

  clearAllRecords() {
    SECTIONS.forEach((section) => {
      localStorage.removeItem(`${section}Scores`);
    });
    localStorage.removeItem("examRecords");
  },

  findScoreRecord(scores: StoredScore[], attemptId: string, type: string) {
    return scores.find((s) => s.attemptId === attemptId && s.type === type);
  },

  getScoreByAttemptId(
    attemptId: string,
    type: string,
    section: Section
  ): number {
    const scores = this.getSectionScores(section);
    return this.findScoreRecord(scores, attemptId, type)?.score || 0;
  },
};
