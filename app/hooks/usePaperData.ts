import { create } from "zustand";

interface Paper {
  year: number;
  month: number;
  setCount: number;
}

export interface PaperData {
  years: number[];
  papers: Paper[];
}

interface PaperStore {
  paperData: PaperData | null;
  loading: boolean;
  fetchPaperData: (examType: string) => Promise<void>;
}

export const usePaperStore = create<PaperStore>((setCount) => ({
  paperData: null,
  loading: false,
  fetchPaperData: async (examType) => {
    setCount({ loading: true });
    try {
      const response = await fetch(`/api/papers?type=${examType}`);
      const data = await response.json();
      setCount({ paperData: data[0], loading: false });
    } catch (error) {
      console.error("获取试卷数据失败:", error);
      setCount({ loading: false });
    }
  },
}));
