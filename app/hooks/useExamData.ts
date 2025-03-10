import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { examStorage } from "@/app/utils/common/storage";

export function useExamData<T>(
  field: string,
  year: number,
  month: number,
  setCount: number
) {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!year || !month || !setCount) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const storedState = await examStorage.getState();
        const isNewExam =
          storedState?.year !== year ||
          storedState?.month !== month ||
          storedState?.setCount !== setCount;

        if (isNewExam) {
          await examStorage.clearExamData();
        }

        const response = await fetch(
          `/api/examData?type=${examType}&field=${field}&year=${year}&month=${month}&setCount=${setCount}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `未找到${year}年${month}月第${setCount}套试卷`
              : "获取数据失败"
          );
        }

        const result = await response.json();
        setData(result[field]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [field, year, month, setCount, examType]);

  return { data, isLoading, error };
}
