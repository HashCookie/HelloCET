import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { examStorage } from "@/app/utils/storage";

export function useExamData<T>(
  field: string,
  year: string,
  month: string,
  set: string
) {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!year || !month || !set) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/examData?type=${examType}&year=${year}&month=${month}&set=${set}&field=${field}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          examStorage.clearExamData();
          throw new Error(errorData.error || "获取数据失败");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "未知错误");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year, month, set, examType, field]);

  return { data, isLoading, error };
}
