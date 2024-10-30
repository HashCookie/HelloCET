import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useExamData<T>(field: string, year: string, month: string, set: string) {
  const pathname = usePathname();
  const examType = pathname.includes('cet4') ? 'CET4' : 'CET6';
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!year || !month || !set) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/examData?type=${examType}&year=${year}&month=${month}&set=${set}&field=${field}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`获取${field}数据失败:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year, month, set, examType, field]);

  return { data, isLoading };
}
