import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { usePaperStore } from "./usePaperData";

interface BaseExamData {
  year: number;
  month: number;
  setCount: number;
}

export function useRandomExamData<T extends BaseExamData>(field: string) {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { paperData, fetchPaperData } = usePaperStore();

  useEffect(() => {
    const fetchRandomPaper = async () => {
      setIsLoading(true);
      try {
        if (!paperData) {
          await fetchPaperData(examType);
        }

        if (paperData?.papers) {
          const papers = paperData.papers;
          const randomPaper = papers[Math.floor(Math.random() * papers.length)];
          const setCount = randomPaper.setCount || 1;

          const fieldResponse = await fetch(
            `/api/examData?type=${examType}&year=${randomPaper.year}&month=${randomPaper.month}&setCount=${setCount}&field=${field}`
          );
          const fieldData = await fieldResponse.json();

          setData({
            ...fieldData,
            year: randomPaper.year,
            month: randomPaper.month,
            setCount: setCount,
          } as T);
        }
      } catch (error) {
        console.error(`获取${field}题目失败:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPaper();
  }, [examType, field, paperData, fetchPaperData]);

  return { data, isLoading };
}
