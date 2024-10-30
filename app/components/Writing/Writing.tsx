"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface WritingData {
  writing: {
    Directions: string;
  };
}

const Writing = ({ year, month, set }: { year: string; month: string; set: string }) => {
  const pathname = usePathname();
  const examType = pathname.includes('cet4') ? 'CET4' : 'CET6';
  const [writingData, setWritingData] = useState<WritingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWritingData = async () => {
      if (!year || !month || !set) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/writing?type=${examType}&year=${year}&month=${month}&set=${set}`
        );
        const data = await response.json();
        setWritingData(data);
      } catch (error) {
        console.error('获取写作数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritingData();
  }, [year, month, set, examType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">加载中...</span>
      </div>
    );
  }

  if (!writingData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Part II Writing</h2>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">
            {writingData.writing.Directions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing;
