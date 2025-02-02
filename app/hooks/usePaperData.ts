import { create } from "zustand";
import type { ExamPaperBase } from "@/app/types/exam";

export interface PaperData {
  years: number[];
  months: number[];
  papers: ExamPaperBase[];
}

interface PaperStore {
  paperData: PaperData | null;
  loading: boolean;
  error: string | null;
  fetchPaperData: (examType: string) => Promise<void>;
}

export const usePaperStore = create<PaperStore>((set) => ({
  paperData: null,
  loading: false,
  error: null,
  fetchPaperData: async (examType) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "获取试卷数据失败");
      }

      set({ paperData: data[0], loading: false });
    } catch (error) {
      console.error("获取试卷数据失败:", error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : "未知错误",
      });
    }
  },
}));
